import { useNavigate } from "react-router-dom";

function CatchButton() {
  const navigate = useNavigate();
  return (
    <div className="button-position">
      <button
        className="btn btn-primary"
        onClick={() => navigate("/input-catch")}
      >
        + Add a New Catch
      </button>
    </div>
  );
}
export default CatchButton;
