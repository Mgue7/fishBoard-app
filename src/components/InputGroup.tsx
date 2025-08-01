import React, { useState } from "react";

function CatchForm() {
  const [username, setUsername] = useState("");
  const [species, setSpecies] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhoto(file || null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("species", species);
    formData.append("weight", weight.toString());
    formData.append("length", length.toString());

    if (photo) {
      formData.append("photo", photo);
    }

    fetch("http://127.0.0.1:5000/submit-catch", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then((data) => {
        console.log("✅ Catch submitted:", data);
        alert("Catch submitted!");
      })
      .catch((err) => {
        console.error("❌ Error submitting catch:", err.message);
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
        margin: "200px auto",
      }}
    >
      <label>
        Species:
        <select
          className="form-control"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        >
          <option value="">-- Select a species --</option>
          <option value="Bass">Bass</option>
          <option value="Bluegill">Bluegill</option>
          <option value="Catfish">Catfish</option>
          <option value="Crappie">Crappie</option>
          <option value="Walleye">Walleye</option>
        </select>
      </label>

      <label>
        Weight (lbs):
        <input
          type="number"
          className="form-control"
          value={weight}
          step="0.01"
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </label>

      <label>
        Length (inches):
        <input
          type="number"
          className="form-control"
          value={length}
          step="0.1"
          onChange={(e) => setLength(e.target.value)}
          required
        />
      </label>

      <label>
        Photo:
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handlePhotoChange}
          required
        />
      </label>

      <label>
        Username:
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      )}

      <button type="submit" className="btn btn-primary">
        Submit Catch
      </button>
    </form>
  );
}

export default CatchForm;
