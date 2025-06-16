"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { Constant } from "@/types/cultivarTypes";
import { translationsMap, typeTranslation } from "@/utils/translationsOptions";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import ModalEditConstants from "./modalEditConstants";
import constant from "@/app/(public)/constant/[id]/page";

export default function ConstantsDropdown({
  constants,
  referenceId
}: {
  constants: Constant[];
  referenceId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

    const handleEditVisible = (isVisible: boolean) => {
    setModalEditVisible(isVisible);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalEditVisible(true);
  };

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        <div className={Styles.headerContainer}>
          Constantes
          <div className={Styles.buttonsContainer}>
            <span
              className={Styles.actionEditButton}
              onClick={handleEdit}
              title={"Editar Constantes"}
            >
              <FaEdit />
            </span>
          </div>
        </div>
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className={Styles.content}>
          <ul className={Styles.constantsList}>
            {constants.map((constant) => (
              <li key={constant.id} className={Styles.constantItem}>
                <div>
                  <strong>Tipo:</strong> {typeTranslation[constant.type]}
                </div>
                <div>
                  <strong>Valor:</strong> {constant.value}
                </div>
                {constant.comment && (
                  <div>
                    <strong>Comentário:</strong> {constant.comment}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      { <ModalEditConstants 
            visible={modalEditVisible}
            handleVisible={handleEditVisible}
            data={constants}
            referenceId={referenceId}
        /> }
    </div>
  );
}
