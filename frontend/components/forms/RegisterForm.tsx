"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "../ui/Input";


export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="w-full max-w-3xl px-8">
  
      <div className="flex items-center justify-between py-2">
        <img
          src="/Images/brand-logo.svg"
          alt="Brand Logo"
          className="group-data-[state=collapsed]:hidden"
        />
      </div>


      <div className="h-[790px] flex items-center justify-center">
        <div className="w-[770px] space-y-8 p-4">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-semibold mb-5">Register</h1>
            <p className="text-2xl">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#B843E2] underline">
                Login
              </Link>
            </p>
          </div>

          <div className="space-y-10">
            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="h-[72px] rounded-xl shadow-xl"
            />

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "password" : "text"}
                placeholder="Enter your password"
                className="h-[72px] rounded-xl shadow-xl pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
             <button
          type="submit"
          className="
            mt-2 w-full rounded-xl
            bg-[#522463] text-white font-medium
            py-2.5 text-sm
            shadow-[0_10px_25px_rgba(82,36,99,0.35)]
            hover:bg-[#3f1b4c] transition
          "
        >
          Create account
        </button>
          </div>
        </div>
      </div>
    </div>
  );
}
