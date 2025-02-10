import React, { useState } from "react";
import { AddCard } from "./AddCardAlt";
import { TermsModal } from "./TermsModal";
import { PromoList } from "./PromoListing";
import { AddPromoCode } from "./AddPromoCode";

export default function Promo() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="App">
      {/* e.g. Show 'AddCard' by default */}
      <AddCard />

      {/* Possibly a button somewhere to open Terms */}
      <button
        onClick={() => setShowTerms(true)}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Terms
      </button>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />

      {/* Example usage of other screens: */}
      {/* <PromoList /> */}
      {/* <AddPromoCode /> */}
    </div>
  );
}
