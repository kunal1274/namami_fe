import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function DriverProfilePage() {
  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Driver license uploaded: ${file.name}`);
    }
  };

  const handleIDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`National ID uploaded: ${file.name}`);
    }
  };

  const handleDocDownload = (docName) => {
    alert(`Initiating download for ${docName}`);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Driver details</h1>
      </div>

      {/* Driver Info */}
      <div className="px-4 mt-2">
        {/* Top row: Avatar + name + car model */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://i.pravatar.cc/300"
              alt="driver avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">Patrick</p>
            <p className="text-sm text-gray-500">Mercedes Vito</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex space-x-4 mb-4">
          <div className="flex flex-col items-center bg-gray-50 px-3 py-2 rounded-xl">
            <svg
              /* star icon */ className="h-5 w-5 text-gray-400" /* ... */
            ></svg>
            <p className="text-sm font-semibold text-gray-800">4.8</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 px-3 py-2 rounded-xl">
            <svg
              /* heart icon */ className="h-5 w-5 text-gray-400" /* ... */
            ></svg>
            <p className="text-sm font-semibold text-gray-800">126</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 px-3 py-2 rounded-xl">
            <svg
              /* briefcase icon */ className="h-5 w-5 text-gray-400" /* ... */
            ></svg>
            <p className="text-sm font-semibold text-gray-800">2 years</p>
          </div>
        </div>

        {/* Info Card */}
        <div
          className="
            bg-white rounded-xl shadow 
            p-4 border border-gray-100
          "
        >
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-400">Member since</p>
            <p className="text-sm text-gray-700 font-medium">16.06.2017</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <p className="text-sm text-gray-400">Car type</p>
            <p className="text-sm text-gray-700 font-medium">Van</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <p className="text-sm text-gray-400">Plate number</p>
            <p className="text-sm text-gray-700 font-medium">HS785K</p>
          </div>
        </div>

        {/* Upload docs */}
        <div className="mt-4 space-y-3">
          <p className="text-gray-800 font-semibold">
            Driver License / National ID
          </p>
          <label className="flex items-center space-x-2 text-blue-600 cursor-pointer">
            <svg /* upload icon */ className="h-5 w-5" /*...*/></svg>
            <span>Upload driver license</span>
            <input
              type="file"
              className="hidden"
              onChange={handleLicenseUpload}
            />
          </label>
          <label className="flex items-center space-x-2 text-blue-600 cursor-pointer">
            <svg /* upload icon */ className="h-5 w-5" /*...*/></svg>
            <span>Upload national ID</span>
            <input type="file" className="hidden" onChange={handleIDUpload} />
          </label>

          {/* Download links example */}
          <button
            onClick={() => handleDocDownload("driver_license.pdf")}
            className="text-sm text-gray-700 hover:underline"
          >
            Download / View driver_license.pdf
          </button>
        </div>
      </div>
    </div>
  );
}
