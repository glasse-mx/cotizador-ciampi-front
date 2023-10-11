import iconImage from '../assets/img/cotizacion-icon.png'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppContext } from "../Context/CredentialsContext"
import axios from "axios"
import { coinFormat } from '../Hooks/useTools'


export const SingleCotizacion = () => {

    const { id } = useParams()
    const [isCotizacionLoading, setIsCotizacionLoading] = useState(true)
    const [credentials, setCredentials] = useAppContext()
    const [folio, setFolio] = useState({})

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
                setIsCotizacionLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [])

    return (
        <div className='w-full px-6 py-6 mx-auto cotizacionPage '>
            <div className='flex flex-wrap -mx-3'>
            </div>
            <div className='flex-none w-full max-w-full px-3'>
                <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border'>
                    <div className='p-6 bg-white mb-6 border-b-0 border-b-solid rounded-t-2xl border-b-transparent '>

                        {
                            !isCotizacionLoading ?
                                (
                                    <>
                                        <div className="row-2x box1">
                                            <div className="col">
                                                <div className="table__content">
                                                    <h3>COTIZACION</h3>
                                                    <p>Fecha de Emision:    <b>{folio.fecha && folio.fecha}</b></p>
                                                    <p>Vendedor: <b>{folio.created_by.name}</b></p>

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
                                                <div className="row-2x">
                                                    <div className="col">
                                                        <h6>Detalles de Cliente</h6>
                                                        <p>{`${folio.id_cliente.first_name} ${folio.id_cliente.last_name}`}</p>
                                                        <p>{folio.id_cliente.email}</p>
                                                        <p>{folio.id_cliente.phone}</p>
                                                    </div>
                                                    <div className="col">
                                                        <h6>Direccion de Entrega</h6>
                                                        <p>{`${folio.id_cliente.address_street} ${folio.id_cliente.address_ext}, ${folio.id_cliente.address_int && `interior ${folio.id_cliente.address_int}`}`}</p>
                                                        <p>{`${folio.id_cliente.address_col}, ${folio.id_cliente.address_town} ${folio.id_cliente.address_state}`}</p>
                                                        <p>{folio.id_cliente.address_zip}</p>
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
                                    </>
                                ) : "Cargando..."
                        }

                        <div className="row-60-40 box4">
                            <div className="col">
                                <h6>Detalles de Pago</h6>
                                {
                                    folio.detalle_anticipo
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
                                    folio.detalles_pago
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
                                }
                            </div>
                            <div className="col">
                                <div className="total__container">
                                    <p>Subtotal</p> <p><b>{folio.subtotal_productos && coinFormat(folio.subtotal_productos)}</b></p>
                                    <p>Descuento</p> <p><b>{`-${folio.subtotal_promos && coinFormat(folio.subtotal_promos)}`}</b></p>
                                    <h4>TOTAL</h4> <h4>{folio.total && coinFormat(folio.total)}</h4>
                                </div>
                            </div>
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

                            <div className="row mb-4">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Almacen</th>
                                            <th>Chofer</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='h-16'>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap -mx-3'>
                <button>
                    Descargar
                    <span className="material-symbols-rounded text-gray-600">
                        picture_as_pdf
                    </span>
                </button>
            </div>
        </div>
    )
}
