import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import EnvironmentDropdown from "./environmentDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";

export default function ReferenceDropdown({
  environmentData,
  title,
}: {
  key: string;
  environmentData: EnvironmentData[];
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        {title}
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      <div className={Styles.content}>
        {environmentData.map((environment, index) => (
          <EnvironmentDropdown
            key={environment.environment.id}
            environmentData={environment}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
