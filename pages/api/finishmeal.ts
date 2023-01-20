import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MachineStatus, MealStatus, RESPONSE_STATUS } from '../../utils/types'

export default async function finishmeal (req: NextApiRequest, res: NextApiResponse) {
    const { status, id, weight } : { status: MealStatus, id: string, weight: number } = req.body

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    // check if status is in enum mealstatus
    if (!Object.values(MealStatus).includes(status)) {
        return res.status(400).json({ message: "Status da refeição inválido" })
    }

    if (status === MealStatus.PENDING) {
        return res.status(400).json({ message: "Não é possível definir o status da refeição como PENDENTE" })
    }

    if (!weight || weight < 0) {
        return res.status(400).json({ message: "Peso inválido" })
    }

    if (!id) {
        return res.status(400).json({ message: "ID inválido" })
    }

    const docRef = doc(database, 'meals', id)

    // check if meal exists and is pending
    const meal = await getDoc(docRef)
    if (!meal.exists()) {
        return res.status(400).json({ message: "Refeição não encontrada" })
    }

    if (meal.data().status !== MealStatus.PENDING) {
        return res.status(400).json({ message: "Refeição não está pendente" })
    }

    return await updateDoc(docRef, {status}).then(async (docRef) => {  
        // atualiza o peso atual
        await updateDoc(doc(database, 'machine', 'weightStatus'), { current: weight })
        
        // coloca o status da maquina como FREE
        await updateDoc(doc(database, 'machine', 'machineStatus'), { status: MachineStatus.FREE })

        return res.status(200).json({ status: RESPONSE_STATUS.SUCESS, message: "Refeição finalizada com sucesso" })
    }).catch((err) => {
        return res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err })
    })
}
