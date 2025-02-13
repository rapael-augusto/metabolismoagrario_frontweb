import styles from "@/styles/modal/index.module.css";
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalRootProps {
  children: ReactNode;
  size: "lg" | "sm" | "md";
  isOpen: boolean;
}

interface ModalHeaderProps {
  title: string;
  description: string;
  onClose: () => void;
  children?: ReactNode;
}

interface ModalFooterProps {
  cancelText: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitText: string;
}

export default function Modal({ children, size, isOpen }: ModalRootProps) {
  return (
    isOpen && (
      <div className={styles.overlay}>
        <div className={`${styles.modalContainer} ${styles[size]}`}>
          {children}
        </div>
      </div>
    )
  );
}

Modal.Header = function Header({
  title,
  description,
  onClose,
  children,
}: ModalHeaderProps) {
  return (
    <header>
      <div className={styles.modalInfoWrapper}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span onClick={onClose}>
          <FaTimes />
        </span>
      </div>
      {children}
    </header>
  );
};

Modal.Main = function Main({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
};

Modal.Footer = function Footer({
  onCancel,
  onSubmit,
  cancelText,
  submitText,
}: ModalFooterProps) {
  return (
    <footer>
      <div>
        <button className={styles.cancelButton} onClick={onCancel}>
          {cancelText}
        </button>
        <button className={styles.confirmButton} onClick={onSubmit}>
          {submitText}
        </button>
      </div>
    </footer>
  );
};
