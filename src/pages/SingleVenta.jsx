import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../Context/CredentialsContext";
import { useEffect, useState } from "react";
import axios from "axios";
import iconImage from '../assets/img/cotizacion-icon.png'
import { coinFormat, formatFolio, formatPhoneNumber } from '../Hooks/useTools'
import generatePDF from "react-to-pdf";
import { Box, Button, Modal, Typography } from "@mui/material";
import { PaymentForm } from "../Components/Forms/PaymentForm";
import { CancelSale } from '../Components/UI/CancelSale';


export const SingleVenta = ({ isEditing = false }) => {

    const { id } = useParams()
    const [isNotaLoading, setIsNotaLoading] = useState(true)
    const [isEditingNota, setIsEditingNota] = useState(isEditing)
    const [credentials, setCredentials] = useAppContext()
    const [folio, setFolio] = useState({})
    const [orderError, setOrderError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/quotes/${id}`,
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
            }
        };

        axios.request(config)
            .then((response) => {
                setFolio(response.data);
                setIsNotaLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [])

    // Calculo del total de pagos del cliente para la nota de venta
    const [totalPagosCliente, setTotalPagosCliente] = useState(0)
    useEffect(() => {
        let total = 0;
        if (folio.detalles_pago) {
            folio.detalles_pago.forEach(pago => {
                total += parseFloat(pago.amount)
            });
        }
        if (folio.detalle_anticipo) {
            folio.detalle_anticipo.forEach(pago => {
                total += parseFloat(pago.amount)
            });
        }
        setTotalPagosCliente(total)
    }, [folio])

    // Opciones para la impresion en PDF
    const options = {
        filename: `Nota-Venta-#${folio.folio_nota_venta_id}.pdf`,
        page: {
            margin: 2
        }
    };

    const getTargetElement = () => document.getElementById("cotizacionContainer");
    const downloadPdf = () => generatePDF(getTargetElement, options);

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
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
        gap: '.5rem',
        textAlign: 'center',
        p: 3,
    };

    // Enviar Peticion PUT al servidor para actualizar la nota de venta
    const handleUpdateNotaVenta = () => {

        if (totalPagosCliente < folio.total) {
            setOrderError(true)
            setOpen(false)
            return
        }

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.token}`,
            },
            data: {
                edited_by: credentials.user.id,
                detalles_pago: folio.detalles_pago,
                observaciones: folio.observaciones
            }
        };

        axios.request(config)
            .then(() => {
                navigate('/notas-venta')
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(config)
    }


    return (
        <div className='w-full px-6 py-6 mx-auto cotizacionPage '>

            <div className='flex mb-4'>
                <Button variant='contained' onClick={() => navigate('/notas-canceladas')}>
                    {`< Volver`}
                </Button>
            </div>

            <div className="flex justify-between items-center max-w-full px-3 my-4">
                <Button variant="contained" color="success" onClick={() => setIsEditingNota(!isEditingNota)}>
                    {isEditingNota ? 'Aceptar' : 'Editar'}
                </Button>

                {
                    !isEditingNota && (
                        <Button onClick={handleOpen}>Guardar</Button>
                    )
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Advertencia
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Usted va a crear una nota de venta, esta accion no se puede deshacer.
                        </Typography>
                        <Button variant="contained" onClick={handleUpdateNotaVenta}>
                            Crear Nota de Venta
                        </Button>
                    </Box>
                </Modal>
            </div>

            <div className='flex-none w-full max-w-full px-3'>

                <div id='cotizacionContainer' className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border'>
                    <div className='p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparent '>
                        {
                            !isNotaLoading ? (
                                <>
                                    <div className="row-2x box1">
                                        <div className="col">
                                            <div className="table__content">
                                                <h3>NOTA DE VENTA</h3>
                                                <p>Folio Cotizacion: <b>{formatFolio(folio.folio_cotizacion_id)}</b></p>
                                                {
                                                    folio.folio_nota_venta_id && <p>Folio Venta: <b>{formatFolio(folio.folio_nota_venta_id)}</b></p>
                                                }

                                                <p>Fecha de Emision:    <b>{folio.fecha && folio.fecha}</b></p>
                                                <p>Vendedor: <b>{folio.created_by.name}</b></p>

                                            </div>

                                        </div>
                                        <div className="col">
                                            <img src={iconImage} alt={`Logo ${import.meta.env.VITE_COMPANY_NAME}`} />
                                            <p>Boulevard Adolfo López Mateos 1817 <br /> Ciudad de Mexico - Mexico</p>
                                            <p>{folio.created_by.email}</p>
                                            <p className='flex'>
                                                <span className="material-symbols-rounded">
                                                    call
                                                </span>
                                                {formatPhoneNumber(folio.created_by.phone)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="box2">
                                        <div className="client-form__container">
                                            <div className="row-2x">
                                                <div className="col">
                                                    <h6>Detalles de Cliente</h6>
                                                    <p>{`${folio.id_cliente.first_name} ${folio.id_cliente.last_name}`}</p>
                                                    <p>{folio.id_cliente.email}</p>
                                                    <p>{folio.id_cliente.phone}</p>
                                                </div>
                                                <div className="col">
                                                    {
                                                        folio.id_cliente.address_street != null && (
                                                            <>
                                                                <h6>Direccion de Entrega</h6>
                                                                <p>{`${folio.id_cliente.address_street} ${folio.id_cliente.address_ext}, ${folio.id_cliente.address_int != null ? `interior ${folio.id_cliente.address_int}` : ''}`}</p>
                                                                <p>{`${folio.id_cliente.address_col && `${folio.id_cliente.address_col}, `}${folio.id_cliente.address_town} ${folio.id_cliente.address_state}`}</p>
                                                                <p>{folio.id_cliente.address_zip && folio.id_cliente.address_zip}</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box3">
                                        <div className="row">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Articulo</th>
                                                        <th>Cant</th>
                                                        <th>Precio Unit.</th>
                                                        <th>Desc.</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        folio.productos && folio.productos.map((producto, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{producto.name}</td>
                                                                <td>{producto.cant}</td>
                                                                <td>{coinFormat(parseInt(producto.price))}</td>
                                                                <td> - </td>
                                                                <td>{coinFormat(parseInt(producto.price) * producto.cant)}</td>
                                                            </tr>
                                                        ))
                                                    }

                                                    {
                                                        folio.descuentos && folio.descuentos.map((descuento, index) => (
                                                            <tr key={index}>
                                                                <td> - </td>
                                                                <td>{descuento.descripcion}</td>
                                                                <td>{descuento.cant}</td>
                                                                <td> - </td>
                                                                <td>{coinFormat(descuento.valor)}</td>
                                                                <td>{coinFormat(descuento.cant * descuento.valor)}</td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                    <div className="row-60-40 box4">
                                        <div className="col">
                                            <h6>Detalles de Pago</h6>
                                            {
                                                (folio.detalle_anticipo && folio.detalle_anticipo.length > 0)
                                                && (
                                                    <>
                                                        <h6>Anticipo</h6>
                                                        <ul>
                                                            {
                                                                folio.detalle_anticipo.map((anticipo, index) => (
                                                                    <li className="payment__container" key={index}>
                                                                        <p>{anticipo.paymentType} {anticipo.bank && `- ${anticipo.bank}`}</p>
                                                                        <p>{coinFormat(parseFloat(anticipo.amount))} <span className='font-semibold gray-100'> - {anticipo.reference}</span></p>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>

                                                    </>

                                                )
                                            }
                                            {
                                                isEditingNota ? (
                                                    <PaymentForm
                                                        order={folio}
                                                        setOrder={setFolio}
                                                    />
                                                )
                                                    : (
                                                        (folio.detalles_pago && folio.detalles_pago.length > 0)
                                                        && (
                                                            <>
                                                                <h6>Formas de Pago</h6>
                                                                <ul>
                                                                    {
                                                                        folio.detalles_pago.map((pago, index) => (
                                                                            <li className="payment__container" key={index}>
                                                                                <p>{pago.paymentType} {pago.bank && `- ${pago.bank}`}</p>
                                                                                <p>{coinFormat(parseFloat(pago.amount))} <span className='font-semibold gray-100'> - {pago.reference}</span></p>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>

                                                            </>

                                                        )
                                                    )
                                            }
                                            <p><b>Total Pagado: {coinFormat(totalPagosCliente)}</b></p>
                                        </div>
                                        <div className="col">
                                            <div className="total__container">
                                                <p>Subtotal</p> <p><b>{folio.subtotal_productos && coinFormat(folio.subtotal_productos)}</b></p>
                                                <p>Descuento</p> <p><b>{folio.subtotal_promos > 0 ? `- ${coinFormat(folio.subtotal_promos)}` : '-'}</b></p>
                                                <h4>TOTAL</h4> <h4>{folio.total && coinFormat(folio.total)}</h4>
                                            </div>

                                        </div>
                                        {
                                            orderError && (
                                                <div className="error__container">
                                                    <h6 className="text-danger">El total de pagos no puede ser menor al total de la nota de venta</h6>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="box3">
                                        <div className="row mb-4">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Gerencia PDV</th>
                                                        <th>Asistente de Direccion</th>
                                                        <th>Tesoreria</th>
                                                        <th>Direccion General</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='h-16'>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>

                                    <div className="box5 flex-none w-full max-w-full px-4">
                                        <div className="col">
                                            <h6>Obervaciones</h6>
                                            {
                                                isEditingNota ? (
                                                    <textarea
                                                        className="form-control w-full max-w-full"
                                                        rows="3"
                                                        placeholder="Observaciones"
                                                        value={folio.observaciones}
                                                        onChange={(e) => setFolio({ ...folio, observaciones: e.target.value })}
                                                    ></textarea>
                                                ) : (
                                                    <div className="observaciones__container flex-none w-full max-w-full">
                                                        {folio.observaciones && folio.observaciones}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                </>
                            ) : "Cargando..."
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap -mx-3 justify-between px-6'>

                <Button onClick={downloadPdf} variant="contained">
                    Descargar
                    <span className="material-symbols-rounded text-gray-600">
                        picture_as_pdf
                    </span>
                </Button>

                {
                    credentials.user.user_type != 1 && (
                        <Button variant="contained" color="success">
                            Aprobar Venta
                            <span className="material-symbols-rounded text-gray-600">
                                check_circle
                            </span>
                        </Button>
                    )
                }

                <CancelSale saleId={id} />
            </div>

        </div>
    )
}
