import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'

export default async function setweight (req: NextApiRequest, res: NextApiResponse) {
    const { current } = req.body

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    await updateDoc(doc(database, 'machine', "weightStatus"), {
        current,
        lastUpdate: Timestamp.now()
    })
    .then(() => {
        res.status(200).json({ message: "Peso atual alterado com sucesso" })
    }).catch((err) => {
        res.status(400).json({ message: err })
    })
}
