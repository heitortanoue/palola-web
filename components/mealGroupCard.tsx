import { MealGroupObject } from "../utils/types";
import moment from "moment";
import 'moment/locale/pt-br'
import { mealGroupToString, mealCardByTypeObject } from "../utils/mealsTranslation";
import WhiteCardTopBorder from "./gereral/whiteCardTopBorder";
import Link from "next/link";
import { timestampToDate } from "../utils/firebaseFunctions";

export default function MealGroupCard ({ mealGroup } : { mealGroup: MealGroupObject }) {
    moment.locale("pt-br")
    const { icon, color } = mealCardByTypeObject(mealGroup.name)
    const timeString = mealGroup.date.hours + "h" + mealGroup.date.minutes
    let day = "Hoje"
    const nextTime = moment().set({ hour: mealGroup.date.hours, minute: mealGroup.date.minutes })
    if (
        nextTime.isBefore(moment()) ||
        nextTime.isSame(moment(timestampToDate(mealGroup.lastDate)), 'day')
    ) {
        nextTime.add(1, "day")
        day = "Amanhã"
    }

    return (
        <Link href={`/editar-refeicao?id=${mealGroup.id}`} passHref>
        <WhiteCardTopBorder color={color} className="cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="rounded-md h-10 w-10 flex" style={{ backgroundColor: color }}>
                        <i className={`fa-solid fa-${icon} text-2xl m-auto text-white`}/>
                    </div>
                    <div>
                        <div className="font-semibold">{ mealGroupToString(mealGroup.name) }</div>
                        <div className="font-medium text-sm">
                            Diariamente, {timeString}
                        </div>
                    </div>
                </div>
                <div>
                    <i className="fa-solid fa-arrow-right"/>
                </div>    
            </div>
            <div className="mt-3 w-full rounded-md bg-green-light py-1.5 px-5
            flex justify-between text-xs items-center">
                <div className="flex gap-3 items-center">
                    <i className="fa-solid fa-clock text-green"/>
                    <div>
                        {day}, {nextTime.fromNow()}
                    </div>
                </div>
                <div>
                    {timeString}
                </div>
            </div>       
        </WhiteCardTopBorder>
        </Link>
    )
}