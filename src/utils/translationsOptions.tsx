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
  country: "País",
};

const filterReferenceTranslation: any = {
  title: "Título",
  comment: "Observações"
}

const translationsMap: any = {
  type: typeTranslation,
  biome: {},
  climate: {},
  soil: soilTranslation,
  irrigation: irrigationTranslation,
  cultivationSystem: cultivationSystemTranslation,
};

const userErrorTranslation: any = {
  "name must be longer than or equal to 4 characters": "O nome deve conter pelo menos 4 caracteres!",
  "password is not strong enough" : "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números!",
}

export {
  typeTranslation,
  irrigationTranslation,
  cultivationSystemTranslation,
  soilTranslation,
  translationsMap,
  filterOptionsTranlation,
  filterReferenceTranslation,
  userErrorTranslation,
};
