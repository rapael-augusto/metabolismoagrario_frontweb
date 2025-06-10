import { createContext, useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import EnvironmentDropdown from "./environmentDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";

export const bookContext = createContext<{
  isBookSelected: boolean;
  toggleEnvironmentSelection: (index: number, isSelected: boolean) => void;
}>({
  isBookSelected: false,
  toggleEnvironmentSelection: () => {},
});

export default function ReferenceDropdown({
  environmentData,
  title,
  comment,
  id,
}: {
  key: string;
  environmentData: EnvironmentData[];
  title: string;
  comment: string | null | undefined;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
        className={Styles.toggleButton}
      >
        <div className={Styles.checkboxContainer}>{title}</div>
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      <div className={Styles.content}>
        {environmentData.map((environment, index) => (
          <EnvironmentDropdown
            key={environment.environment.id}
            environmentData={environment}
            title={title}
            comment={comment}
            index={index}
            referenceId={id}
          />
        ))}
      </div>
    </div>
  );
}
