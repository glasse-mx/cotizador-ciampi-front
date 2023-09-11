import axios from "axios"
import { useAppContext } from "../Context/CredentialsContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Users = () => {

    const [credentials, setCredentials] = useAppContext()
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/allusers`,
            headers: {
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then((response) => {
                setAllUsers(response.data)
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
                <Link to="/usuarios/nuevo">
                    <Button className="btn-primary" variant="contained">
                        Añadir Usuario
                    </Button>
                </Link>
            </div>

            <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                            <h6>Usuarios</h6>
                        </div>
                        <div className="flex-auto px-0 pt-0 pb-2">
                            <div className="p-0 overflow-x-auto">
                                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                    <thead className="align-bottom">
                                        <tr>
                                            <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Nombre y Apellido</th>
                                            <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Teléfono</th>
                                            <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Correo Electrónico</th>

                                            <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            allUsers.map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <div className="flex px-2 py-1">
                                                                <div className="flex flex-col justify-center">
                                                                    <h6 className="mb-0 text-sm leading-normal">{user.name}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <p className="mb-0 text-xs font-semibold leading-tight">{user.phone ? formatPhoneNumber(user.phone) : 'N/A'}</p>
                                                        </td>
                                                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <p className="mb-0 text-xs font-semibold leading-tight">{user.email}</p>
                                                        </td>
                                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                            <Link to={`/usuario/${user.id}`} className="text-xs font-semibold leading-tight text-slate-400"> Edit </Link>
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
        </div>
    )
}
