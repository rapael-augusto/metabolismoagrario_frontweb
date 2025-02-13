import Select, { SingleValue } from "react-select";
import { typeSelectOptions } from "@/utils/selectOptions"; // opções personalizadas que você já tem

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SingleValue<SelectOption>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="custom-select-container">
      <label className="custom-select-label">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        classNamePrefix="custom-select"
      />
    </div>
  );
};

export default CustomSelect;
