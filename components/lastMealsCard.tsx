import { Meal } from "../utils/types";
import moment from "moment";
import 'moment/locale/pt-br'
import { mealGroupToString, mealCardByTypeObject, mealStatusToString } from "../utils/mealsTranslation";
import WhiteCard from "./gereral/whiteCard";

export default function LastMealsCard ({ meal } : { meal: Meal }) {
    moment.locale("pt-br")
    const refeicaoMoment = moment(meal.date)
    const { icon, color } = mealCardByTypeObject(meal.group)
    const { text: statusText, color: statusColor, bgColor: statusBg } = mealStatusToString(meal.status)

    return (
        <WhiteCard className={"!pb-0 !px-0"}>
            <div className="px-5">
                <div className={`h-9 w-9 rounded-md flex mb-1`} style={{ backgroundColor: color }}>
                    <i className={`fa-solid fa-${icon} text-white text-xl m-auto`}/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{mealGroupToString(meal.group)}</span>
                    <span className="text-xs text-gray">{refeicaoMoment.fromNow()}</span>
                </div>
            </div>
            <div style={{ backgroundColor: statusBg }}
            className="rounded-b-lg py-2 px-5 mt-3 flex items-center gap-2">
                <div style={{ backgroundColor: statusColor }} className="rounded-full w-2 h-2"/>
                <div style={{ color: statusColor }} className="text-xs font-medium">{statusText}</div>
            </div>
        </WhiteCard>
    )
}