import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, setUser, navigate } = useAppContext();

  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/user/${mode}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(
          mode === "login" ? "Logged in successfully" : "Account created!"
        );

        // save user + token
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);

        // redirect home
        navigate("/");
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 p-8 w-80 sm:w-96 bg-white rounded-xl shadow-xl"
      >
        {/* Title */}
        <p className="text-2xl font-semibold text-center">
          <span className="text-primary">
            {mode === "login" ? "Login" : "Sign Up"}
          </span>{" "}
          to Continue
        </p>

        {/* Name field (only for register) */}
        {mode === "register" && (
          <div className="w-full">
            <label className="text-sm">Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 outline-primary"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <label className="text-sm">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 outline-primary"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 outline-primary"
            required
          />
        </div>

        {/* Switch login/register */}
        {mode === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-primary cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => setMode("register")}
              className="text-primary cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-800 text-white font-medium py-2 rounded-md transition-all"
        >
          {mode === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
