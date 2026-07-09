import { GoogleLogin } from "@react-oauth/google";
import { loginUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (response) => {
    const credentail = response.credential;
    dispatch(loginUser(credentail));
    navigate("/");
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-extrabold text-white">DB</span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-white">
          <span className="text-black">D</span>ose
          <span className="text-red-500">B</span>uddy
        </h1>

        <p className="text-center text-gray-400 mt-3 text-sm leading-6">
          Your intelligent medication companion.
          <br />
          Sign in securely with Google to continue.
        </p>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-xs uppercase tracking-widest text-gray-500">
            Secure Login
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("Login failed")}
          />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
