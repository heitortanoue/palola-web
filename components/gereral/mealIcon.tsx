import { mealCardByTypeObject } from "../../utils/mealsTranslation"

export default function MealIcon ({ groupName, size, iconSize} : { groupName : string, size ?: number, iconSize ?: string}) {
    const { icon, color } = mealCardByTypeObject(groupName)
    const nsize = size ? size * 0.25 : 2.5
    const niconSize = iconSize || "2xl"
    return (
        <div className={`flex rounded-md`}
        style={{ backgroundColor: color, width: nsize + "rem", height: nsize + "rem" }}>
            <i className={`fa-solid text-white fa-${icon} m-auto text-${niconSize}`}/>
        </div>
    )

}