import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

/**
 * ProfilePage
 * For user/customer/allocator with:
 *  - Avatar + name
 *  - Contact info (phone, email, social)
 *  - Toggle for notifications
 *  - Document upload/download
 *  - "Delete account" button
 */
export function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // handle file upload logic
      alert(`File uploaded: ${file.name}`);
    }
  };

  const handleDownload = (filename) => {
    // example: you might fetch file from server or direct link
    alert(`Initiating download for: ${filename}`);
  };

  const handleDeleteAccount = () => {
    alert("Delete account?");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            {/* placeholder user icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 0 1 9 
                   16h6a4 4 0 0 1 3.879 
                   1.804M9 16v-1a3 3 0 1 
                   1 6 0v1m-3-5a3 3 0 1 0 0-6 
                   3 3 0 0 0 0 6"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-800">Carson</p>
        </div>

        {/* Contact Card */}
        <div
          className="
            bg-white rounded-xl shadow p-4 border 
            border-gray-100 mb-6
          "
        >
          <div className="flex items-center space-x-2 mb-3">
            {/* phone icon */}
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h2l2-2... 
                M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-700 text-sm">+1 926 483 32 52</span>
          </div>
          <hr />
          <div className="flex items-center space-x-2 my-3">
            {/* email icon */}
            <svg className="h-5 w-5 text-gray-400" /* ... */></svg>
            <span className="text-gray-700 text-sm">carson@mobility.com</span>
          </div>
          <hr />
          <div className="flex items-center space-x-2 mt-3">
            {/* facebook or social icon */}
            <svg className="h-5 w-5 text-gray-400" /* ... */></svg>
            <span className="text-gray-700 text-sm">@carsonmobility</span>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-800 font-semibold">Notifications</p>
            <p className="text-sm text-gray-400">
              For receiving driver messages
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
            />
            <div
              className="
              w-11 h-6 bg-gray-200 rounded-full peer 
              peer-focus:ring-2 peer-focus:ring-blue-600 
              peer-checked:bg-blue-600
            "
            ></div>
            <span className="ml-2 text-sm text-gray-400"></span>
          </label>
        </div>

        {/* Document Upload/Download */}
        <div className="mb-6">
          <p className="font-semibold text-gray-800 mb-2">
            Vehicle / Insurance Documents
          </p>
          <div className="space-y-2">
            {/* upload */}
            <label className="flex items-center space-x-2 text-blue-600 cursor-pointer">
              <svg /* upload icon */ className="h-5 w-5" /* ... */></svg>
              <span>Upload new document</span>
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
            {/* sample file link to download */}
            <button
              onClick={() => handleDownload("insurance.pdf")}
              className="text-sm text-gray-700 hover:underline"
            >
              Download / View insurance.pdf
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="
            w-full bg-blue-600 text-white 
            py-3 rounded-full text-sm font-semibold
            hover:bg-blue-700
          "
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
