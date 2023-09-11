import { useEffect, useState } from "react"
import axios from "axios";
import { useAppContext } from "../Context/CredentialsContext";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { UserAdded } from "../Components/UI/UserAdded";


export const NewUser = () => {

    const userId = useParams() || null

    const initialUser = {
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        user_type: "",
    }

    const [credentials, setCredentials] = useAppContext()
    const [userTypes, setUserTypes] = useState()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialUser)
    const [userError, setUserError] = useState(initialUser)
    const [isEditing, setIsEditing] = useState(false)
    const [userAdded, setUserAdded] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    /**
     * Get user types
     * 
     * @returns
     */

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/usertypes`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${credentials.token}`
            }
        }

        axios.request(config)
            .then((response) => {
                setUserTypes(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault()
        setLoading(true)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios.request(config)
            .then((response) => {
                setLoading(false)
                setUserAdded(true)
            })
            .catch((error) => {
                console.log(error.response.data.errors)
                setUserError(error.response.data.errors)
            });
    }


    return (
        <div className="w-full h-full px-6 pr-10 py-6 mx-auto">

            <div className="flex flex-wrap -mx-3">
                <h4>Nuevo Usuario</h4>
                <div className="flex-none w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparen">
                            {
                                !loading
                                    ? (userAdded
                                        ? <UserAdded />
                                        : (
                                            <form className="mt-6">
                                                <div className="grid grid-col-60-40">
                                                    <TextField fullWidth
                                                        name="name"
                                                        label="Nombre Completo"
                                                        placeholder="Nombre Completo"
                                                        type="text"
                                                        value={user.name}
                                                        onChange={handleInputChange}
                                                        error={userError.name ? true : false}
                                                        helperText={userError.name}
                                                        required
                                                    />

                                                    <FormControl sx={{ minWidth: 180 }}>
                                                        <InputLabel id="user-type">Tipo de Usuario</InputLabel>
                                                        <Select
                                                            labelId="user-type"
                                                            id="user-type"
                                                            value={user.user_type}
                                                            name='user_type'
                                                            onChange={handleInputChange}
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
                                                        value={user.email}
                                                        type="email"
                                                        onChange={handleInputChange}
                                                        error={userError.email ? true : false}
                                                        helperText={userError.email}
                                                        required
                                                    />
                                                    <TextField
                                                        name="phone"
                                                        label="Telefono"
                                                        placeholder="Telefono"
                                                        type="text"
                                                        value={user.phone}
                                                        onChange={handleInputChange}
                                                        error={userError.phone ? true : false}
                                                        helperText={userError.phone}
                                                        required
                                                    />
                                                    <TextField
                                                        name="password"
                                                        label="Contraseña"
                                                        placeholder="Nombre Completo"
                                                        type="password"
                                                        value={user.password}
                                                        onChange={handleInputChange}
                                                        error={userError.password ? true : false}
                                                        helperText={userError.password}
                                                        required
                                                    />
                                                    <TextField
                                                        name="password_confirmation"
                                                        label="Confirmacion de Contraseña"
                                                        placeholder="Nombre Completo"
                                                        type="password"
                                                        value={user.password_confirmation}
                                                        onChange={handleInputChange}
                                                        error={userError.password_confirmation ? true : false}
                                                        helperText={userError.password_confirmation}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex my-6 flex justify-center">
                                                    <Button onClick={handleSubmit} className="btn-primary" variant="contained">
                                                        Crear Usuario
                                                    </Button>
                                                </div>
                                            </form>
                                        )
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
