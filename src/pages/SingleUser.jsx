import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../Context/CredentialsContext";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


export const SingleUser = () => {

    let { id } = useParams();

    const initialUserValue = {
        name: '',
        phone: '',
        email: '',
        password: '',
        user_type: '',
    }

    const [credentials, setCredentials] = useAppContext()
    const [userData, setUserData] = useState(initialUserValue)
    const [userError, setUserError] = useState(initialUserValue)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userTypes, setUserTypes] = useState()


    const getUserTypes = () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            // url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/usertypes`,
            url: 'http://127.0.0.1:8000/api/usertypes',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}

        }

        axios.request(config)
            .then((response) => {
                setUserTypes(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getUserData = () => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user/${id}`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${credentials.token}`
            }
        }

        axios.request(config)
            .then((response) => {
                setUserData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleEditing = () => {
        setIsEditing(true)
    }

    const handleEditingSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user/${id}}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.token}`
            },
            data: userData
        };

        axios.request(config)
            .then((response) => {
                setIsLoading(false)
                setIsEditing(false)
            })
            .catch((error) => {
                console.log(error);
            });


    }

    useEffect(() => {
        getUserData()
        getUserTypes()
    }, [])

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
                    <h4>Editar Usuario</h4>
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
                        <div className="p-4 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparen">
                            {
                                !isLoading
                                    ? (
                                        <form className="mt-6">
                                            <div className="grid grid-col-60-40">
                                                <TextField fullWidth
                                                    name="name"
                                                    label="Nombre Completo"
                                                    placeholder="Nombre Completo"
                                                    type="text"
                                                    value={userData.name}
                                                    onChange={handleInputChange}
                                                    error={userError.name ? true : false}
                                                    helperText={userError.name}
                                                    disabled={!isEditing}
                                                    required
                                                />

                                                <FormControl sx={{ minWidth: 180 }}>
                                                    <InputLabel id="user-type">Tipo de Usuario</InputLabel>
                                                    <Select
                                                        labelId="user-type"
                                                        id="user-type"
                                                        value={userData.user_type}
                                                        name='user_type'
                                                        onChange={handleInputChange}
                                                        disabled={!isEditing}
                                                        required
                                                    >
                                                        {
                                                            userTypes && userTypes.map((userType) => (
                                                                <MenuItem key={userType.id} value={userType.id}>{userType.type}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="grid my-4 grid-cols-2">
                                                <TextField
                                                    name="email"
                                                    label="Correo Electronico"
                                                    placeholder="correo@electronico.com"
                                                    value={userData.email}
                                                    type="email"
                                                    onChange={handleInputChange}
                                                    error={userError.email ? true : false}
                                                    helperText={userError.email}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                <TextField
                                                    name="phone"
                                                    label="Telefono"
                                                    placeholder="Telefono"
                                                    type="text"
                                                    value={userData.phone}
                                                    onChange={handleInputChange}
                                                    error={userError.phone ? true : false}
                                                    helperText={userError.phone}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                <TextField
                                                    name="password"
                                                    label="Contraseña"
                                                    placeholder="Nombre Completo"
                                                    type="password"
                                                    value={userData.password}
                                                    onChange={handleInputChange}
                                                    error={userError.password ? true : false}
                                                    helperText={userError.password}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                                <TextField
                                                    name="password_confirmation"
                                                    label="Confirmacion de Contraseña"
                                                    placeholder="Nombre Completo"
                                                    type="password"
                                                    value={userData.password_confirmation}
                                                    onChange={handleInputChange}
                                                    error={userError.password_confirmation ? true : false}
                                                    helperText={userError.password_confirmation}
                                                    disabled={!isEditing}
                                                    required
                                                />
                                            </div>
                                            {
                                                isEditing && (
                                                    <div className="flex my-6 flex justify-center">
                                                        <Button onClick={handleEditingSubmit} className="btn-primary" variant="contained">
                                                            Guardar Cambios
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    ) : (
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
