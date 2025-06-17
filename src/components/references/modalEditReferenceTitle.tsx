"use client";
import { useState } from "react";
import Modal from "../modal";
import "@/styles/form/form.css";
import "@/styles/home/login.css";
import { useParams } from "next/navigation";
import useConstantForm from "@/hooks/useConstantForm";
import { IReferenceFormData } from "@/types/cultivarTypes";
import InputDefault from "../forms/inputDefault";

interface props {
  visible: boolean;
  handleVisible: (isVisible: boolean) => void;
  data: IReferenceFormData & { id: string };
}

export default function modalEditReferenceTitle({
  visible,
  handleVisible,
  data,
}: props) {

  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { handleReferenceChange, handleUpdateReference } = useConstantForm({
    id,
  });
  const [referenceSelected, setReferenceSelected] = useState<{
    id: string;
    title: string;
    comment: string | null | undefined;
  }>({
	id: data.id,
	title: data.title,
	comment: data.comment,
  });

  // const camposEnvironment: (keyof IEnvironmentData)[] = [
  // 	"climate",
  // 	"biome",
  // 	"country",
  // 	"cultivationSystem",
  // 	"soil",
  // 	"irrigation",
  // ];
  // const camposReference: (keyof IReferenceFormData)[] = ["title", "comment"];

  const handleSubmit = async () => {
    await handleUpdateReference(data.id, {
      title: referenceSelected.title,
      comment: referenceSelected.comment,
    });
	handleVisible(false);
  };

  return (
    <Modal isOpen={visible} size="lg">
      <Modal.Header
        title="Editar Referência"
        description=""
        onClose={() => handleVisible(false)}
      />
      <Modal.Main>
        <>
          <InputDefault
            classe="form-input-boxConst"
            label="Título"
            placeholder="Título da referência, EX: Livro X, Autor (2000)"
            onChange={(e) =>
              setReferenceSelected({
                id: referenceSelected?.id || "",
                title: e.target.value,
                comment: referenceSelected?.comment ?? null,
              })
            }
            type="text"
            value={referenceSelected?.title ?? ""}
          />
          <InputDefault
            classe="form-input-boxConst"
            label="Observações"
            placeholder="Observações sobre a referência, EX: Retirado da página Y"
            onChange={(e) => setReferenceSelected({
				id: referenceSelected?.id || "",
                title: referenceSelected?.title ?? null,
                comment: e.target.value,
			})}
            type="text"
            value={referenceSelected?.comment ?? ""}
          />
        </>
      </Modal.Main>
      <Modal.Footer
        cancelText="Voltar"
        submitText="Atualizar"
        onCancel={() => handleVisible(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

{
  /* <Modal isOpen={visible} size="lg">
			<Modal.Header
				title={
					parteAtual === 1
						? "Editar Referência - Informações Básicas"
						: "Editar Referência - Constantes"
				}
				description={
					parteAtual === 1
						? "Altere as informações da referência."
						: "Altere as constantes da referência."
				}
				onClose={() => handleVisible(false)}
			/>
			<Modal.Main>
				{parteAtual === 1 && (
					<>
						<AutoCompleteTextInput
							label="Título"
							placeholder="Título da referência, EX: Livro X, Autor (2000)"
							handleOnChange={(e: string) => handleReferenceChange("title", e)}
							type="text"
							value={title ?? ""}
							suggestions={references}
							disclaimer="Referências já cadastradas no banco"
						/>

						<InputDefault
							classe="form-input-boxConst"
							label="Observações"
							placeholder="Observações sobre a referência, EX: Retirado da página Y"
							onChange={(e) => handleReferenceChange("comment", e.target.value)}
							type="text"
							value={comment ?? ""}
						/>

						<div className="container-2-column">
							<CustomSelect
								type="form"
								label="Clima"
								options={climateSelectOptions}
								placeholder="Selecione o clima"
								onChange={(value) => handleEnvironmentChange("climate", value)}
								value={environmentData.environment.climate || ""}
								required
							/>
							<CustomSelect
								type="form"
								label="Bioma"
								placeholder="Selecione o Bioma"
								options={biomeSelectOptions}
								onChange={(value) => handleEnvironmentChange("biome", value)}
								value={environmentData.environment.biome || ""}
								required
							/>
						</div>

						<div className="container-2-column">
							<CustomSelect
								type="form"
								label="País"
								placeholder="Selecione o País"
								options={countries.map((country) => ({
									value: country.nome_pais,
									label: country.nome_pais,
								}))}
								onChange={(value) => handleEnvironmentChange("country", value)}
								value={environmentData.environment.countryName || ""}
								required
							/>
							<CustomSelect
								type="form"
								label="Sistema de cultivo"
								placeholder="Selecione o sistema de cultivo"
								options={cultivationSystemSelectOptions}
								onChange={(value) =>
									handleEnvironmentChange("cultivationSystem", value)
								}
								value={environmentData.environment.cultivationSystem || ""}
								required
							/>
						</div>

						<div className="container-2-column">
							<CustomSelect
								type="form"
								label="Solo"
								placeholder="Selecione o Solo"
								options={soilSelectOptions}
								onChange={(value) => handleEnvironmentChange("soil", value)}
								value={environmentData.environment.soil || ""}
								required
							/>
							<CustomSelect
								type="form"
								label="Irrigação"
								placeholder="Selecione a irrigação"
								options={irrigationSelectOptions}
								onChange={(value) =>
									handleEnvironmentChange("irrigation", value)
								}
								value={environmentData.environment.irrigation || ""}
								required
							/>
						</div>
					</>
				)}
				{parteAtual === 2 && (
					<>
						<div className={styles.constantsWrapper}>
							{environmentData.constants?.map((constant) => (
								<div key={constant.type}>
									<InputDefault
										classe="form-input-boxConst"
										label={typeTranslation[constant.type]}
										placeholder="Digite o valor da referência"
										onChange={(e) =>
											handleConstantChange(
												constant.type as keyof PPL_Constants,
												Number(e.target.value)
											)
										}
										type="number"
										required
										value={constant.value?.toString() ?? ""}
										min={0}
										step="0.1"
									/>
								</div>
							))}
						</div>
					</>
				)}
			</Modal.Main>
			<Modal.Footer
				cancelText="Voltar"
				submitText={parteAtual === 1 ? "Próximo" : "Atualizar"}
				onCancel={handleBack}
				onSubmit={handleSubmit}
			/>
		</Modal> */
}
