import { AppAside } from "./AppAside"
import { AppNavBar } from "./AppNavBar"

export const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
            <AppAside />
            <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
                <AppNavBar />
                {children}
            </main>
        </div>
    )
}
