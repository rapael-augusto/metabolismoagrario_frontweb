import React, { useState } from "react";
import "../../styles/layout/select.css";

interface SelectProps {
  label?: string;
  type: "form" | "filter";
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  required?: boolean;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  options,
  onChange,
  placeholder,
  type,
  required,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`${type}-select`}>
      <label className="select-label" htmlFor="select">
        {label}
        {required && (
          <span style={{ color: "var(--brown)", fontSize: "1rem" }}>*</span>
        )}
      </label>

      <select value={selectedValue} onChange={handleChange} required={required}>
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
