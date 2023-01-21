import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { machineStatusToObject } from '../../utils/mealsTranslation'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MachineStatus, MealGroup, MealStatus, RESPONSE_STATUS } from '../../utils/types'

export default async function startmeal(req: NextApiRequest, res: NextApiResponse) {
    const { mealName }: { mealName: string } = req.body

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
        return res.status(400).json({
            message: `Máquina não-disponível (${machineStatusToObject(machineStatus.status).text})`
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

        // atualiza a lastDate do grupo de refeicoes que tem o name == mealName
        if (mealName !== MealGroup.MANUAL) {
            const newDocGroup = doc(database, 'groups', mealName)
            await updateDoc(newDocGroup, { lastDate: Timestamp.now() })
        }

        return res.status(200).json({ status: RESPONSE_STATUS.SUCESS, id })
    }).catch((err) => {
        return res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err.message })
    })
}
