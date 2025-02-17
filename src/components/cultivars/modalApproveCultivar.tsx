import { CultivarReviewType } from "@/app/(private)/reviews/page";
import Modal from "../modal";
import InputDefault from "../forms/inputDefault";
import styles from "@/styles/cultivar/modals/modalAprrove.module.css";
import { useState } from "react";

interface ModalProps {
	isModalOpen: boolean;
	handleModalOpen: (isOpen: boolean) => void;
	reviewSelected?: CultivarReviewType;
	handleApprove: (approve: boolean, justification: string) => Promise<void>;
}

export default function ModalApproveCultivar({
	isModalOpen,
	handleModalOpen,
	reviewSelected,
	handleApprove,
}: ModalProps) {
	const [justification, setJustification] = useState("");
	return (
		<Modal isOpen={isModalOpen} size="sm">
			<Modal.Header
				title={`Aprovar o cadastro da cultivar`}
				description="Verifique as informações da cultivar antes da ação."
				onClose={() => handleModalOpen(false)}
			/>
			<Modal.Main>
				<>
					<div className={styles.cultivarInfoContainer}>
						<h3>Dados da cultivar</h3>
						{reviewSelected && (
							<>
								<div className={styles.inputWrapper}>
									<InputDefault
										label={"Name"}
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
										value={new Date(
											reviewSelected.createdAt
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
								</div>
							</>
						)}
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
				onCancel={() => handleApprove(false, justification)}
				onSubmit={() => handleApprove(true, justification)}
			/>
		</Modal>
	);
}
