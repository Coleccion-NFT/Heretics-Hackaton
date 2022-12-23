import { Navbar, Sidebar, Dashboard } from "../components"

export default function Home() {
    return (
        <div className="w-full h-screen flex flex-col justify-between pl-8 pr-10 2xl:pr-8 pt-10 pb-4">
            <Dashboard />
        </div>
    )
}
