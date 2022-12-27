import moment from "moment";
import { MealStatus, MealGroup, Meal, MealGroupObject, MachineStatus } from "./types";
const COLORS = require("./colors");

export function mealStatusToString(status: MealStatus) {
    switch (status) {
        case MealStatus.PENDING:
            return {
                text: "Pendente",
                color: COLORS.yellow,
                bgColor: COLORS.yellowLight
            };
        case MealStatus.ACCEPTED:
            return {
                text: "Aceito",
                color: COLORS.green,
                bgColor: COLORS.greenLight
            }
        case MealStatus.REJECTED:
            return {
                text: "Rejeitado",
                color: COLORS.red,
                bgColor: COLORS.redLight
            }
        case MealStatus.ALREADY_FULL:
            return {
                text: "Tigela cheia",
                color: COLORS.blue,
                bgColor: COLORS.blueLight
            }
        default:
            return {
                text: "Erro",
                color: COLORS.gray,
                bgColor: "#f5f5f5"
            };
    }
}

export function machineStatusToObject (status: MachineStatus) {
    switch (status) {
        case MachineStatus.FREE:
            return {
                text: "livre",
                icon: "check",
                color: COLORS.green,
                bgColor: COLORS.greenLight
            }
        case MachineStatus.BUSY:
            return {
                text: "ocupada",
                icon: "arrows-rotate",
                color: COLORS.yellow,
                bgColor: COLORS.yellowLight
            }
        default:
            return {
                text: "Erro",
                icon: "x",
                color: COLORS.gray,
                bgColor: "#f5f5f5"
            };
    }
}

export function mealCardByTypeObject (mealGp: string) {
    switch (mealGp) {
        case MealGroup.BREAKFAST:
            return ({
                icon: "cloud-sun",
                color: COLORS.primary
            })
        case MealGroup.LUNCH:
            return ({
                icon: "sun",
                color: COLORS.secondary
            })
        case MealGroup.DINNER:
            return ({
                icon: "moon",
                color: COLORS.tertiary
            })
        case MealGroup.MANUAL:
            return ({
                icon: "bowl-food",
                color: COLORS.gray
            })
        default:
            return ({
                icon: "x",
                color: COLORS.gray
            })
    }
}

export function mealGroupToString(group: MealGroup): string {
    switch (group) {
        case MealGroup.BREAKFAST:
            return "Café da manhã";
        case MealGroup.LUNCH:
            return "Almoço";
        case MealGroup.DINNER:
            return "Jantar";
        case MealGroup.MANUAL:
            return "Manual"
        default:
            return "Erro";
    }
}

export function getNextMeal ( mealsGroups : MealGroupObject[] ) : MealGroupObject {
  // Get the current time
  const currentTime = moment();
  let nextMeal: MealGroupObject | undefined;

  // Iterate through the mealsGroups array
  for (const meal of mealsGroups) {
    // Check if the meal's time has passed the current time
    const mealTime = moment().hour(meal.date.hours).minute(meal.date.minutes);
    if (mealTime.isAfter(currentTime)) {
      // If the meal's time is after the current time, set it as the next meal
      nextMeal = meal;
      break;
    }
  }

  // If a next meal was found, return it. Otherwise, return the first meal in the array.
  return nextMeal || mealsGroups[0];
}