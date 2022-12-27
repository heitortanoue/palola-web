import Head from "next/head";
import Link from "next/link";

export default function Layout ({ children, disableBackButton } : { children: any, disableBackButton ?: boolean }) {
    return (
        <>
        <Head>
            <title>Palola - Alimente seu cão</title>
            <link rel="icon" href="/icon.png" />
        </Head>

        <div className="bg-background text-black h-screen overflow-y-auto">
            <div className="w-full">
                <div className="relative overflow-hidden">
                    <div className="bg-primary flex justify-center items-center pt-7 pb-10 
                    text-white text-xl font-bold">
                        <Link href="/">
                            Palola ©
                        </Link>
                    </div>
                   { !disableBackButton ? <div className="absolute w-9 h-9 rounded-md bg-white top-5 left-5 flex cursor-pointer"
                    onClick={() => window.history.back()}>
                        <i className="fa-solid text-xl text-primary fa-arrow-left m-auto"/>
                    </div> : null}
                    <div className="absolute w-[100vw] scale-x-[2.5] bg-background
                    inset-x-0 mx-auto rounded-full top-20 h-[100vw]"/>
                </div>
            </div>
            <main className="z-[1] p-6 flex flex-col gap-10 lg:gap-12 pb-20">
                {children}
            </main>
        </div>
        </>
    )
}