import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

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
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://media.licdn.com/dms/image/v2/D5622AQG2XbH-gqlk4g/feedshare-shrink_800/feedshare-shrink_800/0/1720001694808?e=2147483647&v=beta&t=UMM7AnGoc_H3NdeDeKXMxyShvucUaFRClV_bGAzo4aE')", // Ganti URL ini dengan gambar background yang diinginkan
      }}
    >
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 z-10"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
