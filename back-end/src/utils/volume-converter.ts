export function extractVolumeNumberFromString(volumeUnit: string): number | null {
    const numericValue = volumeUnit.match(/[\d.,]+/); // Captura o valor numérico no volume_unit
    if(numericValue) {
      return parseFloat(numericValue[0].replace(',', '.')); // Converte o valor capturado para número
    }
    return null;
}

export function extractVolumeUnitFromString(volumeUnit: string): string | null {
    const unitMatch = volumeUnit.match(/[a-zA-Z]+/); // Captura a sequência de letras que representa a unidade
    if(unitMatch) {
        return unitMatch[0]; // Retorna a unidade encontrada da forma em que foi escrita
    }
    return null;
}

export function volumeToString(volume: number, unit: string): string {
    if(unit === "g" && volume >= 1000)
        return `${(volume / 1000).toFixed(1)} Kg`;  // Converte gramas para quilos
    
    if(unit === "ml" && volume >= 1000)
        return `${(volume / 1000).toFixed(1)} L`;  // Converte mililitros para litros
     
    return `${volume} ${unit}`; // Retorna normalmente para unidades menores que 1000 ou para outras unidades
}
