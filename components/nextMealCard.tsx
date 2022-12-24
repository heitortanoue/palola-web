import { Meal, MealGroupObject } from "../utils/types";
import WhiteCardTopBorder from "./gereral/whiteCardTopBorder";
import { mealCardByTypeObject, mealGroupToString } from "../utils/mealsTranslation";
import { addOpacityHex } from "../utils/colorFunctions";
import moment from "moment";

export default function NextMealCard ({ meal } : { meal: MealGroupObject }) {
    const { icon, color } = mealCardByTypeObject(meal.name)
    const dateString = moment(meal.date).fromNow()
    // turn first letter of string to uppercase
    const dateStringCapitalized = dateString.charAt(0).toUpperCase() + dateString.slice(1)

    return (
        <WhiteCardTopBorder bgColor={addOpacityHex(color, 0.2)} color={color}
        className="flex gap-4 justify-center items-center">
            <div className={`h-10 w-10 rounded-md flex shadow-sm`} style={{ backgroundColor: color }}>
                <i className={`fa-solid fa-${icon} text-white text-2xl m-auto`}/>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{mealGroupToString(meal.name)}</span>
                <span className="text-sm font-medium">{dateStringCapitalized}</span>
            </div>
        </WhiteCardTopBorder>
    )
}