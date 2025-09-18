import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Inputbox from "../component/ui/Inputbox";
import Button from "../component/ui/Button";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const { signup, loading, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      const form = { name, email, password };
      const response = await signup(form);

      if (response?.success) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("You are already logged in!");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="w-full max-w-sm px-6 py-8 rounded-2xl border border-indigo-500/40 shadow-xl backdrop-blur-md bg-gray-900/70">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputbox
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <Inputbox
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <div className="relative">
            <Inputbox
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
            loadingValue="Signing up..."
            actualValue="Sign Up"
          />
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
