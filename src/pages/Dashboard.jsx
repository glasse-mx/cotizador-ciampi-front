import { AppLayout } from "../Components/Layout/AppLayout"
import { Routes, Route, Navigate } from "react-router-dom"
import { Cancelations, Clients, Cotizaciones, Home, Inventory, NewCotizacion, Sales, Users } from "./index"
import { ClientDetail } from "./ClientDetail"
import { NewClient } from "./NewClient"
import { SingleUser } from "./SingleUser"
import { NewUser } from "./NewUser"
import { SingleCotizacion } from "./SingleCotizacion"


export const Dashboard = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home nombre="Inicio" />} />
                <Route path="/clientes" element={<Clients nombre="Clientes" />} />
                <Route path="/clientes/:id" element={<ClientDetail />} />
                <Route path="/clientes/nuevo" element={<NewClient />} />
                <Route path="/nueva-cotizacion" element={<NewCotizacion nombre="Nueva Cotizacion" />} />
                <Route path="/cotizaciones" element={<Cotizaciones />} />
                <Route path="/cotizaciones/:id" element={<SingleCotizacion />} />
                <Route path="/notas-venta" element={<Sales />} />
                <Route path="/notas-canceladas" element={<Cancelations />} />
                <Route path="/inventario" element={<Inventory />} />
                <Route path="/usuarios" element={<Users />} />
                <Route path="/usuarios/nuevo" element={<NewUser />} />
                <Route path="/usuario/:id" element={<SingleUser />} />
            </Routes>

        </AppLayout>
    )
}
