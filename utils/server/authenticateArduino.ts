import { NextApiRequest } from "next"

export const authenticateArduino = (request : NextApiRequest) : boolean => {
    const token = request.headers.authorization || ''
    return (process.env.ARDUINO_AUTH_KEY === token)
}