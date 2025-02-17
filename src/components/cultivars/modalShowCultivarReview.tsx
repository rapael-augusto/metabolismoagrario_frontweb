import { CultivarReviewType } from "@/app/(private)/reviews/page";
import Modal from "../modal";
import InputDefault from "../forms/inputDefault";
import styles from "@/styles/cultivar/modals/modalAprrove.module.css";

interface ModalProps {
	isModalOpen: boolean;
	handleModalOpen: (isOpen: boolean) => void;
	reviewSelected?: CultivarReviewType;
}

export default function ModalShowCultivarReview({
	isModalOpen,
	handleModalOpen,
	reviewSelected,
}: ModalProps) {
	return (
		<Modal isOpen={isModalOpen} size="sm">
			<Modal.Header
				title={`Visualizar informações`}
				description=""
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
							</>
						)}
					</div>
					{reviewSelected?.justification && (
						<div className={styles.justificationContainer}>
							<label htmlFor="justification">
								<strong>Justificativa</strong>
							</label>
							<textarea
								name="justification"
								value={reviewSelected?.justification}
								readOnly
								disabled
								style={{ resize: "none" }}
							></textarea>
						</div>
					)}
				</>
			</Modal.Main>
		</Modal>
	);
}
