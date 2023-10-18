import { Link } from "react-router-dom"
import axios from 'axios'
import { useAppContext } from "../../Context/CredentialsContext"
import AppLogoIcon from '../../assets/img/app-logo.png'


export const AppAside = () => {

    const [credentials, setCredentials] = useAppContext()


    const handleLogOut = () => {

        localStorage.removeItem('thai-credentials')
        window.location.href = '/'


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${credentials.token}`
            }
        };

        axios.request(config)
            .then(() => {
                localStorage.removeItem('thai-credentials')
                window.location.href = '/'
            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (
        <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent ps flex flex-col justify-between">
            <div>
                <div className="logoApp">
                    <img src={AppLogoIcon} alt={`${import.meta.env.VITE_COMPANY_NAME} Logo`} />
                </div>
                <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                <h3 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
                    Menu
                </h3>
                <ul className="flex flex-col pl-0 mb-0">
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"

                        // "shadow-soft-xl rounded-lg bg-white font-semibold text-slate-700"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    dashboard
                                </span>
                            </div>
                            Inicio
                        </Link>
                    </li>
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/clientes"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    groups
                                </span>
                            </div>
                            Clientes
                        </Link>
                    </li>
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/nueva-cotizacion"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    note_add
                                </span>
                            </div>
                            Crear Cotizaciones
                        </Link>
                    </li>
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/cotizaciones"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    find_in_page
                                </span>
                            </div>
                            Cotizaciones
                        </Link>
                    </li>
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/notas-venta"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    receipt
                                </span>
                            </div>
                            Notas de Venta
                        </Link>
                    </li>
                    <li className="mt-0 5 w-full">
                        <Link
                            to="/notas-canceladas"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    delete
                                </span>
                            </div>
                            Notas Canceladas
                        </Link>
                    </li>
                    {/* <li className="mt-0 5 w-full">
                        <Link
                            to="/inventario"
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    inventory
                                </span>
                            </div>
                            Inventario
                        </Link>
                    </li> */}
                    <li className="mt-0 5 w-full">
                        <div
                            className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                            onClick={handleLogOut}
                        >
                            <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                <span className="material-symbols-rounded text-gray-600">
                                    logout
                                </span>
                            </div>
                            Cerrar Sesion
                        </div>
                    </li>
                </ul>
            </div>
            {
                credentials.user.user_type >= 3 && (
                    <div>
                        <h3 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
                            Configuraciones
                        </h3>
                        <ul className="flex flex-col pl-0 mb-0">
                            <li className="mt-0 5 w-full">
                                <Link
                                    to="/usuarios"
                                    className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                                >
                                    <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                                        <span className="material-symbols-rounded text-gray-600">
                                            group
                                        </span>
                                    </div>
                                    Gestion de Usuarios
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
        </aside>
    )
}
