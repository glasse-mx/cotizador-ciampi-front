import { AppLayout } from "../Components/Layout/AppLayout"
import { Routes, Route, Navigate } from "react-router-dom"
import { Cancelations, Clients, Cotizaciones, Home, Inventory, NewCotizacion, Sales, Users } from "./index"
import { ClientDetail } from "./ClientDetail"
import { NewClient } from "./NewClient"
import { SingleUser } from "./SingleUser"
import { NewUser } from "./NewUser"
import { SingleCotizacion } from "./SingleCotizacion"
import { SingleVenta } from "./SingleVenta"
import { SingleCancellation } from "./SingleCancellation"


export const Dashboard = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home nombre="Inicio" />} />
                <Route path="/clientes" element={<Clients nombre="Clientes" />} />
                <Route path="/clientes/:id" element={<ClientDetail />} />
                <Route path="/clientes/nuevo" element={<NewClient />} />
                <Route path="/cotizaciones" element={<Cotizaciones />} />
                <Route path="/nueva-cotizacion" element={<NewCotizacion nombre="Nueva Cotizacion" />} />
                <Route path="/cotizaciones/:id" element={<SingleCotizacion />} />
                <Route path="/notas-venta" element={<Sales />} />
                <Route path="/nueva-venta/:id" element={<SingleVenta isEditing={true} />} />
                <Route path="/notas-venta/:id" element={<SingleVenta />} />
                <Route path="/notas-canceladas" element={<Cancelations />} />
                <Route path="/notas-canceladas/:id" element={<SingleCancellation />} />
                <Route path="/inventario" element={<Inventory />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/usuarios/nuevo" element={<NewUser />} />
                <Route path="/usuario/:id" element={<SingleUser />} />
            </Routes>

        </AppLayout>
    )
}
