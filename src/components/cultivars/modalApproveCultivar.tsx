import { CultivarReviewType } from "@/app/(private)/reviews/page";
import Modal from "../modal";
import InputDefault from "../forms/inputDefault";
import styles from "@/styles/cultivar/modals/modalAprrove.module.css";
import { useState } from "react";
import EnvironmentCard from "../calculator/environmentCard";
import { ReviewStatus } from "@/types/cultivarTypes";

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
  const [justification, setJustification] = useState("");
  if (!reviewSelected) return null;

  return (
    <Modal isOpen={isModalOpen} size="lg">
      <Modal.Header
        title={`Aprovar o cadastro da cultivar`}
        description="Verifique as informações da cultivar antes da ação."
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
        cancelText="Rejeitar"
        submitText="Aprovar"
        onCancel={() => handleReject("REJECTED", justification)}
        onSubmit={() => handleApprove(true, justification)}
      />
    </Modal>
  );
}
