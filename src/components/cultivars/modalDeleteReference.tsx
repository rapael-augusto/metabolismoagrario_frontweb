"use client";
import { ReferenceService } from "@/services/reference";
import Modal from "../modal";
import react from "react";

interface props {
    visible: boolean;
    handleVisible: (visible: boolean) => void;
    environmentId: string;
    referenceId: string;
}

export default function ModalDeleteReference({
    visible, 
    handleVisible,
    environmentId,
    referenceId,
} : props ){

    const referenceService = new ReferenceService();
    const toggleDelete = async () => {
        await referenceService.deleteEnvironment(referenceId, environmentId);
        window.location.reload();
    }

    return (
        <Modal isOpen={visible} size="sm">
            <Modal.Header 
                title="Deletar Referência"
                description="Tem certeza que deseja deletar esta referência?"
                onClose={() => handleVisible(false)}
            />
            <Modal.Main>
                {null}
            </Modal.Main>
            <Modal.Footer 
                cancelText="Voltar"
                submitText="Deletar"
                onCancel={() => handleVisible(false)}
                onSubmit={toggleDelete}
            />
    </Modal>
    );
}