// funcao que busca por refeicoes pendentes ( a mais antiga ), a coloca como sucesso

import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MealStatus } from '../../utils/types'

export default async function mealgroups (req: NextApiRequest, res: NextApiResponse) {
    const col = collection(database, 'groups')
    const myQuery = query(col, orderBy("date.hours", "asc"))
    const snapshot = await getDocs(myQuery)


    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    if (snapshot.empty) {
        return res.status(200).json({ mealsCount: 0 })
    }

    // get meals id and data
    const meals = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    res.status(200).json({ mealsCount: snapshot.docs.length, meals })
}
