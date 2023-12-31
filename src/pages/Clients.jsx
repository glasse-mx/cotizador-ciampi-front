import axios, { all } from "axios"
import { useAppContext } from "../Context/CredentialsContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { NoFolios } from "../Components/Layout/NoFolios";

export const Clients = () => {

    const [credentials, setCredentials] = useAppContext()

    const [allClients, setAllClients] = useState([])
    const [isClientsLoading, setIsClientsLoading] = useState(true)


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/clients`,
            headers: {
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then((response) => {
                setAllClients(response.data)
                setIsClientsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
        return match
    }

    return (
        <div className="w-full h-full px-6 py-6 mx-auto">

            <div className="my-4 flex justify-end">
                <Link to="/clientes/nuevo">
                    <Button variant="contained">
                        Añadir Cliente
                        <span className="material-symbols-rounded text-gray-600">
                            group_add
                        </span>
                    </Button>
                </Link>
            </div>

            {

                !isClientsLoading ? (
                    allClients.length > 0 ? (
                        <div className="flex flex-wrap -mx-3">
                            <div className="flex-none w-full max-w-full px-3">
                                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                    <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                        <h6>Clientes</h6>
                                    </div>
                                    <div className="flex-auto px-0 pt-0 pb-2">
                                        <div className="p-0 overflow-x-auto">
                                            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                                <thead className="align-bottom">
                                                    <tr>
                                                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nombre y Apellido</th>
                                                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Teléfono</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Correo Electrónico</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Municipio</th>
                                                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Estado</th>
                                                        <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        allClients.map((client) => {
                                                            return (
                                                                <tr key={client.id}>
                                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <div className="flex px-2 py-1">
                                                                            <div className="flex flex-col justify-center">
                                                                                <h6 className="mb-0 text-sm leading-normal">{`${client.first_name} ${client.last_name}`}</h6>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <p className="mb-0 text-xs font-semibold leading-tight">{formatPhoneNumber(client.phone)}</p>
                                                                    </td>
                                                                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <p className="mb-0 text-xs font-semibold leading-tight">{client.email}</p>
                                                                    </td>
                                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <p className="mb-0 text-xs font-semibold leading-tight">{client.address_town ? client.address_town : 'N/A'}</p>
                                                                    </td>
                                                                    <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                                        <p className="mb-0 text-xs font-semibold leading-tight">{client.address_state ? client.address_state : 'N/A'}</p>
                                                                    </td>
                                                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">

                                                                        <Link
                                                                            to={`/clientes/${client.id}`}
                                                                            className="text-xs font-semibold leading-tight text-slate-400"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NoFolios folio='Clientes' />
                    )
                ) : (
                    <div className="loading__container">
                        <CircularProgress />
                    </div>
                )

            }
        </div>
    )
}
