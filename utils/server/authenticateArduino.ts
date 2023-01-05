import { NextApiRequest } from "next"

export const authenticateArduino = (request : NextApiRequest) : boolean => {
    const origin = request.headers["sec-fetch-site"] || ''
    const token = request.headers["authorization"] || ''

    return (
        origin === "same-origin" || origin === "same-site"
        || process.env.ARDUINO_AUTH_KEY === token
    )
}