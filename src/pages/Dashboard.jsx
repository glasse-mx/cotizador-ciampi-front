import { AppLayout } from "../Components/Layout/AppLayout"
import { Routes, Route, Navigate } from "react-router-dom"
import { Cancelations, Clients, Cotizaciones, Home, Inventory, NewCotizacion, Sales, Users } from "./index"


export const Dashboard = () => {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<Home nombre="Inicio" />} />
                <Route path="/clientes" element={<Clients nombre="Clientes" />} />
                <Route path="/nueva-cotizacion" element={<NewCotizacion nombre="Nueva Cotizacion" />} />
                <Route path="/cotizaciones" element={<Cotizaciones />} />
                <Route path="/notas-venta" element={<Sales />} />
                <Route path="/notas-canceladas" element={<Cancelations />} />
                <Route path="/inventario" element={<Inventory />} />
                <Route path="/usuarios" element={<Users />} />
            </Routes>

        </AppLayout>
    )
}
