const irrigationFilterOptions = [
  { value: "all", label: "Todos" },
  { value: "Irrigation", label: "Irrigado" },
  { value: "Dry", label: "Sequeiro" },
]

const climateFilterOptions = [
  { value: "all", label: "Todos" },
  { value: "Seco", label: "Seco" },
  { value: "Semiárido", label: "Semiárido" },
  { value: "Temperado", label: "Temperado" },
  { value: "Frio", label: "Frio" },
  { value: "Mediterrâneo", label: "Mediterrâneo" },
  { value: "Montanha", label: "Montanha" },
]

const typeFilterOptions = [
  { value: "all", label: "Todos" },
  { value: "HARVEST_INDEX", label: "ÍNDICE DE COLHEITA" },
  { value: "AERIAL_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DA PARTE AÉREA"},
  { value: "PRODUCT_RESIDUE_INDEX", label: "ÍNDICE DE RESÍDUO DO PRODUTO" },
  { value: "PRODUCT_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA COLHIDA"},
  { value: "RESIDUE_DRY_MATTER_FACTOR", label: "TEOR DA MATÉRIA SECA RESÍDUO" },
  { value: "BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ" },
  { value: "WEED_AERIAL_FACTOR", label: "FATOR DE CONVERSÃO PARA ESTIMAR A BIOMASSA AÉREA DAS ADVENTÍCIAS" },
  { value: "WEED_BELOWGROUND_INDEX", label: "ÍNDICE DE RAIZ ADVENTÍCIAS" },
]

const cultivationSystemFilterOptions = [
  { value: "all", label: "Todos" },
  { value: "Agroecological", label: "Agroecológico" },
  { value: "Conventional", label: "Convencional" },
  { value: "Organic", label: "Orgânico" },
]

const soilFilterOptions = [
  { value: "all", label: "Todos" },
  { value: "Clayey", label: "Argiloso" },
  { value: "Sandy", label: "Arenoso" },
  { value: "SandyClay", label: "Arenoargiloso" },
]

export {
  irrigationFilterOptions,
  climateFilterOptions,
  typeFilterOptions,
  soilFilterOptions,
  cultivationSystemFilterOptions 
}