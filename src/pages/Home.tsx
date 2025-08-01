import { useNavigate } from "react-router-dom";
import GlobalGroup from "../components/GlobalGroup";
import InputGroup from "../components/InputGroup";
import NavBar from "../components/NavBar";
import CatchButton from "../components/CatchButton";
import HeaviestBass from "../components/HeaviestBass";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="home-content">
        <HeaviestBass />
        <CatchButton />
      </div>
    </div>
  );
}
export default Home;
