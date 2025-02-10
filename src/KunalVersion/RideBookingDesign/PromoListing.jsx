import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function PromoList() {
  const promos = [
    {
      id: 1,
      title: "30% discount",
      description: "Kate used 2 rides with 30% discount from Rakuten",
    },
    {
      id: 2,
      title: "30% discount",
      description: "Kate used 2 rides with 30% discount from Rakuten",
    },
  ];

  return (
    <div className="w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Promo</h1>
      </div>

      {/* Promo cards */}
      <div className="px-4 space-y-4 mt-4">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="
              bg-white rounded-xl shadow-sm 
              p-4 border border-gray-100
            "
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {promo.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{promo.description}</p>

            {/* Circles row (just placeholders) */}
            <div className="flex space-x-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom button */}
      <div className="px-4 mt-6">
        <button
          className="
          w-full bg-blue-600 text-white 
          py-3 rounded-full text-sm font-semibold hover:bg-blue-700
        "
        >
          Add promocode
        </button>
      </div>
    </div>
  );
}
