"use client";

import React, { InputHTMLAttributes, useRef, useEffect, useMemo } from "react";
import styles from "@/styles/layout/autoCompleteTextInput.module.css";

interface AutoCompleteTextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  suggestions: string[];
  label: string;
  disclaimer?: string;
  value: string;
  required?: boolean;
  handleOnChange: (e: string) => void;
}

const AutoCompleteTextInput: React.FC<AutoCompleteTextInputProps> = ({
  suggestions,
  label,
  disclaimer,
  value,
  required,
  handleOnChange,
  ...inputProps
}) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e.target.value);
    setShowSuggestions(true);
  };

  const filteredSuggestions = useMemo(() => {
    const normalize = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const normalizedInput = normalize(value);

    return suggestions.filter((s) => normalize(s).includes(normalizedInput));
  }, [value, suggestions]);

  const handleSelect = (selected: string) => {
    handleOnChange(selected);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
        {required && (
          <span style={{ color: "var(--brown)", fontSize: "1rem" }}>*</span>
        )}
      </label>
      <div className={styles.container} ref={containerRef}>
        <input
          type="text"
          {...inputProps}
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          className={styles.input}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {disclaimer && (
              <li className={styles.disclaimer} aria-disabled="true">
                * {disclaimer}
              </li>
            )}
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className={styles.suggestionItem}
                onMouseDown={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteTextInput;
