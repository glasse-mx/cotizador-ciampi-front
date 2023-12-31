import { Button, TextField } from "@mui/material"
import './form-helper.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from "../../Context/CredentialsContext"
import { formatPhoneNumber } from "../../Hooks/useTools"



export const ClientForm = ({ order, setOrder, error, setError }) => {

    const [credentials] = useAppContext()

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
    const [isEditing, setIsEditing] = useState(false)
    const [clientId, setClientID] = useState(0)
    const [clientError, setClientError] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setClientData({ ...clientData, [name]: value })
    }

    const handleDisabled = () => {
        setIsEditing(!isEditing)
    }

    const handleSearchClient = async (e) => {
        e.preventDefault();

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${clientId}`,
                headers: {
                    'Authorization': `Bearer ${credentials.token}`
                }
            };

            const response = await axios(config);
            if (response.data.Message) {
                setClientError(true);
                setErrorMessage(response.data.Message);
            } else {
                setClientData(response.data);
                setClientID(response.data.id);
                console.log(clientId)
                setError({ ...error, clientError: false });
                setClientError(false);
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            // Maneja el error de la solicitud aquí si es necesario
        }
    };

    const handleCliendID = (e) => {
        setClientID(e.target.value)
    }

    const useRegisterClient = (e) => {
        e.preventDefault()

        const method = clientData.id ? 'put' : 'post'
        const url = clientData.id
            ? `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/client/${clientData.id}`
            : `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`

        let config = {
            method: method,
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.token}`
            },
            data: clientData
        };

        axios.request(config)
            .then((response) => {
                setIsEditing(false)
                setClientID(response.data.id)
                setClientData({ ...clientData, id: response.data.id })
                setOrder({ ...order, id_cliente: parseInt(response.data.id) })
                // setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setOrder({ ...order, id_cliente: parseInt(clientId) })
    }, [clientId])

    return (
        <>
            <div className="flex my-4">
                <TextField
                    variant='outlined'
                    label='Buscar Cliente'
                    name='searchClient'
                    value={clientId === 0 ? '' : clientId}
                    onChange={handleCliendID}
                    placeholder="Telefono"
                    error={clientError}
                    helperText={ErrorMessage}

                />

                <Button variant="contained" onClick={handleSearchClient}>
                    Buscar Cliente
                </Button>
                <Button variant="contained" onClick={handleDisabled}>
                    {clientId === 0 ? 'Agregar Cliente' : 'Editar Cliente'}
                </Button>
            </div>



            {
                isEditing
                    ? (
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

                            <div className="flex justify-center my-6">
                                <Button onClick={useRegisterClient}>
                                    Guardar
                                </Button>
                            </div>
                        </>
                    ) :
                    (
                        (clientData.id && clientData.id != '') && (
                            <div className="row-2x">
                                <div className="col">
                                    <h6>Detalles de Cliente</h6>
                                    <p>{`${clientData.first_name} ${clientData.last_name}`}</p>
                                    <p>{clientData.email}</p>
                                    <p>{formatPhoneNumber(clientData.phone)}</p>
                                </div>
                                <div className="col">
                                    {
                                        clientData.address_street != null && (
                                            <>
                                                <h6>Direccion de Entrega</h6>
                                                <p>{`${clientData.address_street} ${clientData.address_ext}, ${clientData.address_int != null ? `interior ${clientData.address_int}` : ''}`}</p>
                                                <p>{`${clientData.address_col && `${clientData.address_col}, `}${clientData.address_town} ${clientData.address_state}`}</p>
                                                <p>{clientData.address_zip && clientData.address_zip}</p>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    )
            }



        </>
    )
}
