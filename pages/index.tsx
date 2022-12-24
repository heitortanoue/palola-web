import Head from "next/head";
import { database } from "../utils/firebaseConfig"
import { Meal, MealGroup, MealGroupObject, mealWeight } from "../utils/types";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import NextMealCard from "../components/nextMealCard";
import MealGroupCard from "../components/mealGroupCard";
import LastMealsCard from "../components/lastMealsCard";
import FillBowlCard from "../components/fillBowlCard";

import moment from "moment";
import "moment/locale/pt-br"
import { getNextMeal } from "../utils/mealsTranslation";

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

    const weightQuery = await getDocs(query(collection(database, "weight")))
    const weightData = weightQuery.docs.map((weight) => {
        return {
            id: weight.id,
            ...weight.data()
        } as any
    }).map((meal) => {
        return {
            ...meal,
            lastUpdate: new Date(meal.lastUpdate.seconds * 1000)
        } as mealWeight
    })[0]

    return ({
        props: {
            mealsJSON: JSON.stringify(mealsData),
            mealsGroupJSON: JSON.stringify(mealsGroupData),
            weightJSON: JSON.stringify(weightData)
        }
    })
}

export default function Home({ mealsJSON, mealsGroupJSON, weightJSON } :
    { mealsJSON: string, mealsGroupJSON: string, weightJSON: string }) {
    const meals = JSON.parse(mealsJSON) as Meal[]
    const mealsGroup = JSON.parse(mealsGroupJSON) as MealGroupObject[]
    const weight = JSON.parse(weightJSON) as mealWeight

    moment.locale("pt-br")

    return (
        <>
        <Head>
            <title>Palola - Alimente seu cão</title>
            <link rel="icon" href="/icon.png" />
        </Head>

        <div className="bg-background text-black">
            <div className="w-full">
                <div className="relative overflow-hidden">
                    <div className="bg-primary flex justify-center items-center pt-7 pb-16 
                    text-white text-xl font-bold">
                        Palola ©
                    </div>
                    <div className="absolute w-[100vw] scale-x-[2.5] bg-background
                    inset-x-0 mx-auto rounded-full top-20 h-[100vw]"/>
                </div>
            </div>
            <main className="z-[1] p-6 flex flex-col gap-10 pb-20">
                <section>
                    <h1 className="font-bold text-xl mb-3">
                        Como a Lola está?
                    </h1>
                        <FillBowlCard mealWeight={weight}/>
                </section>
                <section>
                    <h1 className="font-bold text-xl mb-3">
                        Próxima refeição
                    </h1>
                    <NextMealCard meal={getNextMeal(mealsGroup)}/>
                </section>
                <section>
                    <h2 className="font-bold text-xl mb-3">
                        Grupos de refeições
                    </h2>
                    <div className="flex flex-col gap-3">
                        {
                            mealsGroup.map(gp => <MealGroupCard mealGroup={gp} key={gp.id}/>)
                        }
                    </div>
                </section>
                <section>
                    <h2 className="font-bold text-xl mb-3">
                        Últimas refeições
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {
                            meals.map((meal) => {
                                return (
                                    <LastMealsCard meal={meal} key={meal.id}/>
                                )
                            })
                        }
                    </div>
                </section>
            </main>
        </div>
        </>
    );
}
