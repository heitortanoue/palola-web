import { useState } from "react"
import Spinner from "./spinner"

export default function Button ({ style, onClick, children, type } :
    { style ?: string, onClick ?: any, children : string, type?: "submit" | "button" }) {
    const [spin, setSpin] = useState(false)

    const clickFunction = async () => {
        setSpin(true)

        if (onClick) {
            await onClick()
        }

        setSpin(false)
    }

    return (
        <button type={type || "button"} className={style + " flex gap-3 items-center justify-center"}
        onClick={clickFunction}>
            { spin ? <Spinner/> : null }
            {children}
        </button>
    )
}