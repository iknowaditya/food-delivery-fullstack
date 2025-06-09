import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const GoogleLoginButton = () => {
  const { setToken } = useContext(StoreContext);

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    const decoded = jwtDecode(credential);
    console.log("Decoded Google JWT:", decoded);

    try {
      // Send token or decoded info to your backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        {
          token: credential,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      toast.success("Login successful");
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google login failed")}
    />
  );
};

export default GoogleLoginButton;
