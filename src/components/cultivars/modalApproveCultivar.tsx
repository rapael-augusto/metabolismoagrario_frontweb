import { CultivarReviewType } from "@/app/reviews/page";
import Modal from "../modal";
import InputDefault from "../forms/inputDefault";

interface ModalProps {
  isModalOpen: boolean;
  handleModalOpen: (isOpen: boolean) => void;
  reviewSelected?: CultivarReviewType;
  handleApprove: (approve: boolean) => Promise<void>;
}

export default function ModalApproveCultivar({
  isModalOpen,
  handleModalOpen,
  reviewSelected,
  handleApprove,
}: ModalProps) {
  return (
    <Modal isOpen={isModalOpen} size="sm">
      <Modal.Header
        title={`Aprovar o cadastro da cultivar`}
        description=""
        onClose={() => handleModalOpen(false)}
      />
      <Modal.Main>
        <>
          {reviewSelected && (
            <InputDefault
              label={"Name"}
              value={reviewSelected.Cultivar.name}
              onChange={() => null}
              type="text"
              disabled
              classe={""}
              placeholder={""}
            />
          )}
        </>
      </Modal.Main>
      <Modal.Footer
        cancelText="Rejeitar"
        submitText="Aprovar"
        onCancel={() => handleApprove(false)}
        onSubmit={() => handleApprove(true)}
      />
    </Modal>
  );
}
