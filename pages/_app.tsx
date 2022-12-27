import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

export default function App({ Component, pageProps }: AppProps) {
    // optional configuration
    const options = {
        // you can also just use 'bottom center'
        position: positions.BOTTOM_CENTER,
        timeout: 3000,
        transition: transitions.FADE
    }
  

    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
        </AlertProvider>
    )
}
