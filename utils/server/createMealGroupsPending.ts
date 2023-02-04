import axios from "axios";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { NextApiRequest } from "next";
import { database } from "../firebaseConfig";
import { checkMealInterval } from "../firebaseFunctions";
import { getNextMeal } from "../mealsTranslation";
import { MealGroupObject } from "../types";
import absoluteUrl from "next-absolute-url";
import { DEFAULT_FOOD_QUANTITY } from "../settings";

interface ReturnType {
    createdMeal: true;
    id: string;
    group: string;
    foodQuantity: number;
}

export default async function createMealGroupsPending(req : NextApiRequest) : Promise<ReturnType | { createdMeal: false }> {
    const URL = `${absoluteUrl(req).origin}/api/`

    const mealGroupsResult = await axios.get(URL + "mealgroups", {
        headers: {
            "authorization": process.env.ARDUINO_AUTH_KEY
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
            foodQuantity: currentMealGroup.foodQuantity || DEFAULT_FOOD_QUANTITY,
        }, {
            headers: {
                "authorization": process.env.ARDUINO_AUTH_KEY
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
            foodQuantity: currentMealGroup.foodQuantity || DEFAULT_FOOD_QUANTITY,
        }
    }
    
    return {
        createdMeal: false,
    }
}