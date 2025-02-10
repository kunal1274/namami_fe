import React, { useState } from "react";
import { SignUp } from "./Signup";
import { SignIn } from "./Signin";
import { OtpVerify } from "./OtpVerify";
import { OtpVerifyResend } from "./OtpVerifyResend";
import { OtpVerifyCallOption } from "./OtpVerifyCallOption";
import { LandingScreen } from "./LandingScreen";
import { PickupLocationSelect } from "./PickupLocationSelect";

export default function AuthFlow() {
  const [screen, setScreen] = useState("signup");

  return (
    <div className="App">
      {screen === "signup" && <SignUp />}
      {screen === "signin" && <SignIn />}
      {screen === "otp" && <OtpVerify />}
      {screen === "otpResend" && <OtpVerifyResend />}
      {screen === "otpCall" && <OtpVerifyCallOption />}
      {screen === "landing" && <LandingScreen />}
      {screen === "pickup" && <PickupLocationSelect />}

      {/* Buttons to swap screens (for testing) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={() => setScreen("signup")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          SignUp
        </button>
        <button
          onClick={() => setScreen("signin")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          SignIn
        </button>
        <button
          onClick={() => setScreen("otp")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          OTP
        </button>
        <button
          onClick={() => setScreen("otpResend")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          OTP Resend
        </button>
        <button
          onClick={() => setScreen("otpCall")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          OTP Call
        </button>
        <button
          onClick={() => setScreen("landing")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Landing
        </button>
        <button
          onClick={() => setScreen("pickup")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Pickup
        </button>
      </div>
    </div>
  );
}
