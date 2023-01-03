import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Layout from "../components/gereral/layout";
import { database } from "../utils/firebaseConfig";
import { Meal } from "../utils/types";
import LoggedRedirect from "../components/loggedRedirect";
import { textStyles } from "../styles/styles";
import LastMealsCard from "../components/lastMealsCard";

export async function getServerSideProps() {
    const meals = await getDocs(query(collection(database, "meals"), orderBy("date", "desc"), limit(25)))
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

    return ({
        props: {
            mealsJSON: null || JSON.stringify(mealsData),
        }
    })
}

export default function UltimasRefeicoes ({ mealsJSON } : { mealsJSON: string }) {
    const meals = JSON.parse(mealsJSON) as Meal[]

    return (
        <>
            <LoggedRedirect/>
            <Layout>
                <div className="mt-5">
                    <h1 className={textStyles.h1}>
                        Ultimas refeições
                    </h1>
                    <p>Histórico das 25 últimas refeições registradas.</p>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                        {meals.map((meal) => {
                            return (
                                <LastMealsCard meal={meal} key={meal.id}/>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </>
    )
}