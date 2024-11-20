export function parseDateString(dateString: string): Date | undefined {
    if (!dateString)
        return undefined; // Retorna undefined se o valor for vazio ou nulo
    
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month-1, day); // Cria um objeto Date
}

export function formatDateToString(date: Date | null): string | null {
    if (!date)
        return null;

    const day = String(date.getDate() + 1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}  
  