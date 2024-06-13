import React, { useState } from "react";
import "../../styles/form/form.css"

interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
  
  <div className="form-select">

      <label htmlFor="select">{label}</label>
      
      <select value={selectedValue} onChange={handleChange}>
      
        <option value="empty"></option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      


      </select>
  
    </div>
  );
};

export default Select;
