import { useAppContext } from '../../Context/CredentialsContext'
import { AppBreadCrumbs } from './AppBreadCrumbs'

export const AppNavBar = ({ nombrePagina }) => {

    const [credentials, setCredentials] = useAppContext()


    return (
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start" >

            <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">

                <AppBreadCrumbs nombrePagina={nombrePagina} />

                <ul className='flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full'>
                    <li className='flex items-center'>
                        <p className='flex gap-2 px-0 py-2 text-sm font-semibold transition-all ease-nav-brand text-slate-500'>
                            <span className="material-symbols-rounded text-gray-600">
                                account_circle
                            </span>
                            {`Bienvenid@ ${credentials?.user?.name}`}
                        </p>
                    </li>
                </ul>
            </div>

        </nav>
    )
}
