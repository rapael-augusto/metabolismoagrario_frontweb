import { CultivarReviewType } from "@/app/(private)/reviews/page";
import Modal from "../modal";
import InputDefault from "../forms/inputDefault";
import styles from "@/styles/cultivar/modals/modalAprrove.module.css";
import { useState } from "react";
import EnvironmentCard from "../calculator/environmentCard";
import { ReviewStatus } from "@/types/cultivarTypes";
import { useConfirm } from "@/contexts/confirmationModal/confirmationModalContext";
import { toast } from "react-toastify";

interface ModalProps {
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
   reviewSelected: CultivarReviewType;
  handleReject: (status: ReviewStatus, justification: string) => Promise<void>;
  handleApprove: (approve: boolean, justification: string) => Promise<void>;
}

export default function ModalApproveCultivar({
  isModalOpen,
  handleModalOpen,
  reviewSelected,
  handleApprove,
  handleReject,
}: ModalProps) {
  const confirm = useConfirm();
  const [justification, setJustification] = useState("");

  if (!reviewSelected) return null;

  const handleActionClick = async (
    action: "approve" | "reject" | "requestChanges"
  ) => {
    const actionMap = {
      approve: {
        message: "aprovar",
        action: () => handleApprove(true, justification),
        variant: "default" as const,
      },
      reject: {
        message: "rejeitar",
        action: () => handleReject("REJECTED", justification),
        variant: "danger" as const,
      },
      requestChanges: {
        message: "solicitar alterações para",
        action: () => handleReject("CHANGES_REQUESTED", justification),
        variant: "warning" as const,
      },
    };

    if (!justification.trim() && action != "approve") {
      toast.error("Por favor, insira uma justificativa antes de continuar.");
      return;
    }

    const currentAction = actionMap[action];

    const confirmed = await confirm({
      title: `Confirmar ${
        action === "approve"
          ? "aprovação"
          : action === "reject"
          ? "rejeição"
          : "solicitação de alterações"
      }`,
      message: `Você está prestes a ${currentAction.message} a cultivar "${reviewSelected?.Cultivar.name}".`,
      details: justification ? `Justificativa: ${justification}` : "-",
      variant: currentAction.variant,
      confirmText:
        action === "approve"
          ? "Aprovar"
          : action === "reject"
          ? "Rejeitar"
          : "Enviar para revisão",
    });

    if (confirmed) {
      await currentAction.action();
    }
  };

  return (
    <Modal isOpen={isModalOpen} size="lg">
      <Modal.Header
        title={`Aprovar o cadastro da cultivar`}
        description="Verifique as informações da cultivar antes de aprovar"
        onClose={() => handleModalOpen(false)}
      />
      <Modal.Main>
        <>
          <div className={styles.cultivarInfoContainer}>
            <h3>Dados da referência</h3>
            <div className={styles.inputWrapper}>
              <InputDefault
                label={"Nome"}
                value={reviewSelected.reference.title}
                onChange={() => null}
                type="text"
                disabled
                classe={""}
                placeholder={""}
              />
              {reviewSelected.reference.comment && (
                <InputDefault
                  label={"Comentário"}
                  value={reviewSelected.reference.comment}
                  onChange={() => null}
                  type="text"
                  disabled
                  classe={""}
                  placeholder={""}
                />
              )}
            </div>
            <EnvironmentCard
              envData={{
                id: "",
                constants: reviewSelected.Constants,
                environment: {
                  ...reviewSelected.Environment,
                  countryName: reviewSelected.Environment.country.nome_pais,
                },
              }}
              selected={false}
            />
          </div>
          <div className={styles.cultivarInfoContainer}>
            <h3>Dados da solicitação</h3>

            <div className={styles.inputWrapper}>
              <InputDefault
                label={"Cultivar"}
                value={reviewSelected.Cultivar.name}
                onChange={() => null}
                type="text"
                disabled
                classe={""}
                placeholder={""}
              />
              <InputDefault
                label={"Solicitante"}
                value={reviewSelected.requestedBy.name}
                onChange={() => null}
                type="text"
                disabled
                classe={""}
                placeholder={""}
              />
            </div>

            <div className={styles.inputWrapper}>
              <InputDefault
                label="Data da solicitação"
                value={new Date(reviewSelected.createdAt).toLocaleDateString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
                onChange={() => null}
                type="text"
                disabled
                classe=""
                placeholder=""
              />
              {reviewSelected.reviewed_at && (
                <InputDefault
                  label="Data de aprovação"
                  value={new Date(
                    reviewSelected.reviewed_at
                  ).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  onChange={() => null}
                  type="text"
                  disabled
                  classe=""
                  placeholder=""
                />
              )}
            </div>
          </div>
          <div className={styles.actionsWrapper}>
            <h3>Ações</h3>
            <div className={styles.actionsContainer}>
              <button
                className={`${styles.actionButton} ${styles.approveButton}`}
                onClick={() => handleActionClick("approve")}
              >
                Aprovar
              </button>
              <button
                className={`${styles.actionButton} ${styles.rejectButton}`}
                onClick={() => handleActionClick("reject")}
              >
                Rejeitar
              </button>
              <button
                className={`${styles.actionButton} ${styles.reviewButton}`}
                onClick={() => handleActionClick("requestChanges")}
              >
                Enviar pra Revisão
              </button>
            </div>
          </div>
          <div className={styles.justificationContainer}>
            <label htmlFor="justification">
              <strong>Justificativa</strong>
            </label>
            <textarea
              name="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            ></textarea>
          </div>
        </>
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        onCancel={() => {
          setJustification("");
          handleModalOpen(false);
        }}
      />
    </Modal>
  );
}
