import Head from "next/head";
import Image from "next/image";

export default function Home() {
    const ultimasRefeicoes = [
        {
            id: 1,
            data: "2021-09-01",
            hora: "12:00",
            grupo: "Almoço",
        },
        {
            id: 2,
            data: "2021-09-01",
            hora: "12:00",
            grupo: "Almoço",
        },
    ]

    return (
        <>
        <Head>
            <title>Palola - Alimente seu cão</title>
            <link rel="icon" href="/icon.png" />
        </Head>

        <div>
            <div className="w-full">
                <div className="relative overflow-hidden">
                    <div className="bg-primary flex justify-center items-center pt-7 pb-20 
                    text-white text-xl font-bold">
                        Palola ©
                    </div>
                    <div className="absolute w-[100vw] scale-x-[2.5] bg-white
                    inset-x-0 mx-auto rounded-full top-20 h-[100vw]"/>
                </div>
            </div>
            <main className="z-[1] p-6">
                <section className="pb-8">
                    <h1 className="font-bold text-xl mb-3">
                        Como a Lola está?
                    </h1>
                </section>
                <section>
                    <h2 className="font-bold text-xl mb-3">
                        Últimas refeições
                    </h2>
                    <div className="flex flex-col gap-3">
                        {ultimasRefeicoes.map((refeicao) => (
                            <div key={refeicao.id} className="flex gap-5 rounded-md bg-secondary/20 p-5 items-center">
                                <div className="h-12 w-12 rounded-sm bg-secondary flex">
                                    <i className="fa-solid fa-sun text-white text-3xl m-auto"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold">{refeicao.grupo}</span>
                                    <span className="text-sm">{refeicao.data} - {refeicao.hora}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
        </>
    );
}
