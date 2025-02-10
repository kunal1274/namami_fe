import React, { useState } from "react";
import { ArrowLeftIcon, PhoneIcon } from "@heroicons/react/24/outline";

/**
 * ChatScreen
 *  - If no messages, show a big "No messages yet" placeholder
 *  - Otherwise, show a list of messages (some from driver, some from user).
 */
export function ChatScreen() {
  const [messages, setMessages] = useState([
    // Example: fill with 2-3 sample messages or empty
    { id: 1, text: "Hey, I’m on your way", from: "driver", time: "2:36 AM" },
    {
      id: 2,
      text: "Ok, waiting for you near supermarket",
      from: "user",
      time: "2:37 AM",
    },
    {
      id: 3,
      text: "Hold on, i will be in 5 minutes",
      from: "driver",
      time: "2:38 AM",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input,
      from: "user",
      time: "2:39 AM", // or dynamic
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-800">Patrick</h1>
          <p className="text-sm text-gray-400">Volkswagen Jetta, HS785K</p>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/100"
            alt="driver"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {messages.length === 0 ? (
          // Empty chat UI
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <svg /* chat icon */ className="h-16 w-16 mb-2" /* ... */></svg>
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          // Filled chat
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] mb-2 ${
                msg.from === "user" ? "self-end items-end" : "self-start"
              }`}
            >
              <div
                className={`${
                  msg.from === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                } px-3 py-2 rounded-lg`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
            </div>
          ))
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center p-3 border-t space-x-2">
        <button className="p-2 bg-white rounded-full border border-gray-300">
          <PhoneIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Start typing here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="
              w-full border border-gray-300 rounded-full 
              py-2 px-4 pl-10 focus:outline-none text-sm
            "
          />
          {/* Optional image attachment icon */}
          <button className="absolute left-3 top-2 text-gray-400">
            <svg /* image icon */ className="h-4 w-4" /* ... */></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
