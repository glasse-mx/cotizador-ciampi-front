export const getActualDate = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses comienzan en 0
    const anio = fecha.getFullYear();

    // Formatea la fecha en el formato dd/mm/aaaa
    const actualDate = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    return actualDate;
};

export const coinFormat = (cantidad) => {
    
  // Opciones de formato de moneda
  const opcionesMoneda = {
    style: 'currency',
    currency: 'MXN', // Código de moneda para pesos mexicanos
    minimumFractionDigits: 2, // Mínimo de 2 decimales
    maximumFractionDigits: 2, // Máximo de 2 decimales
  };

  return cantidad.toLocaleString('es-MX', opcionesMoneda);
}