import React from "react";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Inputbox from "../component/ui/Inputbox";
import Button from "../component/ui/Button";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { loading, isAuthenticated, login, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    gsap.fromTo(
      ".auth-form",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful! 🎉");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="w-full max-w-sm px-6 py-8 rounded-2xl auth-form border border-indigo-500/40 shadow-xl backdrop-blur-md bg-gray-900/70">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Inputbox
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <Inputbox
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            loading={loading}
            loadingValue="Logging in..."
            actualValue="Login"
          />
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
