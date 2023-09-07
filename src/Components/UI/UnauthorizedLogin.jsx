import { Button } from "@mui/material"
import './UnauthorizedLogin.css'


export const UnauthorizedLogin = ({ action }) => {
    const handleAction = () => {
        action(false)
    }
    return (
        <div className="unauthorized__login">
            <h3>Algo Salio Mal</h3>
            <p>Las credenciales que ingreso no son validas, revise e intente nuevamente</p>
            <p className="small">Si el error persiste contacte al WebMaster</p>

            <Button className="btn-primary" variant="contained" onClick={handleAction}>
                REGRESAR
            </Button>
        </div>
    )
}
