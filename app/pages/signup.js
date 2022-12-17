import { LockClosedIcon } from "@heroicons/react/20/solid"
import { useContext, useState } from "react"
import { FirebaseContext } from "../context/FirebaseContext"
import { Web3Context } from "../context/Web3Context"
import { toast } from "react-toastify"

const Logo = "./FAVICON.svg"

export default function SignUp() {
    const { handleUserSignUp } = useContext(FirebaseContext)
    const { createPairKeys } = useContext(Web3Context)

    const [formValues, setFormValues] = useState({
        displayName: "",
        email: "",
        password: "",
        passwordForPrivateKey: "",
    })

    const updateField = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (provider) => {
        if (
            formValues.displayName &&
            formValues.email &&
            formValues.password &&
            formValues.passwordForPrivateKey
        ) {
            const [publicAddress, encryptedPrivateKey] = createPairKeys(
                formValues.passwordForPrivateKey
            )

            await handleUserSignUp(provider, formValues, publicAddress, encryptedPrivateKey)
        } else if (provider !== "email&password" && formValues.passwordForPrivateKey) {
            const [publicAddress, encryptedPrivateKey] = createPairKeys(
                formValues.passwordForPrivateKey
            )

            await handleUserSignUp(provider, formValues, publicAddress, encryptedPrivateKey)
        } else {
            console.log("Completa todos los requisitos")

            toast.warning("Necesitas completar todos los campos requeridos", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src={Logo} alt="HERETICS" />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
                            Registra una nueva cuenta
                        </h2>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="displayName" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="displayName"
                                    name="displayName"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
                                    placeholder="Username"
                                    value={formValues.displayName}
                                    onChange={updateField}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
                                    placeholder="Email address"
                                    value={formValues.email}
                                    onChange={updateField}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={updateField}
                                />
                            </div>
                            <div>
                                <label htmlFor="passwordForPrivateKey" className="sr-only">
                                    Password for Account's Private Key
                                </label>
                                <input
                                    id="passwordForPrivateKey"
                                    name="passwordForPrivateKey"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
                                    placeholder="Password for Private Key"
                                    value={formValues.passwordForPrivateKey}
                                    onChange={updateField}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    handleSignUp("email&password")
                                }}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-gray-200 group-hover:text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign up
                            </button>
                        </div>
                    </div>

                    <hr className="w-2/3 mx-auto"></hr>

                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="passwordForPrivateKey" className="sr-only">
                                Password for Account's Private Key
                            </label>
                            <input
                                id="passwordForPrivateKey"
                                name="passwordForPrivateKey"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-700 focus:outline-none focus:ring-gray-700 sm:text-sm"
                                placeholder="Password for Private Key"
                                value={formValues.passwordForPrivateKey}
                                onChange={updateField}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            handleSignUp("google")
                        }}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 backdrop-blur-md py-2 px-4 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                        Google
                    </button>
                </div>
            </div>
        </>
    )
}
