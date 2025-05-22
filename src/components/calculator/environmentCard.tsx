import { EnvironmentData, Reference } from "@/types/cultivarTypes";
import styles from "@/styles/calculator/index.module.css";
import { typeTranslation } from "@/utils/translationsOptions";

interface IEnvironmentCard {
  envData: EnvironmentData;
  selected: boolean;
  handleSelectConstants?: () => void;
}

export default function EnvironmentCard({
  envData,
  selected,
  handleSelectConstants,
}: IEnvironmentCard) {
  return (
    <div
      key={envData.environment.id}
      className={`${styles.environmentCard} ${selected ? styles.selected : ""}`}
    >
      <div className={styles.environmentDetails}>
        <p>País: {envData.environment.countryName}</p>
        <p>Clima: {envData.environment.climate || "Não especificado"}</p>
        <p>
          Solo:{" "}
          {envData.environment.customSoil ||
            envData.environment.soil ||
            "Não especificado"}
        </p>
        <p>Irrigação: {envData.environment.irrigation || "Não especificado"}</p>
      </div>

      <div className={styles.constantsSection}>
        <h5>Constantes:</h5>
        <ul>
          {envData.constants.map((constant) => (
            <li key={`${envData.environment.id}-${constant.type}`}>
              {typeTranslation[constant.type]}: {constant.value}
            </li>
          ))}
        </ul>
      </div>
      {handleSelectConstants && (
        <button className={styles.selectButton} onClick={handleSelectConstants}>
          Usar estas constantes
        </button>
      )}
    </div>
  );
}
