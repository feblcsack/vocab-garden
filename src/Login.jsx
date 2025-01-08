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
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://media.licdn.com/dms/image/v2/D5622AQG2XbH-gqlk4g/feedshare-shrink_800/feedshare-shrink_800/0/1720001694808?e=2147483647&v=beta&t=UMM7AnGoc_H3NdeDeKXMxyShvucUaFRClV_bGAzo4aE')", // Ganti URL ini dengan gambar background yang diinginkan
      }}
    >
     <button
  onClick={handleLogin}
  className="bg-slate-800 text-white py-2 px-6 rounded-full hover:bg-slate-900 z-10 flex items-center justify-center space-x-2"
>
  <span>Login with Google</span>
  <FcGoogle className="text-xl" />
</button>

    </div>
  );
};

export default Login;
