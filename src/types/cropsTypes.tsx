export type CropsParams = {
    name: string
    scientificName: string
}

export type paramsEntradaConstant = {
    type: string
    reference: string
    value: number 
    comment: string
    climate: string
    biome: string
    irrigation: string
    country: string 
    cultivationSystem: string
}

export type responseCropsCreate = {
    status: number
    mensagem: string
}

export type dataCropsType = {
    createdAt: string,
    id: string,
    name: string,
    scientificName: string,
    updatedAt: string
}