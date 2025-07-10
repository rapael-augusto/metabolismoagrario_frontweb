import React, { useState } from "react";
import "@/styles/form/input.css";
import inputDefaultType from "@/types/inputType";
import { FaEdit, FaTimes } from "react-icons/fa";

const InputDefault: React.FC<inputDefaultType> = ({
  classe,
  label,
  errorMsg,
  legend,
  onChange,
  value,
  placeholder,
  type,
  step,
  disabled,
  onBlur,
  min,
  max,
  editButton,
  required,
}) => {
  const [readonly, setReadonly] = useState(editButton);

  return (
    <div className={`inputDefault-container ${classe}`}>
      <label className="inputDefault-label" htmlFor={label}>
        {label}
        {required && (
          <span style={{ color: "var(--brown)", fontSize: "1rem" }}>*</span>
        )}
        <div className="legendWrapper">
          <small>{legend}</small>
          <div className="error-wrapper">
            <small style={{ color: "red" }}>{errorMsg}</small>
          </div>
        </div>
      </label>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          className="inputDefault-input"
          step={step}
          type={type}
          id={label}
          min={min}
          max={max}
          value={type === "number" ? value ?? 0 : value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readonly}
          required={required}
        />
        {editButton ? (
          readonly ? (
            <FaEdit
              style={{
                position: "absolute",
                right: "10px",
                fontSize: "1.125rem",
                color: "#6c757d",
                cursor: "pointer",
              }}
              onClick={() => setReadonly(false)}
            />
          ) : (
            <FaTimes
              style={{
                position: "absolute",
                right: "10px",
                fontSize: "1.125rem",
                color: "#6c757d",
                cursor: "pointer",
              }}
              onClick={() => setReadonly(true)}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default InputDefault;
