// funcao que busca por refeicoes pendentes ( a mais antiga ), a coloca como sucesso

import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../utils/firebaseConfig'
import { MealStatus } from '../../utils/types'
// import { token}

export default async function feed (req: NextApiRequest, res: NextApiResponse) {
    const col = collection(database, 'meals')
    const myQuery = query(col, where('status', '==', MealStatus.PENDING), orderBy('date', 'desc'), limit(1))
    const snapshot = await getDocs(myQuery)

    if (snapshot.empty) {
        res.status(400).json({ message: "no meals found" })
    }

    const meal = snapshot.docs.map(doc => doc.id)[0]
    await updateDoc(doc(database, 'meals', meal), { status: MealStatus.ACCEPTED }).then(() => {
        res.status(200).json({ message: "success" })
    }).catch((err) => {
        res.status(400).json({ message: err })
    })
}
