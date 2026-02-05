import "./App.css";
import "./app.css";
import Home from "./pages/Home";
import InputCatch from "./pages/InputCatch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input-catch" element={<InputCatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
