import { useState } from "react"

export const UserWidget = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleDisplayUserWidgetMenu = () => {
        setIsVisible(!isVisible);
    }

    return (
        <>
            <div className="topbar_user_widget">
                <img src="./img/default-avatar.png" alt="Gabriel Coronado" className="userAvatar" />
                <p onClick={handleDisplayUserWidgetMenu}><span className="username">Gabriel Coronado</span> <span className="material-symbols-rounded">
                    expand_more
                </span></p>
            </div>
            <div className={`user_widget_menu ${isVisible && 'visible'}`}>
                <ul>
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                person
                            </span>
                            Ver Perfil
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a href="#">
                            <span className="material-symbols-rounded">
                                logout
                            </span>
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
