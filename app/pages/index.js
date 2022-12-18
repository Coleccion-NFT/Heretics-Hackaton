import { Navbar } from "../components"

export default function Home() {
    return (
        <div className="flex">
            <div className="w-1/6 h-full">
                <Navbar />
            </div>
            <div className="w-4/6 h-full">{/* <ContentCreators /> */}</div>
        </div>
    )
}
