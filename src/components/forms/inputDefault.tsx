import React from "react";
import "../../styles/form/input.css";
import inputDefaultType from "@/types/inputType";

const InputDefault: React.FC<inputDefaultType> = ({
  classe,
  label,
  onChange,
  value,
  placeholder,
  type,
  step,
  disabled,
  onBlur,
  min,
  max,
}) => {
  return (
    <div className={`inputDefault-container ${classe}`}>
      <label className="inputDefault-label" htmlFor={label}>
        {label}
      </label>
      <input
        className="inputDefault-input"
        step={step}
        type={type}
        id={label}
        min={min}
        max={max}
        value={value !== null ? value.toString() : ""}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default InputDefault;
