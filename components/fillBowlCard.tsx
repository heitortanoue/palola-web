import moment from "moment"
import { mealWeight } from "../utils/types"
import WhiteCard from "./gereral/whiteCard"
import Image from "next/image"

export default function FillBowlCard ({ mealWeight } : { mealWeight: mealWeight }) {
    const weightPercentage = Math.round((mealWeight.current - mealWeight.tare)/mealWeight.max * 100)
    const weightDate = moment(mealWeight.lastUpdate)

    return (
        <WhiteCard className="relative pt-16 mt-12">
            <div>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130}
                className="absolute inset-x-0 mx-auto -top-10"/>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130}
                className="absolute inset-x-0 mx-auto -top-10 grayscale z-[1]"
                style={{ clip: `rect(0px,130px,${100 - weightPercentage}px,0px)` }}/>
            </div>

            <div className="text-lg text-center font-semibold mb-4">
                Tigela em {weightPercentage}%
            </div>
            <button className="py-2 bg-primary-dark w-full rounded-full text-white text-sm font-semibold">
                Abastecer tigela
            </button>
            <p className="text-center text-xs text-gray mt-2">
                Atualizado {weightDate.fromNow()}
            </p>
        </WhiteCard>
    )
}