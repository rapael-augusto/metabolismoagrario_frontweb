'use client';

import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/layout/customSelect";
import { dataCropsType } from "@/types/cropsTypes";
import { cropsService } from "@/services/crops";
import { cultivarsData } from "@/types/cultivarTypes";
import { usePPLCalculator } from "@/app/hooks/usePPLCalculator";

const Calculator = () => {
  const [crops, setCrops] = useState<dataCropsType[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [cultivars, setCultivars] = useState<cultivarsData[]>([]);
  const [cultivarId, setCultivarId] = useState<string>('');
  const [constants, setConstants] = useState<any[]>([]);
  const [area, setArea] = useState<number>(0);
  const [harvestedProduction, setHarvestedProduction] = useState<number>(0);
  const [cultivarScientificName, setCultivarScientificName] = useState<string | any>('');
  const [calculations, setCalculations] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('@token');
    if (token) {
      const cropsAPI = new cropsService(token);
      cropsAPI.list().then((response) => setCrops(response));
    }
  }, []);

  const handleCropChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cropId = event.target.value;
    setSelectedCrop(cropId);
    
    if (cropId) {
      const token = sessionStorage.getItem('@token');
      if (token) {
        const cropsAPI = new cropsService(token);
        cropsAPI.findOne(cropId).then((response) => {
          if (response && response.cultivars) {
            setCultivars(response.cultivars); 
            setCultivarId(''); 
            setCultivarScientificName(response.type);
            setConstants([]);
            setArea(0);
            setHarvestedProduction(0);
            setCalculations(null);
          } else {
            console.error("Cultivares não encontradas");
          }
        });
      } else {
        console.error("Token não encontrado");
      }
    } else {
      setCultivars([]); 
      setCultivarId('');
      setConstants([]);
      setArea(0);
      setHarvestedProduction(0);
      setCalculations(null);
    }
  };

  const handleCultivarChange = async (selectedCultivarId: string) => {
    setCultivarId(selectedCultivarId); 
    const session = sessionStorage.getItem("@token");

    if (session) {
      const service = new cropsService(session);
      const response = await service.findOneCultivar(selectedCultivarId); 
      if (response) {
        const convertedConstants = response.constants.map((constant: any) => ({
          type: constant.type,
          value: Number(constant.value), 
        }));
        setConstants(convertedConstants);
      }
    }
  };

  const handleCalculate = () => {
    if (area > 0 && harvestedProduction > 0 && constants.length > 0 && cultivarId) {
      const calculator = usePPLCalculator({
        cultivar: { name: cultivarScientificName },
        constants: {
          HARVEST_INDEX: constants.find(constant => constant.type === 'HARVEST_INDEX')?.value || 0, 
          AERIAL_RESIDUE_INDEX: constants.find(constant => constant.type === 'AERIAL_RESIDUE_INDEX')?.value || 0, 
          PRODUCT_RESIDUE_INDEX: constants.find(constant => constant.type === 'PRODUCT_RESIDUE_INDEX')?.value || 0,
          PRODUCT_DRY_MATTER_FACTOR: constants.find(constant => constant.type === 'PRODUCT_DRY_MATTER_FACTOR')?.value || 0,
          RESIDUE_DRY_MATTER_FACTOR: constants.find(constant => constant.type === 'RESIDUE_DRY_MATTER_FACTOR')?.value || 0,
          BELOWGROUND_INDEX: constants.find(constant => constant.type === 'BELOWGROUND_INDEX')?.value || 0,
          WEED_AERIAL_FACTOR: constants.find(constant => constant.type === 'WEED_AERIAL_FACTOR')?.value || 0,
          WEED_BELOWGROUND_INDEX: constants.find(constant => constant.type === 'WEED_BELOWGROUND_INDEX')?.value || 0,
        },     
        area,
        harvestedProduction,
      });
      
      console.log('Constants:', constants);
      const productivity = calculator.getProductivity();
      const totalAerialBiomass = calculator.getTotalAerialBiomass();
      const residueBiomass = calculator.getResidueBiomass();
      const dryMatterBiomass = calculator.getDryMatterBiomass();
      const residueDryMatterBiomass = calculator.getResidueDryMatterBiomass();
      const dryMatterBiomassTotal = calculator.getDryMatterBiomassTotal();
  
      setCalculations({ 
        productivity, 
        totalAerialBiomass, 
        residueBiomass,
        residueDryMatterBiomass,
        dryMatterBiomass,
        dryMatterBiomassTotal
      });
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  const cropsOptions = crops.map((crop) => ({
    label: crop.name,
    value: crop.id,
  }));

  const cultivarsOptions = cultivars.map((cultivar) => ({
    label: cultivar.name,
    value: cultivar.id,
  }));

  return (
    <div>
      <h1>Calculadora</h1>
      
      <label htmlFor="cropSelect">Selecione uma Cultura:</label>
      <select id="cropSelect" value={selectedCrop} onChange={handleCropChange}>
        <option value="">Escolha uma cultura</option>
        {cropsOptions.map((crop) => (
          <option key={crop.value} value={crop.value}>
            {crop.label}
          </option>
        ))}
      </select>
      
      {cultivars.length > 0 ? (
        <CustomSelect 
          type="form" 
          label="Cultivar" 
          options={cultivarsOptions} 
          onChange={handleCultivarChange} 
        />
      ) : (  
        <p>Nenhuma cultivar disponível</p>
      )}

      {cultivarId && constants.length > 0 && (
        <>
          <h2>Constantes de {cultivarScientificName}</h2>
          <ul>
            {constants.map((constant, index) => (
              <li key={index}>
                {constant.type} - {constant.value}: {typeof(constant.value)}
              </li>
            ))}
          </ul>
          <input
            type="number"
            placeholder="Produção colhida"
            value={harvestedProduction}
            onChange={(e) => setHarvestedProduction(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Área"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
        </>
      )}

      <button onClick={handleCalculate}>Calcular</button>

      {calculations && (
        <div>
          <h2>Resultados</h2>
          <p>{calculations.productivity.name}: {calculations.productivity.result.toFixed(2)} {calculations.productivity.unity}</p>
          <p>{calculations.totalAerialBiomass.name}: {calculations.totalAerialBiomass.result.toFixed(2)} {calculations.totalAerialBiomass.unity}</p>
          <p>{calculations.residueBiomass.name}: {calculations.residueBiomass.result.toFixed(2)} {calculations.residueBiomass.unity}</p>
          <p>{calculations.dryMatterBiomass.name}: {calculations.dryMatterBiomass.result.toFixed(2)} {calculations.dryMatterBiomass.unity}</p>
          <p>{calculations.residueDryMatterBiomass.name}: {calculations.residueDryMatterBiomass.result.toFixed(2)} {calculations.residueDryMatterBiomass.unity}</p>
          <p>{calculations.dryMatterBiomassTotal.name}: {calculations.dryMatterBiomassTotal.result.toFixed(2)} {calculations.dryMatterBiomassTotal.unity}</p>
        </div>
      )}
    </div>
  );
}

export default Calculator;
