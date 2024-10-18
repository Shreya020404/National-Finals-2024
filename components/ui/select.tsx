import { useState } from "react";
import { cn } from "@/lib/utils"; // Utility for conditional classnames
import React from "react";

// Select Component
interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function Select({
  children,
  value,
  onValueChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectItemClick = (newValue: string) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue value={value} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
              onClick: handleSelectItemClick,
            })
          )}
        </SelectContent>
      )}
    </div>
  );
}

// SelectTrigger Component
interface SelectTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function SelectTrigger({ children, onClick }: SelectTriggerProps) {
  return (
    <button
      className="w-full text-left px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// SelectContent Component
interface SelectContentProps {
  children: React.ReactNode;
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600">
      <ul>{children}</ul>
    </div>
  );
}

// SelectItem Component
interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  onClick: (value: string) => void;
}

export function SelectItem({ children, value, onClick }: SelectItemProps) {
  return (
    <li
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
      onClick={() => onClick(value)}
    >
      {children}
    </li>
  );
}

// SelectValue Component
interface SelectValueProps {
  value?: string;
}

export function SelectValue({ value }: SelectValueProps) {
  return <span>{value || "Select an option"}</span>;
}
