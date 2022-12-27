import moment from "moment"
import { Meal, MealGroup, MealStatus, mealWeight } from "../utils/types"
import WhiteCard from "./gereral/whiteCard"
import Image from "next/image"
import { buttonStyles } from "../styles/styles"
import Button from "./gereral/button"
import { addMeal } from "../utils/firebaseFunctions"
import { useAlert } from "@blaumaus/react-alert"
import axios from "axios"

export default function FillBowlCard ({ mealWeight } : { mealWeight: mealWeight }) {
    const weightPercentage = Math.round((mealWeight.current - mealWeight.tare)/mealWeight.max * 100)
    const weightDate = moment(mealWeight.lastUpdate)
    const alert = useAlert()

    const fillFunction = async () => {
        const newMeal = {
            group: MealGroup.MANUAL,
            date: (new Date),
            status: MealStatus.PENDING
        } as Meal
        await addMeal(newMeal).then(() => {
            alert.success("Requisição enviada com sucesso")
        }).catch(() => {
            alert.error("Erro ao enviar requisição")
        })
    }
    async function postFeed () {
        await axios.post("/api/feed", {})
    }

    return (
        <WhiteCard className="relative pt-16 mt-12">
            <div>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130}
                className="absolute inset-x-0 mx-auto -top-10" priority/>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130} priority
                className="absolute inset-x-0 mx-auto -top-10 grayscale z-[1]"
                style={{ clip: `rect(0px,130px,${100 - weightPercentage}px,0px)` }}/>
            </div>

            <div className="text-lg text-center font-semibold mb-4">
                Tigela em {weightPercentage}%
            </div>
            <Button style={buttonStyles.primary} onClick={fillFunction}>
                Abastecer tigela
            </Button>
            <p className="text-center text-xs text-gray mt-2">
                Atualizado {weightDate.fromNow()}
            </p>
        </WhiteCard>
    )
}