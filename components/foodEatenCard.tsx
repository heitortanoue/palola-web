import moment from "moment";
import { Meal, MealGroupObject } from "../utils/types";
import WhiteCard from "./gereral/whiteCard";

export default function FoodEatenCard ({ meals, mealGroups } :
    { meals: Meal[], mealGroups: MealGroupObject[] }) {

    const today = moment()
    const todayMealsFoodEaten = meals.length !== 0 ? meals.filter((meal) => {
        return moment(meal.date).isSame(today, "day")
    }).reduce((acc, meal) => {
        return acc + meal.foodQuantity
    }, 0) : 0
    const totalFoodToBeEatenToday = mealGroups.length !== 0 ? mealGroups.reduce((acc, mealGroup) => {
        return acc + mealGroup.foodQuantity
    }, 0) : 0
    const percentage = totalFoodToBeEatenToday !== 0 ? 
        ((todayMealsFoodEaten / totalFoodToBeEatenToday) * 100)
    : 0

    return (
        <WhiteCard>
            <div className="mb-2 font-medium text-sm flex justify-between">
                <div>
                    Xícaras de comida (hoje)
                </div>
                <div>
                    {Math.round(percentage)}%
                </div>
            </div>
            <div className="w-full bg-gray-lighter rounded-full h-2 mb-1.5">
                <div className="bg-primary h-2 rounded-full relative font-medium text-xs"
                style={{width: `${Math.min(percentage, 100)}%`}}>
                    <div className="absolute inset-y-0 m-auto right-0 w-5 h-5
                     rounded-full bg-white border-2 flex border-primary">
                        <i className="fa-solid fa-paw text-primary-dark m-auto"/>
                    </div>

                    <div className="absolute inset-y-0 m-auto right-[0.15rem] text-gray mt-4">
                        {todayMealsFoodEaten}
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-xs text-gray-light relative">
                <div>
                    0
                </div>
                <div>
                    {percentage < 95 ? totalFoodToBeEatenToday : ""}
                </div>
            </div>
        </WhiteCard>
    )
}