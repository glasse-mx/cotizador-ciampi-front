import { Box, Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from "../Context/CredentialsContext";
import { coinFormat } from '../Hooks/useTools'

export const Cotizaciones = () => {

    const [credentials, setCredentials] = useAppContext()

    const [cotizaciones, setCotizaciones] = useState([])
    const [loading, setLoading] = useState(false)

    const getCotizaciones = () => {

        setLoading(true)
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/orders/quotes`,
            headers: {
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then((response) => {
                setCotizaciones(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCotizaciones()
    }, [])

    console.log(cotizaciones)

    return (
        <div className='w-full h-full px-6 py-6 mx-auto'>

            <div className="my-4 flex justify-end">
                <Link to="/nueva-cotizacion">
                    <Button className="btn-primary" variant="contained">
                        Crear Cotizacion
                    </Button>
                </Link>
            </div>

            <div className='flex flex-wrap -mx-3'>
                <div className='flex-none w-full max-w-full px-3'>
                    <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border'>
                        <div className='p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent'>
                            <h6>Cotizaciones</h6>
                        </div>

                        <div className='flex-auto px-0 pt-0 pb-2'>
                            <div className='p-0 overflow-x-auto'>
                                <table className='items-center w-full mb-0 align-top border-gray-200 text-slate-500'>
                                    <thead className='align-bottom'>
                                        <tr>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">#</th>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Vendedor</th>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Cliente</th>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Fecha</th>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Total MXN $</th>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading
                                                ? (
                                                    <tr>
                                                        <td span="6">
                                                            <Box sx={{ display: 'flex' }}>
                                                                <CircularProgress />
                                                            </Box>
                                                        </td>
                                                    </tr>
                                                )
                                                : (
                                                    cotizaciones && cotizaciones.map((cotizacion) => (
                                                        <tr key={cotizacion.id}>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{cotizacion.id}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{cotizacion.created_by}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{cotizacion.id_cliente}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{cotizacion.created_at}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal">{coinFormat(cotizacion.total)}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                <div className="flex px-2 py-1">
                                                                    <div className="flex flex-col justify-center">
                                                                        <h6 className="mb-0 text-sm leading-normal"><span className="material-symbols-rounded text-gray-600">
                                                                            edit
                                                                        </span></h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
