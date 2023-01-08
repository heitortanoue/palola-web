import axios from "axios";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { NextApiRequest } from "next";

export default async function createMealGroupsPending(req : NextApiRequest) {
    console.log(req.headers["x-forwarded-proto"], req.socket)
    const proto =
    req.headers["x-forwarded-proto"] || req.socket
      ? "https"
      : "http";

    const URL = proto + "://" + req.headers.host + "/api/"

    const mealGroupsResult = await axios.get(URL + "mealgroups", {
        headers: {
            "Authorization": process.env.ARDUINO_AUTH_KEY
        }
    })

    if (mealGroupsResult.data.mealsCount === 0) {
        return false
    }

    const mealGroups = mealGroupsResult.data.meals

    // filter mealGroups with the current date
    const currentMealGroups = mealGroups.filter((mealGroup: any) => {
        const timestamp = mealGroup.lastDate as Timestamp
        // new Date(weightData.lastUpdate.seconds * 1000)
        const timestampDate = moment(new Date(timestamp.seconds * 1000))

        return (
            timestampDate.isBefore(moment()) &&
            timestampDate.isAfter(moment().subtract(1, "day"))
        )
    }).sort((a: any, b: any) => {
        const aDate = (a.lastDate as Timestamp).seconds * 1000
        const bDate = (b.lastDate as Timestamp).seconds * 1000

        return moment(aDate).isBefore(moment(bDate)) ? -1 : 1
    })

    if (currentMealGroups.length === 0) {
        return false
    }

    const currentMealGroup = currentMealGroups[0]

    await axios.post(URL + "startmeal", {
        mealName: currentMealGroup.name,
    })
    
    return true
}