
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
    <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm p-2 rounded-full border border-slate-700/50">
      <Sun className={`h-5 w-5 transition-colors ${!isChecked ? 'text-yellow-400' : 'text-slate-500'}`} />
      <Switch
        id="theme-toggle"
        checked={isChecked}
        onCheckedChange={onToggle}
        aria-label="Toggle between Day and Earth Night mode"
      />
      <Moon className={`h-5 w-5 transition-colors ${isChecked ? 'text-blue-300' : 'text-slate-500'}`} />
    </div>
  );
};
