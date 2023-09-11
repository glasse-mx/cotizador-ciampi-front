import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAppContext } from '../Context/CredentialsContext'
import { BasicsForm, ClientForm, DeliverForm, PaymentForm } from '../Components/Forms'

export const NewCotizacion = () => {

    const [credentials, setCredentials] = useAppContext()




    return (
        <div className='w-full px-6 py-6 mx-auto'>
            <div className='flex flex-wrap -mx-3'>
                <form>
                    {/* Primera Fila */}
                    <BasicsForm credentials={credentials} />
                    {/* Fin primera Fila */}

                    {/* Datos de Cliente */}
                    <ClientForm />
                    {/* Fin Datos de Cliente */}

                    {/* Datos de Ruta de Entrega */}
                    <DeliverForm />
                    {/* Fin Datos de Ruta de Entrega */}

                    {/* Apartado */}

                    {/* Pago */}
                    <PaymentForm />

                    {/* productos */}

                    {/* subtotal */}

                    {/* total */}


                </form>
            </div>
        </div>
    )
}
