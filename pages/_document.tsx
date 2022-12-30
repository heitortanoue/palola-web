import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
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

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <script src="https://kit.fontawesome.com/cd41aedce8.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
