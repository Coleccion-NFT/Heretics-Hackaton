import { Navbar } from "../components"

export default function Home() {
    return (
        <div class="flex">
            <div class="w-1/6 h-full">
                <Navbar />
            </div>
            <div class="w-4/6 h-full">{/* <ContentCreators /> */}</div>
        </div>
    )
}
