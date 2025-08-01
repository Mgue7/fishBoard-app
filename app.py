from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

# Make sure the upload folder exists with proper permissions
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.chmod(app.config['UPLOAD_FOLDER'], 0o755)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/fishingdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Catch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    length = db.Column(db.Float, nullable=False)
    photo_filename = db.Column(db.String(200))
    
@app.route('/uploads/<filename>')  # Different URL pattern
def uploaded_file(filename):
    upload_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
    return send_from_directory(upload_path, filename)

@app.route('/debug/clear-database-get', methods=['GET'])
def clear_database_get():
    try:
        # Delete all records from the Catch table
        db.session.query(Catch).delete()
        db.session.commit()
        return jsonify({"message": "Database cleared successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "🎣 Welcome to the Fishing Leaderboard API!"

@app.route('/submit-catch', methods=['POST'])
def submit_catch():
    username = request.form.get('username')
    species = request.form.get('species')
    weight = request.form.get('weight')
    length = request.form.get('length')
    photo = request.files.get('photo')

    filename = None
    if photo:
        filename = secure_filename(photo.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        photo.save(file_path)
        
        # Fix file permissions
        os.chmod(file_path, 0o644)

    new_catch = Catch(
        username=username,
        species=species,
        weight=float(weight),
        length=float(length),
        photo_filename=filename
    )
    db.session.add(new_catch)
    db.session.commit()

    return jsonify({"message": "Catch saved!", "id": new_catch.id})

@app.route('/catches', methods=['GET'])
def catches():
    all_catches = Catch.query.all()
    return jsonify([
        {
            "id": c.id,
            "species": c.species,
            "weight": c.weight,
            "length": c.length,
            "photo_filename": c.photo_filename,
            "username": c.username
        }
        for c in all_catches
    ])

if __name__ == '__main__':
    app.run(debug=True)