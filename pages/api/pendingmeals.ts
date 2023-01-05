import { collection, doc, getDocs, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MealStatus } from '../../utils/types'

export default async function pendingmeals (req: NextApiRequest, res: NextApiResponse) {
    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    // get all docs with status MealStatus.Pending
    const col = collection(database, 'meals')
    const q = query(col, where('status', '==', MealStatus.PENDING), orderBy("date", "asc"))

    return await getDocs(q)
    .then((snapshot) => {
        if (snapshot.empty) {
            return res.status(200).json({ mealsCount: 0 })
        }

        const result = snapshot.docs.map(el => {
            const { group } = el.data()
            const id = el.id
    
            return { group, id }
        })
        return res.status(200).json({ mealsCount: snapshot.docs.length, meals: result })
    })
    .catch((err) => {
        res.status(400).json({ message: err })
    })
}
