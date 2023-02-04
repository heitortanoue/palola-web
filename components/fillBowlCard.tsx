import moment from "moment"
import { MachineStatus, MachineStatusObject, Meal, MealGroup, MealStatus, mealWeight } from "../utils/types"
import WhiteCard from "./gereral/whiteCard"
import Image from "next/image"
import { buttonStyles } from "../styles/styles"
import Button from "./gereral/button"

import { useAlert } from "@blaumaus/react-alert"
import { useRouter } from "next/router"

import axios from "axios"
import { machineStatusToObject } from "../utils/mealsTranslation"

export default function FillBowlCard ({ mealWeight, machineStatus } :
    { mealWeight: mealWeight, machineStatus: MachineStatusObject }) {
        
    const weightPercentage = Math.round((mealWeight.current - mealWeight.tare)/mealWeight.max * 100)
    const weightDate = moment(machineStatus.lastUpdate)
    const { icon, color, bgColor, text } = machineStatusToObject(machineStatus.status)

    const alert = useAlert()
    const router = useRouter()

    const fillFunction = async () => {
        await axios.post("/api/startmeal", {
            mealName: MealGroup.MANUAL
        }).then(() => {
            alert.success("Requisição enviada com sucesso")
            router.reload()
        }).catch((err) => {
            alert.error(`Erro ao enviar requisição. ${err.response.data?.message}`)
        })
    }

    return (
        <WhiteCard className="relative pt-20 mt-12">
            {/* <div>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130}
                className="absolute inset-x-0 mx-auto -top-10" priority/>
                <Image src="/dogbowl.png" alt="Bowl" width={130} height={130} priority
                className="absolute inset-x-0 mx-auto -top-10 grayscale z-[1]"
                style={{ clip: `rect(0px,130px,${100 - weightPercentage}px,0px)` }}/>
            </div>

            <div className="text-lg text-center font-semibold mb-4">
                Tigela em {weightPercentage}%
            </div> */}

            <div>
                <Image src="/lola.png" alt="Bowl" width={130} height={130}
                className="!drop-shadow-md absolute inset-x-0 mx-auto -top-14" priority/>
            </div>

            <Button style={buttonStyles.basic + " bg-primary-dark"} onClick={fillFunction}>
                Abastecer tigela (1 xícara)
            </Button>
            <p className="text-center text-xs text-gray mt-2">
                Atualizado {weightDate.fromNow()}
            </p>
            <div className="mt-4 flex justify-center">
                <div className="flex gap-3 py-1 px-3 w-fit rounded-md items-center text-sm"
                style={{ color, backgroundColor: bgColor }}>
                    <i className={`fa-solid fa-${icon}`}/>
                    <div className="text-xs font-medium">
                        Máquina {text}
                    </div>
                </div>
            </div>
        </WhiteCard>
    )
}