"use client";

import { useState } from "react";

type ButtonConfig = {
  label: string;
  action?: "number" | "operator" | "decimal" | "equal" | "clear";
  className?: string;
};

const buttonLayout: ButtonConfig[][] = [
  [
    { label: "7", action: "number" },
    { label: "8", action: "number" },
    { label: "9", action: "number" },
    { label: "/", action: "operator" },
  ],
  [
    { label: "4", action: "number" },
    { label: "5", action: "number" },
    { label: "6", action: "number" },
    { label: "*", action: "operator" },
  ],
  [
    { label: "1", action: "number" },
    { label: "2", action: "number" },
    { label: "3", action: "number" },
    { label: "-", action: "operator" },
  ],
  [
    { label: "0", action: "number" },
    { label: ".", action: "decimal" },
    {
      label: "=",
      action: "equal",
      className: "bg-green-500 hover:bg-green-800 text-white",
    },
    { label: "+", action: "operator" },
  ],
];

export default function Home() {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [previousInput, setPreviousInput] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const handleClick = (btn: ButtonConfig) => {
    const { label, action } = btn;

    switch (action) {
      case "number":
        setCurrentInput(currentInput + label);
        break;
      case "operator":
        if (!currentInput) return;
        setOperator(label);
        setPreviousInput(currentInput);
        setCurrentInput("");
        break;
      case "decimal":
        if (!currentInput.includes(".")) {
          setCurrentInput(currentInput + ".");
        }
        break;
      case "equal":
        if (previousInput && currentInput && operator) {
          try {
            // eslint-disable-next-line no-eval
            const result = eval(`${previousInput}${operator}${currentInput}`);
            setCurrentInput(String(result));
            setPreviousInput("");
            setOperator("");
          } catch {
            setCurrentInput("Error");
          }
        }
        break;
      case "clear":
        clearAll();
        break;
    }
  };

  const clearAll = () => {
    setCurrentInput("");
    setPreviousInput("");
    setOperator("");
  };

  return (
    <div className="bg-[#1e3231] h-screen w-screen flex justify-center items-center font-[cursive] text-[20px] font-bold">
      <div className="bg-[#485665] w-[90vw] sm:w-[400px] p-6 rounded-xl flex flex-col items-center">
        {/* Display */}
        <div className="bg-black text-white rounded-lg w-full h-12 px-4 py-2 text-right mb-4 overflow-hidden">
          {currentInput || operator || "0"}
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3 w-full mb-4">
          {buttonLayout.flat().map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn)}
              className={`rounded-lg text-[24px] bg-gray-400 hover:bg-gray-700 hover:text-white transition py-2 ${btn.className || ""}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Clear Button */}
        <button
          onClick={() => handleClick({ label: "C", action: "clear" })}
          className="w-full bg-red-600 hover:bg-red-800 text-white py-2 rounded-lg transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
