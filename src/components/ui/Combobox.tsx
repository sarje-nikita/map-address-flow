import React from 'react';

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (option: any) => void;
  options: any[];
  getOptionLabel: (option: any) => string;
  placeholder?: string;
  className?: string;
}

export function Combobox({
  value,
  onChange,
  onSelect,
  options,
  getOptionLabel,
  placeholder,
  className,
}: ComboboxProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      {options.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => onSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
