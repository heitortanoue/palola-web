import { MealGroupObject } from "../utils/types";
import moment from "moment";
import 'moment/locale/pt-br'
import { mealGroupToString, mealCardByTypeObject, portionToLabel } from "../utils/mealsTranslation";
import WhiteCardTopBorder from "./gereral/whiteCardTopBorder";
import Link from "next/link";
import { timestampToDate } from "../utils/firebaseFunctions";

export default function MealGroupCard ({ mealGroup } : { mealGroup: MealGroupObject }) {
    const { disabled, id, name, date, lastDate, foodQuantity } = mealGroup
    moment.locale("pt-br")

    const { icon, color } = mealCardByTypeObject(name)

    let day = "Hoje"
    const nextTime = moment().set({ hour: date.hours, minute: date.minutes })
    const timeString = nextTime.format("HH:mm")
    if (
        nextTime.isBefore(moment()) ||
        nextTime.isSame(moment(timestampToDate(lastDate)), 'day')
    ) {
        nextTime.add(1, "day")
        day = "Amanhã"
    }

    return (
        <Link href={`/editar-refeicao?id=${id}`} passHref>
        <WhiteCardTopBorder color={color} className="cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="rounded-md h-10 w-10 flex" style={{ backgroundColor: color }}>
                        <i className={`fa-solid fa-${icon} text-2xl m-auto text-white`}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold">
                            { mealGroupToString(name) }
                        </div>
                        <div className="flex gap-x-3 gap-y-1 text-gray-light font-medium
                        items-center text-xs">
                            <div className="flex gap-x-1.5">
                                <i className="fa-regular fa-clock"/>
                                <span>{timeString}</span>
                            </div>
                            <div className="flex gap-x-1.5">
                                <i className="fa-solid fa-utensils"/>
                                <span>{portionToLabel(foodQuantity)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <i className="fa-solid fa-arrow-right"/>
                </div>    
            </div>
            <div className={`${disabled ? "bg-red-light" : "bg-green-light"}
            mt-3 w-full rounded-md py-1.5 px-5 text-xs`}>
                <div className="flex gap-3 items-center">
                    <i className={`${disabled ? "text-red fa-power-off" : "text-green fa-calendar"} fa-solid`}/>
                    <div>
                        {disabled ? 
                            <span className="text-red font-medium">Desativado</span>
                        : 
                            <span>{day}, {nextTime.fromNow()}</span>
                        }
                    </div>
                </div>
            </div>       
        </WhiteCardTopBorder>
        </Link>
    )
}