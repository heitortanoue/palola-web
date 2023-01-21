import { MealGroupObject } from "../utils/types";
import moment from "moment";
import 'moment/locale/pt-br'
import { mealGroupToString, mealCardByTypeObject } from "../utils/mealsTranslation";
import WhiteCardTopBorder from "./gereral/whiteCardTopBorder";
import Link from "next/link";
import { timestampToDate } from "../utils/firebaseFunctions";

export default function MealGroupCard ({ mealGroup } : { mealGroup: MealGroupObject }) {
    const { disabled, id, name, date, lastDate } = mealGroup
    moment.locale("pt-br")

    const { icon, color } = mealCardByTypeObject(name)
    const timeString = date.hours + "h" + date.minutes
    let day = "Hoje"
    const nextTime = moment().set({ hour: date.hours, minute: date.minutes })
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
                    <div>
                        <div className="font-semibold">{ mealGroupToString(name) }</div>
                        <div className="font-medium text-sm">
                            Diariamente, {timeString}
                        </div>
                    </div>
                </div>
                <div>
                    <i className="fa-solid fa-arrow-right"/>
                </div>    
            </div>
            <div className={`${disabled ? "bg-red-light" : "bg-green-light"}
            mt-3 w-full rounded-md py-1.5 px-5 flex justify-between text-xs items-center`}>
                <div className="flex gap-3 items-center">
                    <i className={`${disabled ? "text-red fa-power-off" : "text-green fa-clock"} fa-solid`}/>
                    <div>
                        {disabled ? 
                            <span className="text-red font-medium">Desativado</span>
                        : 
                            <span>{day}, {nextTime.fromNow()}</span>
                        }
                    </div>
                </div>
                <div>
                    {disabled ? "" : timeString}
                </div>
            </div>       
        </WhiteCardTopBorder>
        </Link>
    )
}