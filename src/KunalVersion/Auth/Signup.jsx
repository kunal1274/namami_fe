import React, { useState } from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    alert("Signing up...");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Sign up</h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            NAME
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="
              w-full p-3 border border-gray-300 
              rounded-lg bg-gray-100 text-sm 
              focus:outline-none
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            EMAIL
          </label>
          <input
            type="email"
            placeholder="example@domain.com"
            className="
              w-full p-3 border border-gray-300 
              rounded-lg bg-gray-100 text-sm
              focus:outline-none
            "
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              className="
                w-full p-3 border border-gray-300 
                rounded-lg bg-gray-100 text-sm
                focus:outline-none pr-10
              "
            />
            <button
              onClick={togglePassword}
              className="absolute right-3 top-3 text-gray-400"
              type="button"
            >
              {passwordVisible ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* OR SIGN UP WITH */}
        <div className="flex items-center justify-center my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">OR SIGN UP WITH</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Country code */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            COUNTRY CODE
          </label>
          <input
            type="text"
            placeholder="+1"
            className="
              w-full p-3 border border-gray-300 
              rounded-lg bg-gray-100 text-sm
              focus:outline-none
            "
          />
        </div>

        {/* Mobile No */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            MOBILE NO
          </label>
          <input
            type="text"
            placeholder="123 456 7890"
            className="
              w-full p-3 border border-gray-300 
              rounded-lg bg-gray-100 text-sm
              focus:outline-none
            "
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold text-sm hover:bg-blue-700 mt-2"
        >
          Sign Up
        </button>

        {/* OR SIGN IN WITH */}
        <div className="flex items-center justify-center my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">OR SIGN IN WITH</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-6">
          <button className="text-gray-400">
            {/* Facebook icon placeholder */}
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12...Z" />
            </svg>
          </button>
          <button className="text-gray-400">
            {/* Twitter icon placeholder */}
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12...Z" />
            </svg>
          </button>
          <button className="text-gray-400">
            {/* Google icon placeholder */}
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12...Z" />
            </svg>
          </button>
        </div>

        {/* Already have an account? Sign in */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-400">
            Already have an account?{" "}
          </span>
          <button className="text-blue-600 text-sm font-semibold">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
