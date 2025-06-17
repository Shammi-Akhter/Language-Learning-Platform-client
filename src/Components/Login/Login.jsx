import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  
  const saveJWT = async (email, displayName = null) => {
    try {
      const response = await fetch("https://secjaf-server-side.vercel.app/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          displayName: displayName || email 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get JWT token");
      }

      const data = await response.json();
      localStorage.setItem("access-token", data.token); 
      console.log("JWT token saved successfully"); 
    } catch (error) {
      toast.error("Failed to get access token.");
      console.error("JWT Error:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginWithEmail(email, password);
 
      const displayName = result?.user?.displayName || result?.displayName || email;
      await saveJWT(email, displayName);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      
      const userEmail = result.user.email;
      const displayName = result.user.displayName || result.user.email;
      
      await saveJWT(userEmail, displayName);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | HobbyHive</title>
      </Helmet>
      <div className="flex justify-center items-center lg:min-h-screen md:h-[50vh] lg:my-0 lg:mx-0 my-8 mx-4 ">
        <div className="w-full max-w-md border-2 border-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Login
          </h2>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">or</div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-blue-400 transition duration-200"
          >
            <FcGoogle size={24} />
            <span>Login with Google</span>
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;