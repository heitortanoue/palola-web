import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseConfig";
import MetaTags from "./metaTags";

export default function Layout ({ children, disableBackButton } : { children: any, disableBackButton ?: boolean }) {
    const [ user, loading ] = useAuthState(auth)
    
    return (
        <>
        <MetaTags/>
        <div className="bg-background text-black h-screen overflow-y-auto">
            <div className="relative overflow-hidden bg-primary flex justify-between items-center
                pt-7 pb-10 lg:pb-7">
                <div className="flex justify-between items-center max-w-6xl w-full mx-auto px-6">
                    { !disableBackButton ? 
                        <div className="w-9 h-9 rounded-md bg-white flex cursor-pointer"
                        onClick={() => window.history.back()}>
                            <i className="fa-solid text-xl text-primary fa-arrow-left m-auto"/>
                        </div>
                    : <div/>}

                    <Link href="/" passHref>
                        <div className="text-white text-2xl font-bold ml-12 flex gap-3 items-center">
                            <i className="fa-solid fa-paw"/>
                            Palola
                            <i className="fa-solid fa-paw"/>
                        </div>
                    </Link>

                    { user ?
                        <div className="w-9 h-9 rounded-md bg-white flex cursor-pointer">
                            <i onClick={() => auth.signOut()}
                            className="fa-solid text-xl text-primary fa-right-from-bracket m-auto"/>
                        </div>
                    : <div/> }

                    <div className="lg:hidden absolute w-[100vw] scale-x-[2.5] bg-background
                    inset-x-0 mx-auto rounded-full top-20 h-[100vw]"/>
                </div>
            </div>
            <main className="z-[1] p-6 flex flex-col gap-10 lg:gap-12 pb-20 max-w-6xl mx-auto">
                {children}
            </main>
        </div>
        </>
    )
}