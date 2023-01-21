import { database } from "../utils/firebaseConfig"
import { MachineStatus, MachineStatusObject, Meal, MealGroupObject, mealWeight } from "../utils/types";
import { collection, getDocs, query, orderBy, limit, getDoc, doc, Timestamp } from "firebase/firestore";
import { textStyles } from "../styles/styles"
import { timestampToDate } from "../utils/firebaseFunctions";

import NextMealCard from "../components/nextMealCard";
import MealGroupCard from "../components/mealGroupCard";
import LastMealsCard from "../components/lastMealsCard";
import FillBowlCard from "../components/fillBowlCard";

import moment from "moment";
import "moment/locale/pt-br"
import { getNextMeal } from "../utils/mealsTranslation";
import Layout from "../components/gereral/layout";
import LoggedRedirect from "../components/loggedRedirect";

import Link from "next/link";
import WhiteCard from "../components/gereral/whiteCard";

export async function getServerSideProps() {
    const meals = await getDocs(query(collection(database, "meals"), orderBy("date", "desc"), limit(4)))
    const mealsData = meals.docs.map((meal) => {
        return {
            id: meal.id,
            ...meal.data()
        } as any
    }).map((meal) => {
        return {
            ...meal,
            date: new Date(meal.date.seconds * 1000)
        } as Meal
    })

    const mealsGroup = await getDocs(query(collection(database, "groups"), orderBy("date.hours", "asc")))
    const mealsGroupData = mealsGroup.docs.map((meal) => {
        return {
            id: meal.id,
            ...meal.data()
        } as MealGroupObject
    })

    const weightQuery = await getDoc(doc(database, "machine", "weightStatus"))
    const weightData = weightQuery.data()

    const machineStatus = await getDoc(doc(database, "machine", "machineStatus"))
    const machineStatusData = machineStatus.data() as any
    machineStatusData.lastUpdate = timestampToDate(machineStatusData.lastUpdate)

    return ({
        props: {
            mealsJSON: null || JSON.stringify(mealsData),
            mealsGroupJSON: null || JSON.stringify(mealsGroupData),
            weightJSON: null || JSON.stringify(weightData),
            machineStatusJSON: null || JSON.stringify(machineStatusData)
        }
    })
}

export default function Home({ mealsJSON, mealsGroupJSON, weightJSON, machineStatusJSON } :
    { mealsJSON: string, mealsGroupJSON: string, weightJSON: string, machineStatusJSON: string }) {

    if (!mealsJSON || !mealsGroupJSON || !weightJSON || !machineStatusJSON) {
        return (
            <Layout disableBackButton={true}>
                <h1 className={textStyles.h1}>
                    Ocorreu um erro, tente novamente.
                </h1>
            </Layout>
        )
    }    
    const meals = JSON.parse(mealsJSON) as Meal[]
    const mealsGroup = JSON.parse(mealsGroupJSON) as MealGroupObject[]
    const weight = JSON.parse(weightJSON) as mealWeight
    const machineStatus = JSON.parse(machineStatusJSON) as MachineStatusObject

    moment.locale("pt-br")

    return (
        <>
        <LoggedRedirect/>
        <Layout disableBackButton={true}>
            <section>
                <FillBowlCard mealWeight={weight} machineStatus={machineStatus}/>
            </section>
            <section>
                <h2 className={textStyles.h2 + " mb-3"}>
                    Próxima refeição
                </h2>
                <NextMealCard meal={getNextMeal(mealsGroup)}/>
            </section>
            <section>
                <h2 className={textStyles.h2 + " mb-3"}>
                    Grupos de refeições
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {
                        mealsGroup.map(gp => <MealGroupCard mealGroup={gp} key={gp.id}/>)
                    }
                </div>
            </section>
            <section>
                <Link href={"/ultimas-refeicoes"} passHref>
                    <div className="flex justify-between items-baseline cursor-pointer">
                        <h2 className={textStyles.h2 + " mb-3"}>
                            Últimas refeições
                        </h2>
                        <i className="fa-solid fa-arrow-right"/>
                    </div>
                </Link>
                {
                    meals.length ?
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {meals.map((meal) => {
                                    return (
                                        <LastMealsCard meal={meal} key={meal.id}/>
                                    )
                                })}
                        </div>
                    :
                        <WhiteCard className="w-full">
                            <h3 className={"italic text-sm"}>
                                Nenhuma refeição registrada :(
                            </h3>
                        </WhiteCard>
                }
            </section>
        </Layout>
        </>
    );
}
