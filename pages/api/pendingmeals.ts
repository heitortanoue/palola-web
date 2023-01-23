import { collection, doc, getDocs, limit, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import createMealGroupsPending from '../../utils/server/createMealGroupsPending'
import { DEFAULT_FOOD_QUANTITY } from '../../utils/settings'
import { MachineStatus, MealStatus, RESPONSE_STATUS } from '../../utils/types'

export default async function pendingmeals (req: NextApiRequest, res: NextApiResponse) {
    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    // get all docs with status MealStatus.Pending
    const col = collection(database, 'meals')
    const q = query(col, where('status', '==', MealStatus.PENDING), orderBy("date", "desc"))

    return await getDocs(q)
    .then(async (snapshot) => {
        // PRIORITY:
        // 1. scheduled meals
        // 2. past meals

        // get the last date from the meal groups, passing the full url
        const { createdMeal, id : createdId, group : createdGroup, foodQuantity : createdFoodQuantity } = await createMealGroupsPending(req);

        if (createdMeal) {
            return res.status(200).json({ 
                status: RESPONSE_STATUS.SUCESS,
                group: createdGroup,
                id: createdId,
                foodQuantity: createdFoodQuantity || DEFAULT_FOOD_QUANTITY,
            })
        }

        // if no meals are pending
        if (snapshot.empty) {
            return res.status(200).json({ status: RESPONSE_STATUS.NO_MEALS })
        }

        const result = snapshot.docs[0]
        // update all other pending meals to MealStatus.Rejected
        snapshot.docs.forEach(async (doc) => {
            if (doc.id !== result.id) {
                await updateDoc(doc.ref, { status: MealStatus.REJECTED })
            }
        })

        // update machine status to BUSY
        await updateDoc(doc(database, 'machine', 'machineStatus'), { status: MachineStatus.BUSY })
        const { group, foodQuantity } = result.data()

        return res.status(200).json({ 
            id: result.id,
            status: RESPONSE_STATUS.SUCESS,
            group,
            foodQuantity: foodQuantity || DEFAULT_FOOD_QUANTITY,
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err })
    })
}
