import React from "react";

export default interface inputDefaultType {
  classe: string;
  label: string;
  legend?: string;
  errorMsg?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | null;
  placeholder: string;
  type: string;
  step?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  editButton?: boolean;
  required?: boolean;
}
