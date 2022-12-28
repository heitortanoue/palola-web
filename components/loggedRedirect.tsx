import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../utils/firebaseConfig"
import Spinner from "./gereral/spinner"
import { textStyles } from "../styles/styles"
import { useEffect } from "react"

export default function LoggedRedirect () {
    const router = useRouter()
    const [ user, loading ]  = useAuthState(auth)

    useEffect(() => {
        if (!loading && !user) router.push("/login")
    }, [loading, user])

    return (
        <>
        {
            loading || !user ?
            <div className="flex absolute h-full w-full z-50 bg-white">
                <div className="m-auto flex flex-col gap-3 justify-center scale-[1.3] items-center">
                    <div className="scale-150 mr-3">
                        <Spinner/>
                    </div>
                    <h1 className={textStyles.h1}>
                        Carregando...
                    </h1>
                </div>
            </div>
            : null
        }
        </>
    )
}