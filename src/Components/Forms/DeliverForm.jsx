import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"


export const DeliverForm = () => {
    return (
        <>
            <div className="grid grid-cols-2 my-4">
                <FormControl variant='standard' sx={{ minWidth: 120 }}>
                    <InputLabel id='route_from'>Salida desde</InputLabel>
                    <Select
                        variant='outlined'
                        label='Salida desde'
                        labelId='route_from'
                        name='route_from'
                        required
                    >
                        <MenuItem value=''>Selecciona una opcion</MenuItem>
                        <MenuItem value=''>Sucursal</MenuItem>
                        <MenuItem value=''>Domicilio</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant='standard' sx={{ minWidth: 120 }}>
                    <InputLabel id='route_to'>Entrega en</InputLabel>
                    <Select
                        variant='outlined'
                        label='Entrega en'
                        labelId='route_to'
                        name='route_to'
                        required
                    >
                        <MenuItem value=''>Selecciona una opcion</MenuItem>
                        <MenuItem value=''>Sucursal</MenuItem>
                        <MenuItem value=''>Domicilio</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="grid my-4">
                <TextField
                    variant='outlined'
                    label="Instrucciones de Entrega"
                    name='route_instructions'
                    multiline
                    rows={4}
                />
            </div>
        </>
    )
}
