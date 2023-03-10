import { createContext, useContext } from "react"
import { useRouter } from "next/router"

import { Web3Context } from "./Web3Context"

import { auth, googleProvider, db } from "../backend/firebase"
import { doc, setDoc, getDocs, collection } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

import { toast } from "react-toastify"
import toastConfig from "../constants/toastConfig.json"
import "react-toastify/dist/ReactToastify.css"

import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"

// Creamos el contexto
export const FirebaseContext = createContext()

// Creamos el provider
export const FirebaseProvider = ({ children }) => {
    const { createPairKeys } = useContext(Web3Context)

    const router = useRouter()

    // Hook para obtener los datos del usuario del authentication
    const [userFirebaseData, loadingFirebaseData, errorFirebaseData] = useAuthState(auth)

    // AUTH --------------------------------------------------------------------------------------

    // Funcion para gestionar el registro del usuario
    const handleUserSignUp = async (
        signProvider,
        formValues,
        publicAddress,
        encryptedPrivateKey
    ) => {
        // Comprovamos el provider desde el cual se esta registrando el usuario
        let provider
        switch (signProvider) {
            case "google":
                provider = googleProvider
                break
            case "email&password":
                provider = false
                break
            default:
                break
        }

        try {
            const userData = provider
                ? await signInWithPopup(auth, provider)
                : await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)

            await addUserToFirestore(
                userData?.user,
                formValues.displayName,
                publicAddress,
                encryptedPrivateKey
            )

            toast.success("Te has registrado correctamente", toastConfig)
            router.push("/")
        } catch (e) {
            console.log(e.code)
            console.log(e.message)

            toast.error("Algo ha ido mal en tu registro, contacta con soprte", toastConfig)
        }
    }

    // Funcion para gestionar el inicio de sesion del usuario
    const handleUserSignIn = async (signProvider, formValues) => {
        // Comprovamos el provider desde el cual se esta registrando el usuario
        let provider

        switch (signProvider) {
            case "google":
                provider = googleProvider
                break
            case "email&password":
                provider = false
                break
            default:
                break
        }

        try {
            const userData = provider
                ? await signInWithPopup(auth, provider)
                : await signInWithEmailAndPassword(auth, formValues.email, formValues.password)

            toast.success(`Has iniciado sesi??n correctamente`, toastConfig)
            router.push("/")

            // En caso de iniciar sesi??n con google, comprovamos que antes se haya registrado y le hayamos creado un pairKeys
            if (signProvider == "google") {
                try {
                    const [publicAddress, encryptedPrivateKey] = createPairKeys(formValues.password)
                    await addUserToFirestore(
                        userData?.user,
                        formValues.displayName,
                        publicAddress,
                        encryptedPrivateKey
                    )
                } catch (e) {
                    console.log(e.code)
                    console.log(e.message)
                }
            }
        } catch (e) {
            console.log(e.code)
            console.log(e.message)

            toast.error(
                "Ha habido un error en el inicio de sesi??n, contacta con soprte",
                toastConfig
            )
        }
    }

    // Funcion para gestionar el cierre de sesion del usuario
    const handleSignOut = async () => {
        try {
            await signOut(auth)

            toast.info("Has cerrado sesi??n correctamente", toastConfig)
        } catch (e) {
            console.log(e.code)
            console.log(e.message)

            toast.warning("Ha habido un error y no has cerrado sesi??n", toastConfig)
        }
    }

    // BASE DE DATOS --------------------------------------------------------------------------------------

    // Funcion para la creacion del usuario en la base de datos
    const addUserToFirestore = async (user, displayName, publicAddress, encryptedPrivateKey) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                displayName: displayName || user.displayName,
                email: user.email,
                publicAddress: publicAddress,
                profileImageUrl: user.photoURL || "undefined",
                encryptedPrivateKey: encryptedPrivateKey,
            })
        } catch (error) {
            console.log(e.code)
            console.log(e.message)
        }
    }

    // Funcion para obtener una snapshot de todos los usuarios de la plataforma
    const getAllUsersSnapshot = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"))

            let allUsersSnapshot = querySnapshot.docs.map((doc) => {
                return {
                    uid: doc.id,
                    data: {
                        ...doc.data(),
                    },
                }
            })

            return allUsersSnapshot
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }

    // Funcion para obtener la data de un usuario en concreto dado su userId
    const getUserData = async (uid) => {
        try {
            let allUsersSnapshot = await getAllUsersSnapshot()

            const userData = allUsersSnapshot?.filter((docData) => {
                return docData.uid == uid
            })

            return userData
        } catch (error) {
            console.log(error.code)
            console.log(error.message)
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                handleUserSignUp,
                handleUserSignIn,
                handleSignOut,
                getAllUsersSnapshot,
                getUserData,
                userFirebaseData,
                loadingFirebaseData,
                errorFirebaseData,
                auth,
                db,
                collection,
                doc,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}
