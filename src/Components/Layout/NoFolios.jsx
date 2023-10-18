import { Button } from '@mui/material'
import '../../assets/css/NoFolios.css'
import { Link } from 'react-router-dom'

export const NoFolios = ({ folio = "folios" }) => {
    return (
        <div className="nofolios__container">
            <h3>No se encontraron {folio} </h3>
            <Link to="/">
                <Button variant="contained">
                    Volver
                    <span class="material-symbols-rounded text-gray-600">
                        redo
                    </span>
                </Button>
            </Link>
        </div>
    )
}
