import { database } from "../utils/firebaseConfig"
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";

import Layout from "../components/gereral/layout";
import { buttonStyles, inputStyles, textStyles } from "../styles/styles";
import { GetServerSidePropsContext } from "next";
import { MealGroupObject } from "../utils/types";
import { mealGroupToString, mealCardByTypeObject } from "../utils/mealsTranslation";

import MealIcon from "../components/gereral/mealIcon";
import WhiteCard from "../components/gereral/whiteCard";
import Button from "../components/gereral/button";
import { useState } from "react";
import { useAlert } from "react-alert"

export async function getServerSideProps( context : GetServerSidePropsContext ) {
    const queries = context.query
    const id = queries.id as string
    // query id in groups collection
    const docRef = doc(database, "groups", id)
    const mealGroup = await getDoc(docRef) as any
    const mealGroupData = mealGroup.data()
    mealGroupData.id = mealGroup.id as string

    return ({
        props: {
            mealGroupJSON: JSON.stringify(mealGroupData)
        }
    })
}


export default function EditarRefeicao({ mealGroupJSON } : { mealGroupJSON: string }) {
    const mealGroup = JSON.parse(mealGroupJSON) as MealGroupObject
    const [timeState, setTimeState] = useState({
        hours: mealGroup.date.hours,
        minutes: mealGroup.date.minutes
    }) as any
    const hourString = timeState.hours + ":" + timeState.minutes
    const alert = useAlert()

    const changeFunction = (e : any) => {
        // const time = e.target.time.value
        const time = e.target.value
        const timeArray = time.split(":")

        const hours = timeArray[0]
        const minutes = timeArray[1]

        setTimeState({
            hours: hours,
            minutes: minutes
        })
    }

    const submitFunction = async (e : any) => {
        // e.preventDefault()

        const refDoc = doc(database, "groups", mealGroup.id)
        await updateDoc(refDoc, {
            date: {
                hours: timeState.hours,
                minutes: timeState.minutes
            }
        }).then(() => {
            alert.success("Refeição editada com sucesso!")
        }).catch((error) => {
            alert.error("Erro ao editar refeição")
        })
    }
        

    return (
        <Layout>
            <div>
                <h1 className={textStyles.h1}>
                    Editando refeição
                </h1>
                <WhiteCard className="flex gap-3 my-5 items-center">
                    <MealIcon size={13} groupName={mealGroup.name}/>
                    <div className="">
                        <h2 className={textStyles.h2 + " !m-0"}>
                            {mealGroupToString(mealGroup.name)}
                        </h2>
                        <div className="">
                            Diariamente, {hourString}
                        </div>
                    </div>
                </WhiteCard>
                <div>
                    <div className="flex flex-col">
                        <label htmlFor="time" className="text-gray text-sm mb-1">
                            Hora da refeição
                        </label>
                        <input type="time" name="time" id="time" value={hourString}
                        className={inputStyles.time} onChange={changeFunction}/>
                    </div>

                    <Button style={buttonStyles.primary + " !mt-5"}
                    onClick={submitFunction}>
                        Editar refeição
                    </Button>
                </div>
            </div>
        </Layout>
    )
}