import Modal from "@/components/modal";
import styles from "@/styles/layout/confirmationModal.module.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "danger" | "warning";
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  details,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} size="md">
      <Modal.Header
        title={title}
        description=""
        onClose={onCancel}
      />
      <Modal.Main>
        <div className={styles.confirmationContent}>
          <p>{message}</p>
          {details && (
            <div className={`${styles.details} ${styles[variant]}`}>
              {details}
            </div>
          )}
        </div>
      </Modal.Main>
      <Modal.Footer
        cancelText={cancelText}
        submitText={confirmText}
        onCancel={onCancel}
        onSubmit={onConfirm}
        submitVariant={variant === "danger" ? "danger" : variant === "warning" ? "warning" : "default"}
      />
    </Modal>
  );
}