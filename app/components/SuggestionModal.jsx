import { React, Fragment, useState, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { DAOContext } from "../context/DAOContext"

import HeroIcon from "../components/HeroIcon"

import { Poppins } from "@next/font/google"

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    // weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

const SuggestionModal = () => {
    const { createPropose } = useContext(DAOContext)

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [formData, setFormData] = useState({
        newValue: "",
        functionToCall: "",
        proposalDescription: "",
    })

    const updateField = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button className="bg-white rounded-lg p-4" onClick={openModal}>
                <HeroIcon icon={"PlusIcon"} color="text-black-700" size={9} />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className={`${poppins.variable} font-sans relative z-10`}
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Haz una propuesta
                                    </Dialog.Title>
                                    <form className="mt-5 flex flex-col items-center">
                                        <div className="flex items-center justify-center my-5">
                                            <label
                                                htmlFor="newValue"
                                                className="w-48 font-bold text-base mr-5"
                                            >
                                                Nuevo valor
                                            </label>
                                            <input
                                                id="newValue"
                                                name="newValue"
                                                type="text"
                                                required
                                                className="w-full border px-2 py-0.5"
                                                value={formData.newValue}
                                                onChange={updateField}
                                            ></input>
                                        </div>
                                        <div className="flex items-center justify-center my-5">
                                            <label
                                                htmlFor="functionToCall"
                                                className="w-48 font-bold text-base mr-5"
                                            >
                                                Función
                                            </label>
                                            <input
                                                id="functionToCall"
                                                name="functionToCall"
                                                type="text"
                                                required
                                                className="w-full border px-2 py-0.5"
                                                value={formData.functionToCall}
                                                onChange={updateField}
                                            ></input>
                                        </div>
                                        <div className="flex items-center justify-center my-5">
                                            <label
                                                htmlFor="proposalDescription"
                                                className="w-48 font-bold text-base mr-5"
                                            >
                                                Descripción
                                            </label>
                                            <input
                                                id="proposalDescription"
                                                name="proposalDescription"
                                                type="text"
                                                required
                                                className="w-full border px-2 py-0.5"
                                                value={formData.proposalDescription}
                                                onChange={updateField}
                                            ></input>
                                        </div>

                                        <button
                                            className="bg-black text-white w-fit my-5 px-9 py-1.5"
                                            type="submit"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                createPropose(
                                                    [formData.newValue],
                                                    formData.functionToCall,
                                                    formData.proposalDescription
                                                )
                                                closeModal()
                                            }}
                                        >
                                            Enviar la propuesta
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default SuggestionModal
