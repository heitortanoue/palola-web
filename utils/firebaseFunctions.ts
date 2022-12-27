import { Meal } from "./types";
import { database } from "./firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export async function addMeal (meal : Meal) {
    const col = collection(database, "meals")
    const { id: mealId } = await addDoc(col, meal);

    return
}