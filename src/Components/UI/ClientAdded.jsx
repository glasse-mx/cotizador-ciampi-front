import { Button } from "@mui/material"
import { Link } from "react-router-dom"


export const ClientAdded = () => {
    return (
        <div>
            <h4>Cliente Agregado con Exito</h4>

            <Link to="/clientes">
                <Button className="btn-primary" variant="contained">
                    Volver
                </Button>
            </Link>
        </div>
    )
}
