"use client";
import Styles from "@/styles/cultivar/referenceDropdown.module.css";
import { Constant } from "@/types/cultivarTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ConstantsDropdown({
  constants,
}: {
  constants: Constant[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${Styles.referenceDropdown} ${isOpen ? Styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={Styles.toggleButton}
      >
        Constantes
        {isOpen ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className={Styles.content}>
          <ul className={Styles.constantsList}>
            {constants.map((constant) => (
              <li key={constant.id} className={Styles.constantItem}>
                <div>
                  <strong>Tipo:</strong> {constant.type}
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
    </div>
  );
}
