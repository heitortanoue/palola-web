import { database } from "../utils/firebaseConfig"
import { Meal, MealGroupObject, mealWeight } from "../utils/types";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { textStyles } from "../styles/styles"

import NextMealCard from "../components/nextMealCard";
import MealGroupCard from "../components/mealGroupCard";
import LastMealsCard from "../components/lastMealsCard";
import FillBowlCard from "../components/fillBowlCard";

import moment from "moment";
import "moment/locale/pt-br"
import { getNextMeal } from "../utils/mealsTranslation";
import Layout from "../components/gereral/layout";

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
            mealsJSON: null || JSON.stringify(mealsData),
            mealsGroupJSON: null || JSON.stringify(mealsGroupData),
            weightJSON: null || JSON.stringify(weightData)
        }
    })
}

export default function Home({ mealsJSON, mealsGroupJSON, weightJSON } :
    { mealsJSON: string, mealsGroupJSON: string, weightJSON: string }) {

    if (!mealsJSON || !mealsGroupJSON || !weightJSON) {
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

    moment.locale("pt-br")

    return (
        <Layout disableBackButton={true}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <section>
                    <FillBowlCard mealWeight={weight}/>
                </section>
                <section>
                    <h2 className={textStyles.h2 + " mb-3"}>
                        Próxima refeição
                    </h2>
                    <NextMealCard meal={getNextMeal(mealsGroup)}/>
                </section>
            </div>
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
                <h2 className={textStyles.h2 + " mb-3"}>
                    Últimas refeições
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {
                        meals.map((meal) => {
                            return (
                                <LastMealsCard meal={meal} key={meal.id}/>
                            )
                        })
                    }
                </div>
            </section>
        </Layout>
    );
}
