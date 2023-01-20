import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { RESPONSE_STATUS } from '../../utils/types'

export default async function setpalolastatus (req: NextApiRequest, res: NextApiResponse) {
    const snapshot = await getDoc(doc(database, 'machine', 'machineStatus'))
    const id = snapshot.id

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    await updateDoc(doc(database, 'machine', id), { status: req.body.status })
    .then(() => {
        res.status(200).json({ status: RESPONSE_STATUS.SUCESS, message: "Status alterado com sucesso" })
    }).catch((err) => {
        res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err })
    })
}
