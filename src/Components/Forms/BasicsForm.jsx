import { TextField } from '@mui/material'

export const BasicsForm = ({ credentials }) => {

    function getFormattedDate() {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses comienzan desde 0
        const year = String(now.getFullYear()).slice(2);

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    return (
        <>
            <div className="grid grid-cols-3">
                <TextField
                    variant='outlined'
                    label='Punto de Venta'
                    name='pdv'
                    value={import.meta.env.VITE_COMPANY_NAME}
                    disabled
                />
                <TextField
                    variant='outlined'
                    label='Vendedor'
                    value={credentials.user.name}
                    disabled
                />
                <TextField
                    variant='outlined'
                    label='Fecha'
                    name='fecha'
                    value={getFormattedDate()}
                    disabled
                />
            </div>
        </>
    )
}
