import { useAppContext } from "../Context/CredentialsContext"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingComponent, UnauthorizedLogin } from "../Components/UI"
import './LoginPage.css'


export const LoginPage = () => {

    const navigate = useNavigate()
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: null,
        password: null
    })
    const [islogginIn, setIslogginIn] = useState(false)
    const [isUnAuthorized, setIsUnAuthorized] = useState(false)

    const [credentials, setCredentials] = useAppContext()

    const handleLoginInput = (event) => {
        setAuthData({
            ...authData,
            [event.target.name]: event.target.value
        })
    }

    const handleLogin = async (e) => {

        e.preventDefault()
        setIslogginIn(true)
        let data = JSON.stringify(authData);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((resp) => {
                /**
                * Verifica que los campos esten llenos
                */
                if (resp.data.errors) {
                    setError({
                        email: resp.data.errors.email,
                        password: resp.data.errors.password
                    })
                    setIslogginIn(false)

                    return
                }

                const newToken = resp.data.access_token
                setCredentials({
                    token: newToken.token,
                    user: newToken.user,
                    isLogged: true
                })

                navigate('/')
            })
            .catch((error) => {
                // console.log(error);
                setIsUnAuthorized(true)
                setIslogginIn(false)
            });

    }



    return (
        <div className="authLayout">
            <img src="./img/app-login-logo.png" alt={`${import.meta.env.VITE_COMPANY_NAME} Logo`} />
            <div className="login__container">
                <h1>Bienvenid@</h1>
                <div className="form__container">
                    {
                        !islogginIn ? (
                            isUnAuthorized ? <UnauthorizedLogin action={setIsUnAuthorized} /> : (
                                <form>
                                    <TextField
                                        label="Correo Electrónico"
                                        value={authData.email}
                                        type="email"
                                        name="email"
                                        onChange={handleLoginInput}
                                        error={error.email ? true : false}
                                        helperText={error.email}
                                    />

                                    <TextField
                                        label='Contraseña'
                                        value={authData.password}
                                        name="password"
                                        type="password"
                                        onChange={handleLoginInput}
                                        error={error.password ? true : false}
                                        helperText={error.password}
                                    />

                                    <Button type="submit" onClick={handleLogin} className="btn-primary" variant="contained">
                                        INICIAR SESIÓN
                                    </Button>
                                </form>
                            )
                        ) : <LoadingComponent />
                    }
                </div>
            </div>
            <div className="footer__container">
                <span>©Ciampi 2023 - Desarrollado por <a href="https://gabecode.com">GabeCode</a></span>
            </div>
        </div>
    )
}
