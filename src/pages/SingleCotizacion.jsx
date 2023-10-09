import iconImage from '../assets/img/cotizacion-icon.png'
import { useEffect, useState } from "react"
import { json, useParams } from "react-router-dom"
import { useAppContext } from "../Context/CredentialsContext"
import axios from "axios"
import { ProductsTable } from '../Components/Layout/ProductsTable'
import { coinFormat } from '../Hooks/useTools'
import { useGetClient } from '../Hooks'


export const SingleCotizacion = () => {

    const { id } = useParams()
    const [credentials, setCredentials] = useAppContext()
    const [client, setClient] = useState({})
    const [folio, setFolio] = useState({})
    const [productos, setProductos] = useState([])
    const [descuentos, setDescuentos] = useState([])
    const [total, setTotal] = useState(0)
    const [subtotal_productos, setSubtotal_productos] = useState(0)
    const [subtotal_promos, setSubtotal_promos] = useState(0)


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
                console.log(response.data)
                setFolio(response.data)
                setProductos(JSON.parse(folio.productos))
                setDescuentos(JSON.parse(folio.descuentos))
                setSubtotal_productos(folio.subtotal_productos)
                setSubtotal_promos(folio.subtotal_promos)
                setTotal(folio.total)
            })
            .catch((error) => {
                console.log(error);
            });


    }, [])


    return (
        <div className='w-full px-6 py-6 mx-auto'>
            <div className='flex flex-wrap -mx-3'>
            </div>
            <div className='flex-none w-full max-w-full px-3'>
                <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border'>
                    <div className='p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparen'>

                        <div className="row-2x box1">
                            <div className="col">
                                <div className="table__content">
                                    <h3>Cotizacion C000{folio.id}</h3>
                                    <p>Fecha de Emision:    <b>{folio.created_at}</b></p>
                                    <p>Vendedor:    <b>{folio.created_by}</b></p>
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
                                {/* Datos del Cliente */}
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
                                            productos.map((producto, index) => (
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
                                            descuentos.map((descuento, index) => (
                                                <tr key={index}>
                                                    <td>1</td>
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
                                {/* <div className="payment__container">
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
                                </div> */}
                            </div>
                            <div className="col">
                                <div className="total__container">
                                    <p>Subtotal</p> <p><b>{coinFormat(subtotal_productos)}</b></p>
                                    <p>Descuento</p> <p><b>{`-${coinFormat(subtotal_promos)}`}</b></p>
                                    <h4>TOTAL</h4> <h4>{coinFormat(total)}</h4>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
