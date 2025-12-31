"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(true);

  return (
      <div className="w-full max-w-xl rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(82,36,99,0.25)] p-8 space-y-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter first name"
              className="rounded-xl shadow-sm focus:ring-2 focus:ring-[#B843E2]"
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              className="rounded-xl shadow-sm focus:ring-2 focus:ring-[#B843E2]"
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="rounded-xl shadow-sm focus:ring-2 focus:ring-[#B843E2]"
          />

          <Input
            label="User"
            type="text"
            placeholder="Enter user type (eg: admin, user)"
            className="rounded-xl shadow-sm focus:ring-2 focus:ring-[#B843E2]"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "password" : "text"}
              placeholder="Create a password"
              className="rounded-xl shadow-sm pr-12 focus:ring-2 focus:ring-[#B843E2]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-[25px] text-gray-400 hover:text-[#522463]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

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
   
  );
};

export default RegisterForm;
