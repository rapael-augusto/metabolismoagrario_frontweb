import React, { useState } from "react";
import "@/styles/layout/select.css";

interface SelectProps {
  className?: string;
  label?: string;
  type: "form" | "filter";
  placeholder?: string;
  value?: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

const CustomSelect: React.FC<SelectProps> = ({
  className,
  value,
  label,
  options,
  onChange,
  placeholder,
  type,
  required,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`${type}-select ${className}`}>
      <label className="select-label" htmlFor="select">
        {label}
        {required && (
          <span style={{ color: "var(--brown)", fontSize: "1rem" }}>*</span>
        )}
      </label>

      <select
        value={value ?? undefined}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      >
        <option hidden value="empty">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            className="select-options"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
