import Modal from "../modal";
import { CultivarReviewType } from "@/app/reviews/page";
import { cultivarService } from "@/services/cultivar";

export default function ModalRemoveCultivarReview({
  visible,
  handleVisible,
  reviewSelected,
}: {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  reviewSelected: CultivarReviewType;
}) {
  const cultivarSer = new cultivarService(null);
  const handleCadastro = async () => {
    const { status } = await cultivarSer.deleteCultivarReview(
      reviewSelected.id
    );
    if (status === 1) {
      window.location.reload();
    }
  };
  return (
    <Modal isOpen={visible} size="sm">
      <Modal.Header
        title="Remover solicitação"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <p>
          Tem certeza que deseja remover a solicitação da cultivar:{" "}
          <b>{reviewSelected.Cultivar.name}</b>?
        </p>
      </Modal.Main>
      <Modal.Footer
        cancelText="Cancelar"
        submitText="Remover"
        onCancel={() => handleVisible(false)}
        onSubmit={handleCadastro}
      />
    </Modal>
  );
}
