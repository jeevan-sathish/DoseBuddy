import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleLogin = (response) => {
    localStorage.setItem("accessToken", response.credential);
    if (response.credential) {
      window.location.href = "/DiagnosisPage"; // Redirect to the DiagnosisPage after successful login
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Login failed")}
      />
    </div>
  );
};

export default Login;
