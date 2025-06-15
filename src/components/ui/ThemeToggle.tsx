
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isChecked = theme === 'dark';
  return (
    <div className="flex items-center space-x-2 bg-slate-800/80 p-2 rounded-full border border-slate-400/50">
      <Sun className={`h-6 w-6 transition-colors ${!isChecked ? 'text-yellow-400' : 'text-slate-400'}`} />
      <Switch
        id="theme-toggle"
        checked={isChecked}
        onCheckedChange={onToggle}
        aria-label="Toggle between Day and Earth Night mode"
      />
      <Moon className={`h-6 w-6 transition-colors ${isChecked ? 'text-blue-300' : 'text-slate-400'}`} />
    </div>
  );
};
