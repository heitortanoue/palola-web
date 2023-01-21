import Head from "next/head";

export default function MetaTags ({ children } : { children?: any }) {
    return (
        <Head>
            <title>Palola 🐾 - Não deixe seu cãozinho com fome</title>
            <link rel="icon" href="/icon.png" />

            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <link rel="manifest" href="/manifest.json" /> 
            <meta name="theme-color" content="lightcoral" />
            <meta name="description" content="Palola é um dispositivo de alimentação para cães que permite programar horários para distribuir ração de forma automática, garantindo que o animal receba a quantidade certa de alimento em momentos predeterminados." />
            <meta name="keywords" content="Palola, PET, Alimentação" />

            {/* <!--  Essential META Tags --> */}
            <meta property="og:title" content="Palola 🐾 - Não deixe seu cãozinho com fome"/>
            <meta property="og:image" content="https://palola.vercel.app/_next/image?url=palola-banner.png&w=256&q=100"/>
            <meta property="og:url" content="https://palola.vercel.app/"/>
            <meta property="og:locale" content="pt_BR" />
            <meta name="twitter:card" content="https://palola.vercel.app/_next/image?url=palola-banner.png&w=256&q=100"/>

            {/* <!--  Non-Essential, But Recommended --> */}
            <meta property="og:description" content="Palola é um dispositivo de alimentação para cães que permite programar horários para distribuir ração de forma automática, garantindo que o animal receba a quantidade certa de alimento em momentos predeterminados."/>
            <meta property="og:site_name" content="Palola ©"/>
            <meta name="twitter:image:alt" content="Logomarca Palola"/>
            { children }
        </Head>
    )
}