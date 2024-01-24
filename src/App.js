import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
