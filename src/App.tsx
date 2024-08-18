import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Maps from "./pages/Maps";
import Charts from "./pages/Charts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/charts" element={<Charts />} />
    </Routes>
  );
}
