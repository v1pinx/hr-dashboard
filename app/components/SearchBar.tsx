"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search employees...",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full sm:w-[320px] lg:w-[400px]">
      {/* Search Input Container */}
      <div
        className={`
          relative flex items-center w-full h-11  
          border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-sm
          transition-all duration-200 ease-in-out
          ${
            isFocused
              ? "ring-1 ring-white ring-offset-0 border-white shadow-md"
              : "hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-md"
          }
        `}
      >
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 transition-colors duration-200 text-zinc-400 dark:text-zinc-500" />
        </div>

        {/* Input Field */}
        <input
          type="search"
          placeholder={placeholder}
          className="
            w-full h-full pl-10 pr-5 bg-transparent 
            text-zinc-900 dark:text-white 
            border-0 outline-none ring-0 focus:ring-0
            text-sm font-medium
          "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
