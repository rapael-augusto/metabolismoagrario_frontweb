import {
  biomeFilterOptions,
  climateFilterOptions,
  cultivationSystemFilterOptions,
  irrigationFilterOptions,
  soilFilterOptions,
} from "@/utils/constantFilterOptions";
import styles from "@/styles/calculator/listFilters/index.module.css";

export default function ListFilters({
  handleReset,
  filters,
  handleFilterChange,
}: any) {
  return (
    <div>
      <div className={styles.listFiltersSelectContainer}>
        <div>
          <label>Clima</label>
          <span onClick={() => handleReset("climate")}>Resetar</span>
        </div>
        <select
          name="climate"
          value={filters.climate}
          onChange={handleFilterChange}
        >
          {climateFilterOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.listFiltersSelectContainer}>
        <div>
          <label>Bioma</label>
          <span onClick={() => handleReset("biome")}>Resetar</span>
        </div>
        <select
          name="biome"
          value={filters.biome}
          onChange={handleFilterChange}
        >
          {biomeFilterOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.listFiltersSelectContainer}>
        <div>
          <label>Irrigação</label>
          <span onClick={() => handleReset("irrigation")}>Resetar</span>
        </div>
        <select
          name="irrigation"
          value={filters.irrigation}
          onChange={handleFilterChange}
        >
          {irrigationFilterOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.listFiltersSelectContainer}>
        <div>
          <label>Sistema de Cultivo</label>
          <span onClick={() => handleReset("cultivationSystem")}>Resetar</span>
        </div>
        <select
          name="cultivationSystem"
          value={filters.cultivationSystem}
          onChange={handleFilterChange}
        >
          {cultivationSystemFilterOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.listFiltersSelectContainer}>
        <div>
          <label>Solo</label>
          <span onClick={() => handleReset("soil")}>Resetar</span>
        </div>
        <select name="soil" value={filters.soil} onChange={handleFilterChange}>
          {soilFilterOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
