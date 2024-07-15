// src/utils/selectOptions.ts

const typeSelectOptions = [
  { value: "HARVEST_INDEX", label: "ÍNDICE DE COLHEITA" },
  { value: "AERIAL_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DA PARTE AÉREA" },
  { value: "PRODUCT_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DO PRODUTO" },
  { value: "PRODUCT_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA COLHIDA" },
  { value: "RESIDUE_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA RESÍDUO" },
  { value: "BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ" },
  { value: "WEED_AERIAL_FACTOR", label: "FATOR DE CONVERSÃO PARA ESTIMAR A BIOMASSA AÉREA DAS ADVENTÍCIAS" },
  { value: "WEED_BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ ADVENTÍCIAS" },
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
  { value: "NaoInformado", label: "Não informado" },
  { value: "Irrigation", label: "Irrigado" },
  { value: "Dry", label: "Sequeiro" },
]

const cultivationSystemSelectOptions = [
  { value: "NaoInformado", label: "Não informado" },
  { value: "Conventional", label: "Convencional" },
  { value: "Organic", label: "Orgânico" },
]

const biomeSelectOptions = [
  { value: "NaoInformado", label: "Não informado" },
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
]

const soilSelectOptions = [
  { value: "NaoInformado", label: "Não informado" },
  { value: "Clayey", label: "Argiloso" },
  { value: "Sandy", label: "Arenoso" },
  { value: "SandyClay", label: "Arenoargiloso" },
]

export {
  typeSelectOptions,
  climateSelectOptions,
  irrigationSelectOptions,
  cultivationSystemSelectOptions,
  biomeSelectOptions,
  soilSelectOptions
}
