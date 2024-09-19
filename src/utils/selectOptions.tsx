// src/utils/selectOptions.ts

const typeSelectOptions = [
  { value: "HARVEST_INDEX", label: "Índice de colheita" },
  { value: "BELOWGROUND_INDEX", label: "Índice de raiz" },
  { value: "WEED_BELOWGROUND_INDEX", label: "Índice de raiz adventícias" },
  { value: "AERIAL_RESIDUE_INDEX", label: "Índice de resíduo da parte aérea" },
  { value: "PRODUCT_RESIDUE_INDEX", label: "Índice de resíduo de produto" },
  { value: "PRODUCT_DRY_MATTER_FACTOR", label: "Teor da matéria seca colhida" },
  { value: "RESIDUE_DRY_MATTER_FACTOR", label: "Teor da matéria seca resíduo" },
  { value: "WEED_AERIAL_FACTOR", label: "Fator de conversão para estimar a biomassa aérea das adventícias" },
]

const climateSelectOptions = [
  { value: "NaoInformado", label: "Não informado" },
  { value: "Seco", label: "Seco" },
  { value: "Semiárido", label: "Semiárido" },
  { value: "Temperado", label: "Temperado" },
  { value: "Frio", label: "Frio" },
  { value: "Mediterrâneo", label: "Mediterrâneo" },
  { value: "Montanha", label: "Montanha" },
]

const irrigationSelectOptions = [
  { value: "Irrigation", label: "Irrigado" },
  { value: "Dry", label: "Sequeiro" },
  { value: "NaoInformado", label: "Não informado" },
]

const cultivationSystemSelectOptions = [
  { value: "Conventional", label: "Convencional" },
  { value: "Organic", label: "Orgânico" },
  { value: "NaoInformado", label: "Não informado" },
]

const biomeSelectOptions = [
  { value: "Amazônia", label: "Amazônia" },
  { value: "Biomas de Montanha", label: "Biomas de Montanha" },
  { value: "Cerrado", label: "Cerrado" },
  { value: "Caatinga", label: "Caatinga" },
  { value: "Desertos", label: "Desertos" },
  { value: "Floresta Temperada", label: "Floresta Temperada" },
  { value: "Floresta Tropical", label: "Floresta Tropical" },
  { value: "Floresta Mediterrânea", label: "Floresta Mediterrânea" },
  { value: "Mata Atlântica", label: "Mata Atlântica" },
  { value: "Pampa", label: "Pampa" },
  { value: "Pradarias", label: "Pradarias" },
  { value: "Savanas", label: "Savanas" },
  { value: "Taiga", label: "Taiga" },
  { value: "Tundra", label: "Tundra" },
  { value: "NaoInformado", label: "Não informado" },
  { value: "Outro", label: "Outro" },
]

const soilSelectOptions = [
  { value: "Clayey", label: "Argiloso" },
  { value: "Sandy", label: "Arenoso" },
  { value: "SandyClay", label: "Arenoargiloso" },
  { value: "NaoInformado", label: "Não informado" },
  { value: "Other", label: "Outro" },
]

export {
  typeSelectOptions,
  climateSelectOptions,
  irrigationSelectOptions,
  cultivationSystemSelectOptions,
  biomeSelectOptions,
  soilSelectOptions
}
