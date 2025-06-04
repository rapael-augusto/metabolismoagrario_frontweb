import { createContext, useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import EnvironmentDropdown from "./environmentDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";
import { selectContext } from "@/app/(public)/cultivars/view/[id]/page";

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
}: {
  key: string;
  environmentData: EnvironmentData[];
  title: string;
}) {
  const enterSelectingState = useContext(selectContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [selectedEnvironments, setSelectedEnvironments] = useState<boolean[]>(
    new Array(environmentData.length).fill(false)
  )

  useEffect(() => {
    const allSelected = selectedEnvironments.every(Boolean);
    if (allSelected !== isBookSelected) {
      setIsBookSelected(allSelected);
    }
  }, [selectedEnvironments]);

  useEffect(() => {
    setIsBookSelected(false);
    setSelectedEnvironments(new Array(environmentData.length).fill(false));
  }, [enterSelectingState])

  const toggleEnvironmentSelection = (index: number, isSelected: boolean) => {
    setSelectedEnvironments(prev => {
      const newSelection = [...prev];
      newSelection[index] = isSelected;
      return newSelection;
    })
  }

  const handleBookSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookSelected(!isBookSelected);
    setSelectedEnvironments(new Array(environmentData.length).fill(!isBookSelected));
  }
  
  return (
    <div className={`${!isBookSelected ? Styles.referenceDropdown : Styles.referenceDropdownRed} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
        className={Styles.toggleButton}
      >
        <div className={Styles.checkboxContainer}>
          {enterSelectingState ? <input type="checkbox" className={Styles.checkbox} onChange={(e) => e.stopPropagation()} onClick={handleBookSelection} checked={isBookSelected} readOnly /> : null}
          {title}
        </div>
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      <div className={Styles.content}>
        {environmentData.map((environment, index) => (
          <bookContext.Provider value={{isBookSelected, toggleEnvironmentSelection}} key={`contextProvider${index}`}>
            <EnvironmentDropdown
              key={environment.environment.id}
              environmentData={environment}
              index={index}
            />
          </bookContext.Provider>
        ))}
      </div>
    </div>
  );
}