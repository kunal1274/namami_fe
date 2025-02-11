
import React, { useState } from "react";
import AppKunalVersion from "./AppKunalVersion";
import AppSumitVersion from "./AppSumitVersion";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";

function App() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [upArrow, setUpArrow] = useState(false);

  const versionGroup = (
    <div className="flex flex-wrap space-x-4 mb-6 border-b-2 pb-4">
      <button
        onClick={() => {
          setSelectedVersion("kunal");
          //setUpArrow(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click For Kunal Version
      </button>
      <button
        onClick={() => {
          setSelectedVersion("sumit");
          //setUpArrow(true);
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Click for Sumit Version
      </button>
      <button
        onClick={() => {
          setSelectedVersion("");
          //setUpArrow(false);
        }}
        className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-600"
      >
        Reset Versions
      </button>
    </div>
  );
  const displayGroup = (
    <div className="border p-4 rounded shadow-md bg-gray-50">
      {selectedVersion === "kunal" && <AppKunalVersion />}
      {selectedVersion === "sumit" && <AppSumitVersion />}
      {!selectedVersion && (
        <p className="text-gray-500">
          Please select a version from the top buttons to display over here
        </p>
      )}
    </div>
  );

  const handleToggleArrow = () => {
    setUpArrow(!upArrow);
  };

  return (
    <div className="p-4">
      {upArrow ? (
        <FaRegArrowAltCircleDown
          onClick={() => setUpArrow(!upArrow)}
          className="pb-1"
        />
      ) : (
        <FaRegArrowAltCircleUp
          onClick={() => setUpArrow(!upArrow)}
          className="pb-1"
        />
      )}
      {upArrow ? "" : versionGroup}
      {displayGroup}
    </div>

  );
}

export default App;
