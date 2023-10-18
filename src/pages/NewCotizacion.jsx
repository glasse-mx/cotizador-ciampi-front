import iconImage from '../assets/img/cotizacion-icon.png'
import { getActualDate } from '../Hooks/useTools'
import { useAppContext } from '../Context/CredentialsContext'
import './cotizacionForm.css'
import { ClientForm } from '../Components/Forms/ClientForm'
import { SetleForm } from '../Components/Forms/SetleForm'
import { useEffect, useState } from 'react'
import { PaymentForm } from '../Components/Forms/PaymentForm'
import { ItemsForm } from '../Components/Forms/ItemsForm'
import { ProductsTable } from '../Components/Layout/ProductsTable'
import { TotalFolio } from '../Components/Layout/TotalFolio'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const NewCotizacion = () => {

    const [credentials, setCredentials] = useAppContext()
    const navigate = useNavigate()
    const [error, setError] = useState({
        clientError: false,
        productError: false,
    })


    const initialOrderValue = {
        created_by: credentials.user.id,
        id_cliente: 0,
        pdv: import.meta.env.VITE_COMPANY_NAME,
        productos: [],
        descuentos: [],
        folio_status_id: 1,
        subtotal_productos: 0,
        subtotal_promos: 0,
        detalles_anticipo: [],
        detalles_pago: [],
        observaciones: '',
        salida: '',
        llegada: '',
        total: 0,
    }

    const [order, setOrder] = useState(initialOrderValue)
    const date = getActualDate()

    const handleCreateCotizacion = (e) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${credentials.token}`,
            },
            data: order
        };

        axios.request(config)
            .then((response) => {
                navigate('/cotizaciones')
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(order)

    }

    return (
        <div className='w-full px-6 py-6 mx-auto cotizacionPage'>
            <div className='flex flex-wrap -mx-3'>

                <div className='flex-none w-full max-w-full px-3'>
                    <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border'>
                        <div className='p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparen'>

                            <div className="row-2x box1">
                                <div className="col">
                                    <div className="table__content">
                                        <h3>Cotizacion</h3>
                                        <p>Fecha de Emision:    <b>{date}</b></p>
                                        <p>Vendedor:    <b>{credentials.user.name}</b></p>
                                    </div>

                                </div>
                                <div className="col">
                                    <img src={iconImage} alt={`Logo ${import.meta.env.VITE_COMPANY_NAME}`} />
                                    <p>Boulevard Adolfo López Mateos 1817 <br /> Ciudad de Mexico - Mexico</p>
                                    <p>ventas@ciampi.com.mx</p>
                                    <p>+52 55 1234 5678</p>
                                </div>
                            </div>

                            <div className="box2">
                                <div className="client-form__container">
                                    <ClientForm
                                        orderData={order}
                                        setOrderData={setOrder}
                                        error={error}
                                        setError={setError}
                                    />
                                </div>
                                {
                                    error.clientError &&
                                    <div className="error__container">
                                        <h6 className="text-danger">Debe Incluir un cliente</h6>
                                    </div>
                                }
                            </div>

                            <div className="box3">
                                <div className="row">
                                    <ItemsForm
                                        order={order}
                                        setOrder={setOrder}
                                    />
                                    <ProductsTable
                                        order={order}
                                        setOrder={setOrder}
                                    />

                                </div>
                                <div className="row">
                                    {
                                        error.productError &&
                                        <div className="col">
                                            <div className="error__container">
                                                <h6 className="text-danger">Debe agregar al menos un producto</h6>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="row-60-40 box4">
                                <div className="col">
                                    <div className="payment__container">
                                        <h6>Anticipo</h6>
                                        {
                                            <SetleForm
                                                order={order}
                                                setOrder={setOrder}
                                            />
                                        }
                                    </div>
                                    <div className="payment__container">
                                        <h6>Pago</h6>
                                        {
                                            <PaymentForm
                                                order={order}
                                                setOrder={setOrder}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="total__container">
                                        <TotalFolio
                                            order={order}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="box5 flex-none w-full max-w-full px-4">
                                <div className="col">
                                    <div className="observaciones__container flex-none w-full max-w-full">
                                        <h6>Observaciones</h6>
                                        <textarea
                                            className="form-control w-full max-w-full"
                                            rows="3"
                                            placeholder="Observaciones"
                                            value={order.observaciones}
                                            onChange={(e) => setOrder({ ...order, observaciones: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="row box5 flex justify-center">
                                <Button variant="contained"
                                    onClick={handleCreateCotizacion}
                                >
                                    Crear Cotizacion
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
