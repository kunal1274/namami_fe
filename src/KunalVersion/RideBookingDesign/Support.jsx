import React, { useState } from "react";
import { SupportLanding } from "./SupportLandingPage";
import { FaqPage } from "./FAQPage";
import { SupportRequestCompact } from "./SupportRequestCompact";
import { SupportRequestDetailed } from "./SupportRequestDetailed";

function Support() {
  // For demonstration, we’ll just show one at a time
  const [page, setPage] = useState("landing");

  return (
    <div className="App">
      {page === "landing" && <SupportLanding />}
      {page === "faq" && <FaqPage />}
      {page === "compact" && <SupportRequestCompact />}
      {page === "detailed" && <SupportRequestDetailed />}

      {/* Buttons to switch pages */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setPage("landing")}
        >
          Landing
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setPage("faq")}
        >
          FAQ
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setPage("compact")}
        >
          Compact
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setPage("detailed")}
        >
          Detailed
        </button>
      </div>
    </div>
  );
}

export default Support;
