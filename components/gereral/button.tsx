import { useState } from "react"
import Spinner from "./spinner"

export default function Button ({ style, onClick, children } : { style ?: string, onClick ?: any, children : string }) {
    const [spin, setSpin] = useState(false)

    const clickFunction = async () => {
        setSpin(true)

        if (onClick) {
            await onClick()
        }

        setSpin(false)
    }

    return (
        <button className={style + " flex gap-3 items-center justify-center"}
        onClick={clickFunction}>
            { spin ? <Spinner/> : null }
            {children}
        </button>
    )
}