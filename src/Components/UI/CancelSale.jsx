import { Box, Button, Modal } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/CredentialsContext";


export const CancelSale = ({ saleId }) => {

    const navigate = useNavigate();
    const [credentials] = useAppContext()

    // Modal
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const handleOpen = () => setOpenCancelModal(true);
    const handleClose = () => setOpenCancelModal(false);

    const cancelModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // gap: '.5rem',
        textAlign: 'center',
        p: 3,
    };

    const handleCancelSale = () => {

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/${saleId}/cancel`, //`http://
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
            }
        };

        axios.request(config)
            .then((response) => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <>
            <Button variant="contained" color="error" onClick={handleOpen}>
                Cancelar
                <span className="material-symbols-rounded text-gray-600">
                    cancel
                </span>
            </Button>

            <Modal
                open={openCancelModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={cancelModalStyle}>
                    <h3>ADVERTENCIA</h3>
                    <p>Usted está apunto de cancelar esta nota de venta, esta acción no se puede deshacer</p>
                    <p><b>¿Está seguro de cancelar esta nota de venta?</b></p>
                    <div className="flex row justify-between">
                        <Button variant="contained" color="error" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="success" onClick={handleCancelSale}>
                            Aceptar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
