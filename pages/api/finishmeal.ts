import { doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MachineStatus, MealStatus } from '../../utils/types'

export default async function finishmeal (req: NextApiRequest, res: NextApiResponse) {
    const { status, id } : { status: MealStatus, id: string } = req.body

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    // check if status is in enum mealstatus
    if (!Object.values(MealStatus).includes(status)) {
        return res.status(400).json({ message: "Status da refeição inválido" })
    }

    const docRef = doc(database, 'meals', id)

    return await updateDoc(docRef, {status}).then(async (docRef) => {       
        // coloca o status da maquina como FREE
        await updateDoc(doc(database, 'machine', 'machineStatus'), { status: MachineStatus.FREE })

        return res.status(200).json({ message: "Refeição finalizada com sucesso" })
    }).catch((err) => {
        return res.status(400).json({ message: err })
    })
}
