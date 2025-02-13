const typeTranslation: any = {
  HARVEST_INDEX: "Índice de colheita",
  AERIAL_RESIDUE_INDEX: "Índice de resíduo da parte aérea",
  PRODUCT_RESIDUE_INDEX: "Índice de resíduo de produto",
  PRODUCT_DRY_MATTER_FACTOR: "Teor da matéria seca colhida",
  RESIDUE_DRY_MATTER_FACTOR: "Teor da matéria seca resíduo",
  BELOWGROUND_INDEX: "Índice de raiz",
  WEED_AERIAL_FACTOR:
    "Fator de conversão para estimar a biomassa aérea das adventícias",
  WEED_BELOWGROUND_INDEX: "Índice de raiz adventícias",
};

const irrigationTranslation: any = {
  Irrigation: "Irrigado",
  Dry: "Sequeiro",
};

const cultivationSystemTranslation: any = {
  Organic: "Orgânico",
  Conventional: "Convencional",
  Agroecological: "Agroecológico",
};

const soilTranslation: any = {
  Clayey: "Argiloso",
  Sandy: "Arenoso",
  SandyClay: "Arenoargiloso",
  Other: "Outro",
};

const filterOptionsTranlation: any = {
  type: "Tipo",
  climate: "Clima",
  biome: "Bioma",
  soil: "Solo",
  irrigation: "Irrigação",
  cultivationSystem: "Sistema de Cultivo",
};

const translationsMap: any = {
  type: typeTranslation,
  biome: {},
  climate: {},
  soil: soilTranslation,
  irrigation: irrigationTranslation,
  cultivationSystem: cultivationSystemTranslation,
};

export {
  typeTranslation,
  irrigationTranslation,
  cultivationSystemTranslation,
  soilTranslation,
  translationsMap,
  filterOptionsTranlation,
};
