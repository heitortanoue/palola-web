import Head from "next/head";

export default function MetaTags ({ children } : { children?: any }) {
    return (
        <Head>
            <title>Palola 🐾 - Não deixe seu cãozinho com fome</title>
            <link rel="icon" href="/icon.png" />

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