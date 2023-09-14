import iconImage from '../assets/img/cotizacion-icon.png'
import { getActualDate } from '../Hooks/useTools'
import { useAppContext } from '../Context/CredentialsContext'
import './cotizacionForm.css'
import { ClientForm } from '../Components/Forms/ClientForm'
import { SetleForm } from '../Components/Forms/SetleForm'
import { useState } from 'react'
import { PaymentForm } from '../Components/Forms/PaymentForm'

export const NewCotizacion = () => {

    const [credentials, setCredentials] = useAppContext()

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

    return (
        <div className='w-full px-6 py-6 mx-auto'>
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
                                    />
                                </div>
                            </div>

                            <div className="box3">
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
                                        <tr>
                                            <td>1</td>
                                            <td>Maquina de Helado Suave D520S</td>
                                            <td>1</td>
                                            <td>$ 50,500.00</td>
                                            <td>-</td>
                                            <td>$ 50,500.00</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Base de Helado Suave de Leche - Chocolate</td>
                                            <td>2</td>
                                            <td>$ 1,000.00</td>
                                            <td>-</td>
                                            <td>$ 2,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Regulador Ciampi</td>
                                            <td>1</td>
                                            <td>$ 5,000.00</td>
                                            <td>-</td>
                                            <td>$ 5,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Promocion Regulador Gratis</td>
                                            <td>1</td>
                                            <td> - </td>
                                            <td> -$ 5,000.00</td>
                                            <td>- $5,000.00</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                        {/* <p>Transferencia Bancaria - BBVA - NUMREF</p>
                                        <p><b>$25,000.00</b></p>
                                        <p>Stripe MSI - NUMREF</p>
                                        <p><b>$31,700.00</b></p> */}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="total__container">
                                        <p>Subtotal</p> <p><b>$57,700.00</b></p>
                                        <p>Descuento</p> <p><b>-$5,000.00</b></p>
                                        <h4>TOTAL</h4> <h4>$52,700.00</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
