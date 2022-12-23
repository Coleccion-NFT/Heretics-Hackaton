import { LockClosedIcon } from "@heroicons/react/20/solid"

import { HeroIcon } from "../components"

const FaQ = () => {
    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center pl-8 pr-4 py-32">
                <div className="w-4/5 md:w-2/5 flex flex-col justify-center">
                    <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-black">
                        Ups... Parece que te has perdido
                    </h2>
                    <div>
                        <button
                            onClick={() => {
                                router.push("/")
                            }}
                            className="mb-6 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <HeroIcon icon={"HomeIcon"} color="text-black-700" size={5} />
                            </span>
                            Home
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                router.push("/signin")
                            }}
                            className="mb-6 group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-white group-hover:text-white"
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaQ
