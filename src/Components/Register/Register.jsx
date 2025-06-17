import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
const provider = new GoogleAuthProvider();

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !isLongEnough) {
      toast.error("Password must include upper, lower case and 6+ characters.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCredential.user, {
        displayName: form.name,
        photoURL: form.photoURL,
      });

      await signOut(auth);
      toast.success("Registered successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Sign-up successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Secjaf</title>
      </Helmet>
      
      <div className="flex justify-center items-center lg:mt-20 lg:mb-28  md:mb-20 md:mt-10 lg:mx-0 my-8 mx-4 ">
        <div className="w-full max-w-md border-2 border-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              value={form.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Register
            </button>
          </form>
          <div className="my-4 text-center text-gray-500">or</div>
          <button
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-blue-400 transition duration-200"
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
