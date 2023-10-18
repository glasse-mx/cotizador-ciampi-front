import { useEffect, useState } from "react"
import axios from "axios";
import { useAppContext } from "../Context/CredentialsContext";
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField } from "@mui/material";


export const ClientDetail = () => {

    let { id } = useParams();

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

    const [credentials, setCredentials] = useAppContext()
    const [clientData, setClientData] = useState(initialClientValue)
    const [clientError, setClientError] = useState(initialClientValue)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setClientData({ ...clientData, [name]: value })
    }


    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
            headers: {
                'Authorization': `Bearer ${credentials.token}}`
            }
        };

        axios.request(config)
            .then((response) => {
                setClientData(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const handleEditing = () => {
        setIsEditing(true)
    }

    const handleEditingSubmit = (e) => {

        e.preventDefault()
        setIsLoading(true)

        let configEdit = {
            method: 'put',
            // maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.token}`
            },
            data: clientData
        };

        axios.request(configEdit)
            .then((response) => {
                setIsLoading(false)
                setIsEditing(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="w-full h-full px-6 pr-10 py-6 mx-auto">

            <div className="flex flex-wrap -mx-3">
                <div className="my-4 px-4 w-full flex justify-between">
                    {
                        isEditing && (
                            <Button onClick={() => setIsEditing(false)} className="btn-primary" variant="contained">
                                Cancelar
                            </Button>
                        )
                    }
                    <h4>Editar Cliente</h4>
                    {
                        !isEditing && (
                            <Button onClick={handleEditing} className="btn-primary" variant="contained">
                                Editar
                            </Button>
                        )
                    }
                </div>

                <div className="flex-none w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparen">
                            {
                                !isLoading
                                    ? (
                                        <form>
                                            <div className="grid my-4 grid-cols-2 ">
                                                <TextField
                                                    variant='outlined'
                                                    label='Nombre'
                                                    name='first_name'
                                                    value={clientData.first_name}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    label='Apellido'
                                                    name='last_name'
                                                    value={clientData.last_name}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div className="grid my-4 grid-cols-2">
                                                <TextField
                                                    variant='outlined'
                                                    label='Telefono'
                                                    name='phone'
                                                    value={clientData.phone}
                                                    onChange={handleInputChange}
                                                    error={clientError.phone != '' ? true : false}
                                                    helperText={clientError.phone}
                                                    required
                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    type='email'
                                                    label='Correo Electronico'
                                                    name='email'
                                                    value={clientData.email}
                                                    onChange={handleInputChange}
                                                    error={clientError.email != '' ? true : false}
                                                    helperText={clientError.email}
                                                    required
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div className="grid my-4 grid-cols-3-211">
                                                <TextField
                                                    variant='outlined'
                                                    label='Calle'
                                                    name='address_street'
                                                    value={clientData.address_street}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    label='N. Exterior'
                                                    name='address_ext'
                                                    value={clientData.address_ext}
                                                    onChange={handleInputChange}

                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    label='N. Interior'
                                                    name='address_int'
                                                    value={clientData.address_int}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div className="grid my-4 grid-cols-2">
                                                <TextField
                                                    variant='outlined'
                                                    label='Colonia'
                                                    name='address_col'
                                                    value={clientData.address_col}
                                                    onChange={handleInputChange}

                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    label='Municipio'
                                                    name='address_town'
                                                    value={clientData.address_town}
                                                    onChange={handleInputChange}

                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div className="grid my-4 grid-cols-2">
                                                <TextField
                                                    variant='outlined'
                                                    label='Estado'
                                                    name='address_state'
                                                    value={clientData.address_state}
                                                    onChange={handleInputChange}

                                                    disabled={!isEditing}
                                                />
                                                <TextField
                                                    variant='outlined'
                                                    label='Codigo Postal'
                                                    name='address_zip'
                                                    value={clientData.address_zip}
                                                    onChange={handleInputChange}

                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            {
                                                isEditing && (
                                                    <div className="flex justify-center ">
                                                        <Button type="submit" onClick={handleEditingSubmit} className="btn-primary" variant="contained">
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    )
                                    : (
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
