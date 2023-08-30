import { UserWidget } from '../UI/UserWidget'
import './Header.css'

export const Header = () => {
    return (
        <header className='topbar'>
            <div className="left-menu">
                <span className="material-symbols-rounded">
                    menu
                </span>
                <a href="#">
                    <img src="./img/app-logo.png" alt={`${import.meta.env.VITE_COMPANY_NAME} Logo`} />
                </a>
            </div>
            <UserWidget />
        </header>
    )
}
