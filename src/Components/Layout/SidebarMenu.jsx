import './SidebarMenu.css'

export const SidebarMenu = () => {
    return (
        <div className="sidebar__container">
            <div className="sidebar">
                <ul>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                dashboard
                            </span>
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                groups
                            </span>
                            Clientes
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                note_add
                            </span>
                            Crear Cotizaciones
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                find_in_page
                            </span>
                            Consultar Cotizaciones
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                receipt
                            </span>
                            Consultar notas de venta
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                delete
                            </span>
                            Consultar notas canceladas
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
