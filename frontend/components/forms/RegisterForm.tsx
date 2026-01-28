"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import { registerUser } from "@/app/lib/api/auth.api";
import { useAlert } from "@/context/AlertContext";


const RegisterForm = () => {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});



  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const { firstname, lastname, email, password } = form;

    if (!firstname || !lastname || !email || !password) {
      setErrors({ form: "All fields are required." });
      showAlert("All fields are required.", "error");
      return;
    }


    if (!isValidEmail(email)) {
      setErrors({ email: "Invalid email address." });
      showAlert("Please enter a valid email address.", "error");
      return;
    }


    if (!isStrongPassword(password)) {
      setErrors({
        password:
          "Password must be 8+ chars with uppercase, lowercase, number & symbol.",
      });
      showAlert("Password is not strong enough.", "warning");
      return;
    }

    try {
      await registerUser(form);
      showAlert("Registration successful! Please login.", "success");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      showAlert("Registration failed. Try again.", "error");
      setErrors({ form: "Registration failed. Please try again." });
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(82,36,99,0.25)] p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#522463] to-[#B843E2] bg-clip-text text-transparent">
            Register
          </h1>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[#B843E2] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="space-y-6">
          {errors.form && (
            <p className="text-sm text-red-600 text-center">{errors.form}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name ="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
            />

            <Input
              label="Last Name"
              name ="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <Input
            label="Email"
            name ="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}

          <Input
            label="Role"
            name ="role"
            value={form.role}
            onChange={handleChange}
            placeholder="eg: user, admin"
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              name ="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-[38px] text-gray-400 hover:text-[#522463]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-600">{errors.password}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full rounded-xl py-3 font-semibold text-white
              bg-gradient-to-r from-[#522463] to-[#B843E2]
              shadow-[0_12px_30px_rgba(184,67,226,0.45)]
              hover:scale-[1.02]
              transition-all duration-300
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
