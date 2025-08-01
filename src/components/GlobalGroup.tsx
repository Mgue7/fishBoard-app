import { CatchData } from "../types/CatchData";

function GlobalGroup(props: CatchData) {
  const { username, species, weight, length, photoUrl } = props;

  return (
    <div>
      <img
        src={`http://127.0.0.1:5000${photoUrl}`}
        alt={species}
        onError={(e) => {
          e.currentTarget.src = "/placeholder-fish.jpg"; // fallback
        }}
        className="image-position"
      />
      <ul className="list-group listgroup-position3">
        <li className="list-group-item">Username: {username}</li>
        <li className="list-group-item">Catch Species: {species}</li>
        <li className="list-group-item">Catch Weight: {weight} lbs</li>
        <li className="list-group-item">Catch Length: {length} inches</li>
      </ul>
    </div>
  );
}

export default GlobalGroup;
