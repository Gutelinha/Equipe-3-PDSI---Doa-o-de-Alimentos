export function parseDateString(dateString: string): Date | undefined {
    if (!dateString)
        return undefined; // Retorna undefined se o valor for vazio ou nulo
    
    const [day, month, year] = dateString.split('/').map(Number); // Obtém o dia, mês e ano
    return new Date(Date.UTC(year, month-1, day)); // Cria um objeto Date em UTC (sem fuso-horário)
}

export function formatDateToString(date: Date | null): string | null {
    if (!date)
        return null;

    date.setUTCHours(3);
    return date.toLocaleDateString();
}  
  