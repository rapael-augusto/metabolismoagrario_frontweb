"use client";

import React, { useContext, useState } from "react";
import styles from "@/styles/calculator/index.module.css";
import { navigationsItems, slidesCalculatorEnum } from "./calculatorSlidesType";
import NavigationHeader from "./navigatorheader";
import InitialSlide from "./slides/initial";
import ConstantsSlide from "./slides/constants";
import ResultsSlide from "./slides/results";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CalculatorContext } from "@/contexts/calculatorContext";
import ListConstants from "./modal/listContants";
import ListConstantsHeader from "./modal/listConstantsHeader";
import Modal from "../modal";

const Calculator = () => {
  const router = useRouter();

  const {
    area,
    harvestedProduction,
    isModalOpen,
    cultivarId,
    calculations,
    handleCalculate,
    handleCloseModal,
    handleConfirmModal,
  } = useContext(CalculatorContext);

  const [activeSlide, setActiveSlide] = useState<slidesCalculatorEnum>(
    slidesCalculatorEnum.INITIAL
  );

  const handleActiveSlideChange = (slide: slidesCalculatorEnum) => {
    if (slide === slidesCalculatorEnum.RESULTS && !calculations) return;
    if (
      slide === slidesCalculatorEnum.CONSTANTS &&
      handleNavigateConstantErrors()
    )
      return;
    if (slide === slidesCalculatorEnum.RESULTS) handleCalculate();
    setActiveSlide(slide);
  };

  const slidesComponents = {
    [slidesCalculatorEnum.INITIAL]: <InitialSlide />,
    [slidesCalculatorEnum.CONSTANTS]: <ConstantsSlide />,
    [slidesCalculatorEnum.RESULTS]: <ResultsSlide />,
  };

  const handleSlideNavigateBack = () => {
    if (activeSlide === slidesCalculatorEnum.INITIAL)
      return router.push("home");
    setActiveSlide(activeSlide - 1);
  };

  const handleNavigateConstantErrors = () => {
    if (!cultivarId) {
      toast.warning("Você deve escolher uma cultivar!");
      return true;
    }
    if (area <= 0) {
      toast.warning("Forneça uma área válida!");
      return true;
    }
    if (harvestedProduction <= 0) {
      toast.warning("Forneça uma produção colhida válida!");
      return true;
    }
    return false;
  };

  const handleSlideNavigateTowards = () => {
    if (activeSlide === slidesCalculatorEnum.RESULTS) return;
    if (
      activeSlide + 1 === slidesCalculatorEnum.CONSTANTS &&
      handleNavigateConstantErrors()
    )
      return;
    if (activeSlide + 1 === slidesCalculatorEnum.RESULTS) handleCalculate();
    setActiveSlide(activeSlide + 1);
  };

  return (
    <div className={styles.page}>
      <NavigationHeader
        activeSlide={activeSlide}
        handleActiveSlideChange={handleActiveSlideChange}
        navigationsItems={navigationsItems}
      />
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <button
            onClick={handleSlideNavigateBack}
            className={styles.backButton}
          >
            <FaChevronLeft />
          </button>
          {activeSlide !== slidesCalculatorEnum.RESULTS && (
            <button
              onClick={handleSlideNavigateTowards}
              className={styles.towardsButton}
            >
              {activeSlide === slidesCalculatorEnum.RESULTS - 1 ? (
                "Calcular"
              ) : (
                <FaChevronRight />
              )}
            </button>
          )}
        </div>
        {slidesComponents[activeSlide]}
        <Modal size="md" isOpen={isModalOpen}>
          <Modal.Header
            title="Fatores de conversão"
            description="Escolha o fator de conversão que deseja utilizar nesse cálculo"
            onClose={handleCloseModal}
          >
            <ListConstantsHeader />
          </Modal.Header>
          <Modal.Main>
            <ListConstants />
          </Modal.Main>
          <Modal.Footer
            onCancel={handleCloseModal}
            onSubmit={handleConfirmModal}
            cancelText="Cancelar"
            submitText="Confirmar"
          />
        </Modal>
      </main>
    </div>
  );
};

export default Calculator;
