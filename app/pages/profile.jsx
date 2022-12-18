import { useContext, useState, useEffect } from "react"

import { FirebaseContext } from "../context/FirebaseContext"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Navbar, Loader } from "../components"

const Profile = () => {
    const { userFirebaseData, loadingFirebaseData, errorFirebaseData, getUserData } =
        useContext(FirebaseContext)

    const [profileData, setProfileData] = useState({
        displayName: "",
        email: "",
        profileImageUrl: "",
        publicAddress: "",
    })

    useEffect(() => {
        try {
            // Anonymus function
            ;(async () => {
                if (userFirebaseData) {
                    // Get the data
                    let userData = (await getUserData(userFirebaseData.uid))[0].data
                    let newData = {}
                    for (const key in profileData) {
                        newData = { ...newData, [key]: userData[key] }
                    }
                    // Set the data
                    setProfileData(newData)
                }
            })()
        } catch (error) {
            console.log(error.code)
            console.log(error.message)

            toast.error("Ha habido un error cargando el perfil", {
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
    }, [userFirebaseData])

    return (
        <div className="flex">
            <div className="w-1/6 h-screen">
                <Navbar />
            </div>
            <div className="w-4/6 h-screen">
                {loadingFirebaseData ? (
                    <div
                        className={`h-1/3 w-full hidden items-center justify-center md:flex md:flex-1 lg:w-0`}
                    >
                        <Loader h={32} w={32} />
                    </div>
                ) : userFirebaseData ? (
                    <>
                        <p>{profileData.displayName}</p>
                    </>
                ) : (
                    <>
                        <p>Haz login bobo</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile
