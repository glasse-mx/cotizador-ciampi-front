import { Header } from "./Header"
import { SidebarMenu } from "./SidebarMenu"

export const AppLayout = () => {
    return (
        <div className="app__container">
            <Header />
            <div className="system__container">
                <SidebarMenu />
            </div>
        </div>
    )
}
