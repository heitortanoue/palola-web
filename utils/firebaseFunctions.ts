import { Meal, MealGroupObject } from "./types";
import { database } from "./firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import moment from "moment";
import { MEAL_INTERVAL } from "./settings";

export async function addMeal (meal : Meal) {
    const col = collection(database, "meals")
    const { id: mealId } = await addDoc(col, meal);

    return
}

export const timestampToDate = (timestamp: Timestamp) => {
    return new Date(timestamp.seconds * 1000)
}

export const dateToTimestamp = (date: Date) => {
    return Timestamp.fromDate(date)
}

export const mealGroupDateToDate = (mealGroup: MealGroupObject) => {
    return moment().set({
        hour: mealGroup.date.hours,
        minute: mealGroup.date.minutes,
        second: 0,
        millisecond: 0
    }).toDate()
}

export const checkMealInterval = (mealGroup : MealGroupObject) => {
    const mealGroupDate = mealGroupDateToDate(mealGroup)
    const now = moment()
    const diff = now.diff(mealGroupDate, "minutes")

    return Math.abs(diff) <= MEAL_INTERVAL
}