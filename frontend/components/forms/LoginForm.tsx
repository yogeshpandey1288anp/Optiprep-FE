"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

import Input from "../ui/Input";
import { useAlert } from "@/context/AlertContext";
import { loginUser } from "@/app/lib/api/auth.api";

const LoginForm = () => {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const setToken = useAuthStore((state) => state.setToken);

  /* -------------------- validation -------------------- */
  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  /* -------------------- handlers -------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const emailErr = validateEmail(form.email);
    const passwordErr = validatePassword(form.password);

    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form.email, form.password);
      setToken(res.access_token);

      showAlert("Login successful!", "success");
      router.push("/main/dashboard");
    } catch (err) {
      showAlert(
        err instanceof Error ? err.message : "Invalid email or password",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(82,36,99,0.25)] p-8 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#522463] to-[#B843E2] bg-clip-text text-transparent">
            Login
          </h1>
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-[#B843E2] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>


        <div className="space-y-6">
          <div>
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl shadow-sm focus:ring-2 focus:ring-[#B843E2]"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <div className="relative">
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="rounded-xl shadow-sm pr-12 focus:ring-2 focus:ring-[#B843E2]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[38px] text-gray-400 hover:text-[#522463]"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
          </div>


          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#522463] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full rounded-xl py-3 font-semibold text-white
              bg-gradient-to-r from-[#522463] to-[#B843E2]
              shadow-[0_12px_30px_rgba(184,67,226,0.45)]
              transition-all duration-300
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
