import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import EnvironmentDropdown from "./environmentDropdown";
import { EnvironmentData } from "@/types/cultivarTypes";
import ModalEditReferenceTitle from "../references/modalEditReferenceTitle";
import { getRoleFromStorage, getRoleFromToken } from "@/utils/authUtils";
import { useAuthContext } from "@/contexts/auth/authContext";

export default function ReferenceDropdown({
  environmentData,
  title,
  comment,
  id,
  cultivarId,
}: {
  key: string;
  environmentData: EnvironmentData[];
  title: string;
  comment: string | null | undefined;
  id: string;
  cultivarId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const { user } = useAuthContext();

  const handleEditVisible = (isVisible: boolean) => {
    setIsModalEditVisible(isVisible);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalEditVisible(true);
  };

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
        className={Styles.toggleButton}
      >
        <div className={Styles.headerContainer}>
          {title}
            {isOpen && user &&
            <div className={Styles.buttonsContainer}>
              <span
                className={Styles.actionEditButton}
                onClick={handleEdit}
                title={"Editar Livro"}
              >
                <FaEdit />
              </span>
            </div>
          }
        </div>
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      <div className={Styles.content}>
        {environmentData.map((environment, index) => (
          <EnvironmentDropdown
            key={environment.environment.id}
            environmentData={environment}
            index={index}
            referenceId={id}
            cultivarId={cultivarId}
          />
        ))}
      </div>

      {isModalEditVisible && (
        <ModalEditReferenceTitle
          visible={isModalEditVisible}
          handleVisible={handleEditVisible}
          data={{ id, title, comment }}
        />
      )}
    </div>
  );
}
