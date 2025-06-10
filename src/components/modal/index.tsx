import styles from "@/styles/modal/index.module.css";
import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalRootProps {
	children: ReactNode;
	size?: "lg" | "sm" | "md";
	position?: "top-center" | "center" | "bottom-center";
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
	submitText?: string;
}

export default function Modal({
	children,
	size,
	isOpen,
	position,
}: ModalRootProps) {
	const alignment = position ?? "center";
	return (
		isOpen && (
			<div className={styles.overlay}>
				<div
					className={`${styles.modalContainer} ${size ? styles[size] : "md"} ${
						styles[alignment]
					}`}
				>
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
        {submitText && (
          <button className={submitText === "Deletar" ? styles.deleteButton : styles.confirmButton} onClick={onSubmit}>
            {submitText}
          </button>
        )}
      </div>
    </footer>
  );
};

