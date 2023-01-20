// funcao que busca por refeicoes pendentes ( a mais antiga ), a coloca como sucesso

import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { authenticateArduino } from '../../utils/server/authenticateArduino'
import { MealStatus, RESPONSE_STATUS } from '../../utils/types'

export default async function mealgroups (req: NextApiRequest, res: NextApiResponse) {
    if (!authenticateArduino(req)) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    const col = collection(database, 'groups')
    const myQuery = query(col, orderBy("date.hours", "asc"))
    
    return await getDocs(myQuery).then(snapshot => {
        if (snapshot.empty) {
            return res.status(200).json({ status: RESPONSE_STATUS.SUCESS, mealsCount: 0 })
        }

        const meals = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.status(200).json({ status: RESPONSE_STATUS.SUCESS, mealsCount: snapshot.docs.length, meals })
    }).catch((err) => {
        console.log(err)
        res.status(400).json({ status: RESPONSE_STATUS.ERROR, message: err })
    })
}
