import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      // Proses login menggunakan Google OAuth
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in: ", user);

      // Kirim data pengguna ke callback onLoginSuccess
      onLoginSuccess(user);
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen relative"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${window.innerWidth >= 768
            ? "https://media.licdn.com/dms/image/v2/D5622AQG2XbH-gqlk4g/feedshare-shrink_800/feedshare-shrink_800/0/1720001694808?e=2147483647&v=beta&t=UMM7AnGoc_H3NdeDeKXMxyShvucUaFRClV_bGAzo4aE"
            : "https://via.placeholder.com/1080x1920?text=Mobile+Background"})`,
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="bg-slate-800 text-white py-2 px-6 rounded-full hover:bg-slate-900 z-10 flex items-center justify-center space-x-2 shadow-lg"
      >
        <span>Login with Google</span>
        <FcGoogle className="text-xl" />
      </button>
    </div>
  );
};

export default Login;