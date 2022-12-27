import { doc, getDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'

export default async function getpalolastatus (req: NextApiRequest, res: NextApiResponse) {
    const snapshot = await getDoc(doc(database, 'machine', 'machineStatus'))
    const { status } = snapshot.data() as { status: string }

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    res.status(200).json({ status })
}
