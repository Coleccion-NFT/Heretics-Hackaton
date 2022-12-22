import { Navbar, Sidebar, Dashboard } from "../components"

export default function Home() {
    return (
        <div className="flex h-screen">
            <div className="w-1/6 h-full">
                <Navbar />
            </div>
            <div className="w-full lg:w-4/6 h-screen flex flex-col justify-center pl-8 pr-4 py-14">
                <Dashboard />
            </div>
            <div className="hidden lg:block lg:w-1/6 h-screen">
                <Sidebar />
            </div>
        </div>
    )
}
