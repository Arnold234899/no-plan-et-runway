
import React from "react";
import { CircleDot, Star } from "lucide-react";

export const DayNightToggle = ({ className = "" }: { className?: string }) => {
  const [earthMode, setEarthMode] = React.useState(true);

  React.useEffect(() => {
    if (earthMode) {
      document.documentElement.classList.remove("night");
      document.documentElement.classList.add("earth");
    } else {
      document.documentElement.classList.remove("earth");
      document.documentElement.classList.add("night");
    }
  }, [earthMode]);

  return (
    <button
      aria-label={earthMode ? "Switch to Night Mode" : "Switch to Earth Mode"}
      className={
        "fixed right-6 bottom-6 z-40 bg-gradient-to-br from-blue-900 via-emerald-600 to-teal-700 p-2 rounded-full shadow-2xl border-2 border-blue-400 hover:scale-110 transform transition-transform duration-300 focus:outline-none " +
        className
      }
      onClick={() => setEarthMode((e) => !e)}
    >
      {earthMode ? (
        <CircleDot className="text-blue-300" size={30} />
      ) : (
        <Star className="text-yellow-400" size={28} />
      )}
    </button>
  );
};
