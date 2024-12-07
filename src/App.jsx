import React, { useState } from "react";
import AppKunalVersion from "./AppKunalVersion";
import AppSumitVersion from "./AppSumitVersion";

function App() {
  const [selectedVersion, setSelectedVersion] = useState(null);

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4 mb-6 border-b-2 pb-4">
        <button
          onClick={() => setSelectedVersion("kunal")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Click For Kunal Version
        </button>
        <button
          onClick={() => setSelectedVersion("sumit")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Click for Sumit Version
        </button>
      </div>

      <div className="border p-4 rounded shadow-md bg-gray-50">
        {selectedVersion === "kunal" && <AppKunalVersion />}
        {selectedVersion === "sumit" && <AppSumitVersion />}
        {!selectedVersion && (
          <p className="text-gray-500">
            Please select a version from the top buttons to display over here
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
