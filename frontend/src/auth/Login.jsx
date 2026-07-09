import { GoogleLogin } from "@react-oauth/google";
import { loginUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = (response) => {
    const credentail = response.credential;
    dispatch(loginUser(credentail));
  };

  return (
    <div className="p-3 bg-black h-[200px] w-[400px] flex flex-col justify-center items-center rounded-2xl">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Login failed")}
      />
    </div>
  );
};

export default Login;
