import axios from "axios";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { NextApiRequest } from "next";
import { database } from "../firebaseConfig";
import { checkMealInterval } from "../firebaseFunctions";
import { getNextMeal } from "../mealsTranslation";
import { MealGroupObject } from "../types";
import absoluteUrl from "next-absolute-url";

interface ReturnType {
    createdMeal: boolean;
    id?: string;
    group?: string;
}

export default async function createMealGroupsPending(req : NextApiRequest) : Promise<ReturnType> {
    const URL = `${absoluteUrl(req).origin}/api/`

    const mealGroupsResult = await axios.get(URL + "mealgroups", {
        headers: {
            "Authorization": process.env.ARDUINO_AUTH_KEY
        }
    })

    if (mealGroupsResult.data.mealsCount === 0) {
        return {
            createdMeal: false,
        }
    }

    const mealGroups: MealGroupObject[] = mealGroupsResult?.data.meals
    const currentMealGroup = getNextMeal(mealGroups)

    // check if lastDate is not today
    if (checkMealInterval(currentMealGroup)) {
        const creationResult = await axios.post(URL + "startmeal", {
            mealName: currentMealGroup.name,
        }, {
            headers: {
                "Authorization": process.env.ARDUINO_AUTH_KEY
            }
        }).then((res) => res.data.id)
        .catch((err) => {
            console.log(err)
            return false
        })

        // update lastDate to today on groups colelction
        await updateDoc(doc(database, "groups", currentMealGroup.id), {
            lastDate: Timestamp.now(),
        })

        return {
            createdMeal: true,
            id: creationResult,
            group: currentMealGroup.name,
        }
    }
    
    return {
        createdMeal: false,
    }
}