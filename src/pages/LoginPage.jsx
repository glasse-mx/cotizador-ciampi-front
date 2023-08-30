import { Button, TextField } from "@mui/material"
import { useState } from "react"
import './LoginPage.css'

export const LoginPage = () => {

    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    })

    const handleSetEmail = (event) => {
        setAuthData({
            ...authData,
            email: event.target.value
        })
    }

    const handleSetPassword = (event) => {
        setAuthData({
            ...authData,
            password: event.target.value
        })
    }


    return (
        <div className="authLayout">
            <img src="./img/app-login-logo.png" alt={`${import.meta.env.VITE_COMPANY_NAME} Logo`} />
            <div className="login__container">
                <h1>Bienvenid@</h1>
                <div className="form__container">
                    <form>
                        <TextField
                            label="Correo Electrónico"
                            value={authData.email}
                            type="email"
                            onChange={handleSetEmail}
                        />
                        <TextField
                            label='Contraseña'
                            value={authData.password}
                            type="password"
                            onChange={handleSetPassword}
                        />

                        <Button className="btn-primary" variant="contained">
                            INICIAR SESIÓN
                        </Button>
                    </form>
                </div>
            </div>
            <div className="footer__container">
                <span>©Ciampi 2023 - Desarrollado por <a href="https://gabecode.com">GabeCode</a></span>
            </div>
        </div>
    )
}
