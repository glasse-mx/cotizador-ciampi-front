import { TextField } from "@mui/material"
import './form-helper.css'
import { useState } from "react"


export const ClientForm = ({ action }) => {

    const initialClientValue = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address_street: '',
        address_int: '',
        address_ext: '',
        address_col: '',
        address_town: '',
        address_state: '',
        address_zip: '',
    }

    const [clientData, setClientData] = useState(initialClientValue)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setClientData({ ...clientData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        action(clientData)
        setClientData(initialClientValue)
    }

    return (
        <>
            <div className="grid my-4 grid-cols-2 ">
                <TextField
                    variant='outlined'
                    label='Nombre'
                    name='first_name'
                    value={clientData.first_name}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='Apellido'
                    name='last_name'
                    value={clientData.last_name}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="grid my-4 grid-cols-2">
                <TextField
                    variant='outlined'
                    label='Telefono'
                    name='phone'
                    value={clientData.phone}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    type='email'
                    label='Correo Electronico'
                    name='email'
                    value={clientData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="grid my-4 grid-cols-3-211">
                <TextField
                    variant='outlined'
                    label='Calle'
                    name='address_street'
                    value={clientData.address_street}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='N. Exterior'
                    name='address_ext'
                    value={clientData.address_ext}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='N. Interior'
                    name='address_int'
                    value={clientData.address_int}
                    onChange={handleInputChange}
                />
            </div>

            <div className="grid my-4 grid-cols-2">
                <TextField
                    variant='outlined'
                    label='Colonia'
                    name='address_col'
                    value={clientData.address_col}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='Municipio'
                    name='address_town'
                    value={clientData.address_town}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="grid my-4 grid-cols-2">
                <TextField
                    variant='outlined'
                    label='Estado'
                    name='address_state'
                    value={clientData.address_state}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant='outlined'
                    label='Codigo Postal'
                    name='address_zip'
                    value={clientData.address_zip}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </>
    )
}
