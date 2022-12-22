import { Navbar, Sidebar, Dashboard } from "../components"

export default function Home() {
    return (
        <div className="w-full h-screen flex flex-col justify-between pl-8 pr-4 py-14">
            <Dashboard />
        </div>
    )
}
