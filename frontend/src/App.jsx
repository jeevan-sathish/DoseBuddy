import { Route, Routes } from "react-router-dom";
import Nav from "./layout/Nav";

import { lazy } from "react";
import Footer from "./layout/Footer";

const Home = lazy(() => import("./pages/Home"));
const DiagnosisPage = lazy(() => import("./pages/DiagnosisPage"));

const App = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DiagnosisPage" element={<DiagnosisPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
