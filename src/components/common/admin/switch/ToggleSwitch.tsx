"use client";

import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: (newState: boolean) => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, label }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isOn}
        onChange={() => onToggle(!isOn)}
      />
      {/* Background */}
      <div className={`w-14 h-7 rounded-full transition-colors duration-300 ${isOn ? "bg-green-500" : "bg-gray-300"} peer-focus:ring-2 peer-focus:ring-blue-500`}></div>
      {/* Knob */}
      <div
        className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900">
          {label}
        </span>
      )}
    </label>
  );
};

export default ToggleSwitch;
