import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.userProfile,
  );

  function handlelogout() {
    dispatch(handleLogout());
    navigate("/LogInPage");
  }
  return (
    <nav className="bg-red-600 w-full h-14 flex items-center justify-between px-6 sticky top-0 z-50 text-gray-200">
      <div className="flex flex-row justify-center items-center gap-7">
        <h1 className="text-3xl font-bold ">
          <span className="text-black">C</span>ode
          <span className="text-black">B</span>oard
        </h1>

        <div className="flex items-center gap-5 font-extrabold">
          <Link to="/">Home</Link>
          <Link to="/DiagnosisPage">Reminders</Link>
        </div>
      </div>

      {isAuthenticated && (
        <div className="w-auto h-[40px] flex flex-row items-center justify-center gap-1 bg-white text-black  rounded-2xl">
          <img
            src={userInfo.picture}
            alt="Profile"
            className="w-8 h-8 m-1  rounded-full"
          />
          <span className="font-medium">{userInfo.name}</span>
          <button
            className="w-[80px] h-[40px] bg-black text-gray-600 border rounded-2xl border-black text-black hover:bg-black hover:text-white"
            onClick={handlelogout}
          >
            LogOut
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
