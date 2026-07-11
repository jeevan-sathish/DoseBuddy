import { Route, Routes } from "react-router-dom";
import Nav from "./layout/Nav";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getProfile } from "./store/userSlice.js";
import { lazy, Suspense, useEffect } from "react";
import Footer from "./layout/Footer";
import { useDispatch } from "react-redux";

const Home = lazy(() => import("./pages/Home"));
const CodeSandBox = lazy(() => import("./pages/CodeSandBox.jsx"));
const LogInPage = lazy(() => import("./pages/LogInPage.jsx"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access_token_db");

    if (token) {
      dispatch(getProfile());
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-black">
      <Nav />
      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/CodeSandBox"
            element={
              <ProtectedRoute>
                <CodeSandBox />
              </ProtectedRoute>
            }
          />
          <Route path="/LogInPage" element={<LogInPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
