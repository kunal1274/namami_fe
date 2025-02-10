import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function OtpVerifyResend() {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    let timer = null;
    if (secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [secondsLeft]);

  const handleResend = () => {
    alert("Resend code request");
    setSecondsLeft(30);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Verify code</h1>
        <p className="text-sm text-gray-500 mb-6">
          A code has been sent to +33 234 556 7888 via SMS
        </p>

        {/* 4 placeholders for digits */}
        <div className="flex items-center space-x-4 mb-2">
          {digits.map((d, idx) => (
            <span
              key={idx}
              className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Resend code with countdown */}
        {secondsLeft > 0 ? (
          <div className="text-blue-600 text-sm font-semibold mt-2">
            Resend code (
            {secondsLeft < 10 ? `0:0${secondsLeft}` : `0:${secondsLeft}`})
          </div>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-600 text-sm font-semibold mt-2"
          >
            Resend code
          </button>
        )}

        {/* Numeric Keypad omitted for brevity */}
      </div>
    </div>
  );
}
