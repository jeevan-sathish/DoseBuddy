import { Link } from "react-router-dom";
import Button from "../components/Button";

const Nav = () => {
  return (
    <nav className="bg-red-600 w-full h-14 flex items-center justify-between px-6 sticky top-0 z-50 text-gray-200">
      <h1 className="text-3xl font-bold ">
        <span className="text-black">D</span>ose
        <span className="text-black">B</span>uddy
      </h1>

      <div className="flex items-center gap-5">
        <Link to="/">Home</Link>
        <Link to="/DiagnosisPage">Diagnose</Link>
        <Button title="Sign In" />
      </div>
    </nav>
  );
};

export default Nav;
