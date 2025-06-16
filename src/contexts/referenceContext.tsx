import { createContext, useState, ReactNode } from "react";

export const SelectionContext = createContext({
  referenceSelected: null as {
    id: string;
    title: string | null;
    comment: string | null | undefined;
  } | null,
  setReferenceSelected: (() => {}) as (
    value: {
      id: string;
      title: string | null;
      comment: string | null | undefined;
    } | null
  ) => void,
  environmentSelected: null as string | null,
  setEnvironmentSelected: (() => {}) as (value: string | null) => void,
  constantSelected: null as string | null,
  setConstantSelected: (() => {}) as (value: string | null) => void,
  isReferenceModalOpen: false,
  isEnvironmentModalOpen: false,
  isConstantModalOpen: false,
  handleReferenceModal: (() => {}) as (isOpen: boolean) => void,
  handleEnvironmentModal: (() => {}) as (isOpen: boolean) => void,
  handleConstantModal: (() => {}) as (isOpen: boolean) => void,
  openReferenceModal: (() => {}) as () => void,
});

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [referenceSelected, setReferenceSelected] = useState<{
    id: string;
    title: string | null;
    comment: string | null | undefined;
  } | null>(null);
  const [environmentSelected, setEnvironmentSelected] = useState<string | null>(
    null
  );
  const [constantSelected, setConstantSelected] = useState<string | null>(null);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);
  const [isEnvironmentModalOpen, setIsEnvironmentModalOpen] = useState(false);
  const [isConstantModalOpen, setIsConstantModalOpen] = useState(false);
  const handleReferenceModal = (isOpen: boolean) =>
    setIsReferenceModalOpen(isOpen);
  const handleEnvironmentModal = (isOpen: boolean) =>
    setIsEnvironmentModalOpen(isOpen);
  const handleConstantModal = (isOpen: boolean) =>
    setIsConstantModalOpen(isOpen);
  const openReferenceModal = () => setIsReferenceModalOpen(true);

  return (
    <SelectionContext.Provider
      value={{
        referenceSelected,
        setReferenceSelected,
        environmentSelected,
        setEnvironmentSelected,
        constantSelected,
        setConstantSelected,
        isReferenceModalOpen,
        isEnvironmentModalOpen,
        isConstantModalOpen,
        handleReferenceModal,
        handleEnvironmentModal,
        handleConstantModal,
        openReferenceModal,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
