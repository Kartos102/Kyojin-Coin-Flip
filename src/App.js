import React from "react";
import { Routes, Route } from "react-router-dom";
import Faq from "./pages/faq";
import HowTo from "./pages/howto";
import Responsibility from "./pages/responsibility";
import RecentPlays from "./pages/plays";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/plays" element={<RecentPlays />} exact />
      <Route path="/faq" element={<Faq />} exact />
      <Route path="/howto" element={<HowTo />} exact />
      <Route path="/responsibility" element={<Responsibility />} exact />
    </Routes>
  );
}

export default App;