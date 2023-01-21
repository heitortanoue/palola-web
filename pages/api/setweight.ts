import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { RESPONSE_STATUS } from '../../utils/types'

export default async function setweight (req: NextApiRequest, res: NextApiResponse) {
    const { current } = req.body

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    await updateDoc(doc(database, 'machine', "weightStatus"), {
        current,
    })
    .then(async () => {
        await updateDoc(doc(database, 'machine', "machineStatus"), {
            lastUpdate: Timestamp.now()
        })

        res.status(200).json({ status: RESPONSE_STATUS.SUCESS,  message: "Peso atual alterado com sucesso" })
    }).catch((err) => {
        res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err })
    })
}
