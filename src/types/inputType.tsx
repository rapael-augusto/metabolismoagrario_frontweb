export default interface inputDefaultType {
  classe: string;
  label: string;
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
