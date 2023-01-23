import { Meal } from "../utils/types";
import moment from "moment";
import 'moment/locale/pt-br'
import { mealGroupToString, mealCardByTypeObject, mealStatusToString, portionToLabel } from "../utils/mealsTranslation";
import WhiteCard from "./gereral/whiteCard";

export default function LastMealsCard ({ meal } : { meal: Meal }) {
    moment.locale("pt-br")
    const refeicaoMoment = moment(meal.date)
    const { icon, color } = mealCardByTypeObject(meal.group)
    const { text: statusText, color: statusColor, bgColor: statusBg } = mealStatusToString(meal.status)

    return (
        <WhiteCard className={"!pb-0 !px-0 flex flex-col justify-between"}>
            <div className="px-5 flex gap-3 mb-2">
                <div className={`h-9 w-9 rounded-md flex mb-1`} style={{ backgroundColor: color }}>
                    <i className={`fa-solid fa-${icon} text-white text-xl m-auto`}/>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{mealGroupToString(meal.group)}</span>
                    <span className="text-xs text-gray">{refeicaoMoment.fromNow()}</span>
                </div>
            </div>
            <div className="px-5">
                <div className="flex flex-wrap gap-x-3 gap-y-1
                text-gray-light text-xs items-center">
                    <div className="flex gap-2">
                        <i className="fa-solid fa-clock"/>
                        <div>{refeicaoMoment.format("HH:mm")}</div>
                    </div>
                    {
                        meal.foodQuantity ?
                            <>
                            <div className="flex gap-2 ">
                                <i className="fa-solid fa-utensils"/>
                                <div>{portionToLabel(meal.foodQuantity)}</div>
                            </div>
                            </>
                        : null
                    }
                </div>
            </div>
            <div style={{ backgroundColor: statusBg }}
            className="rounded-b-lg py-2 px-5 flex items-center gap-2 mt-3">
                <div style={{ backgroundColor: statusColor }} className="rounded-full w-2 h-2"/>
                <div style={{ color: statusColor }} className="text-xs font-medium">{statusText}</div>
            </div>
        </WhiteCard>
    )
}