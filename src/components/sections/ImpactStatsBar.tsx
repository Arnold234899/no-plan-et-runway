
import React, { useEffect, useState } from "react";
import { CircleCheck, Star, CircleDot } from "lucide-react";

const stats = [
  {
    icon: <CircleCheck className="text-emerald-400 animate-glow" size={22} />,
    label: "CO₂ Saved",
    start: 43210,
    end: 43210 + 500,
    suffix: "kg"
  },
  {
    icon: <Star className="text-blue-300 animate-glow" size={22} />,
    label: "Bottles Recycled",
    start: 513900,
    end: 513900 + 2500,
    suffix: ""
  },
  {
    icon: <CircleDot className="text-teal-300 animate-glow" size={22} />,
    label: "Waste Diverted",
    start: 1720,
    end: 1720 + 80,
    suffix: "kg"
  },
];

function animateValue(start: number, end: number, duration: number, setter: (v: number) => void) {
  const startTime = Date.now();
  function step() {
    const now = Date.now();
    const elapsed = now - startTime;
    if (elapsed >= duration) {
      setter(end);
      return;
    }
    const value = start + Math.round((end - start) * (elapsed / duration));
    setter(value);
    requestAnimationFrame(step);
  }
  step();
}

export const ImpactStatsBar = () => {
  const [values, setValues] = useState(stats.map((s) => s.start));

  useEffect(() => {
    stats.forEach((stat, i) => {
      animateValue(stat.start, stat.end, 2200 + i * 700, (v) => setValues((prev) => {
        const next = [...prev];
        next[i] = v;
        return next;
      }));
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-blue-950 via-emerald-950 to-teal-950 shadow-xl flex items-center justify-center gap-8 px-4 h-14">
      <div className="flex gap-8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-2 font-bold text-md md:text-lg text-white drop-shadow animate-fade-in">
            {stat.icon}
            <span className="text-white">{values[i].toLocaleString()}<span className="ml-0.5 font-normal text-xs text-slate-300">{stat.suffix}</span></span>
            <span className="ml-1 text-emerald-300">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
