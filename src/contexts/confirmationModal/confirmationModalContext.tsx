"use client"
import { createContext, useContext, useState } from "react";
import ConfirmationModal from "@/components/layout/confirmationModal";

type ConfirmationOptions = {
  title: string;
  message: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning";
};

type ConfirmationContextType = (options: ConfirmationOptions) => Promise<boolean>;

const ConfirmationContext = createContext<ConfirmationContextType>(() => {
  throw new Error("É necessário envolver com ConfirmationProvider");
});

export function ConfirmationProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState({
    isOpen: false,
    options: {} as ConfirmationOptions,
    resolve: (() => {}) as (value: boolean) => void,
  });

  const confirm = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setModal({
        isOpen: true,
        options,
        resolve,
      });
    });
  };

  const handleClose = (result: boolean) => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    modal.resolve(result);
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      <ConfirmationModal
        isOpen={modal.isOpen}
        title={modal.options.title}
        message={modal.options.message}
        details={modal.options.details}
        confirmText={modal.options.confirmText}
        cancelText={modal.options.cancelText}
        variant={modal.options.variant}
        onConfirm={() => handleClose(true)}
        onCancel={() => handleClose(false)}
      />
    </ConfirmationContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmationContext);
}