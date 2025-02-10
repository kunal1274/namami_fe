import React, { useState } from "react";

// Example: Single Slide data
const tutorialSlides = [
  {
    title: "Tap to search for the desired destination",
    arrowPosition: { top: "50%", left: "50%" }, // just example
    // could hold more data about arrow rotation, target highlight, etc.
  },
  {
    title: "Tap here to book your ride",
    arrowPosition: { top: "60%", left: "30%" },
  },
  {
    title: "You can see driver’s route on the map",
    arrowPosition: { top: "40%", left: "70%" },
  },
];

export function TutorialOverlay() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // End tutorial
  const handleFinish = () => {
    // e.g. hide the overlay or set a state
    setCurrentSlide(null);
  };

  if (currentSlide === null) return null; // tutorial ended

  const slide = tutorialSlides[currentSlide];

  const handleNext = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      {/* We can show a map behind it if needed, but this overlay dims everything. */}
      <div className="relative w-full h-full">
        {/* The arrow or highlight (just for demonstration) */}
        <div
          className="absolute text-white flex flex-col items-center"
          style={{
            top: slide.arrowPosition.top,
            left: slide.arrowPosition.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Arrow graphic (downwards) - you can rotate or change direction */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-12 w-12 mb-2 opacity-80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v14m7-7H5"
            />
          </svg>

          {/* Title text */}
          <p className="text-center text-lg font-bold leading-snug drop-shadow">
            {slide.title}
          </p>
        </div>

        {/* Next or Finish button */}
        <div className="absolute bottom-6 w-full flex justify-center">
          <button
            onClick={handleNext}
            className="bg-white text-black px-6 py-2 rounded-full shadow font-semibold"
          >
            {currentSlide < tutorialSlides.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
