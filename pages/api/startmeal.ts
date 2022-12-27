import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { machineStatusToObject } from '../../utils/mealsTranslation'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MachineStatus, MealGroup, MealStatus } from '../../utils/types'

export default async function startmeal (req: NextApiRequest, res: NextApiResponse) {
    const { mealName } : { mealName: string } = req.body

    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    // check if mealName is in enum MealGroup
    if (!Object.values(MealGroup).includes(mealName as MealGroup)) {
        return res.status(400).json({ message: "Nome da refeição inválido" })
    }

    // check if machine is free
    const snapshot = await getDoc(doc(database, 'machine', 'machineStatus'))
    const machineStatus = snapshot.data() as any
    if (machineStatus.status !== MachineStatus.FREE) {
        return res.status(400).json(
            { message: `Máquina não-disponível (${ machineStatusToObject(machineStatus.status).text })`
        })
    }

    const newMeal = {
        group: mealName,
        date: Timestamp.now(),
        status: MealStatus.PENDING
    }

    const col = collection(database, 'meals')
    return await addDoc(col, newMeal).then(async (docRef) => {
        const id = docRef.id
        
        // coloca o status da maquina como BUSY
        await updateDoc(doc(database, 'machine', 'machineStatus'), { status: MachineStatus.BUSY })

        return res.status(200).json({ id })
    }).catch((err) => {
        return res.status(400).json({ message: err })
    })
}
