import { useState, useRef } from "react";

const ImageComparisonSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const newSliderPosition = Math.max(
      0,
      Math.min(100, ((offsetX - containerRect.left) / containerRect.width) * 100)
    );
    setSliderPosition(newSliderPosition);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden"
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onTouchMove={handleDrag}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="object-cover w-full h-full"
        />
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={afterImage}
          alt="After"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 h-full border-2 border-gray-700 bg-gray-900 bg-opacity-50"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-1 h-full bg-white"></div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
