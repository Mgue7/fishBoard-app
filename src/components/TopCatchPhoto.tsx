import { CatchData } from "../types/CatchData";

interface Props {
  title: string;
  catchData: CatchData;
}

function TopCatchPhoto({ title, catchData }: Props) {
  return (
    <div className="text-center my-4">
      <h3>
        {title}: {catchData.username}
      </h3>
      <img
        src={catchData.photoUrl}
        alt={`Catch by ${catchData.username}`}
        style={{ maxWidth: "300px", borderRadius: "8px" }}
      />
      <p>
        {catchData.species} — {catchData.weight} lbs, {catchData.length} inches
      </p>
    </div>
  );
}

export default TopCatchPhoto;
