export interface Product {
    barcode: string;             // Código de barras (primary key)
    name: string;                // Nome (not null)
    brand?: string;              // Marca (optional)
    type: string;                // Tipo (not null)
    volumeUnit: string;          // Unidade de volume (not null)
}