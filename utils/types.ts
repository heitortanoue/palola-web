import { Timestamp } from "firebase/firestore";

export enum MealStatus {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    ALREADY_FULL = 3
}

export enum MachineStatus {
    FREE = 0,
    BUSY = 1,
}

export enum MealGroup {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
    MANUAL = "manual"
}

export interface Meal {
    id?: string;
    group: MealGroup;
    date: Date;
    status: MealStatus;
    foodQuantity: number;
}

export interface MealGroupObject {
    id: string,
    name: MealGroup,
    date: {
        hours: number,
        minutes: number
    }
    foodQuantity: number,
    lastDate: Timestamp,
    disabled: boolean,
}

export interface MachineStatusObject {
    lastUpdate: Date,
    status: MachineStatus,
}

export interface mealWeight {
    max: number,
    current: number,
    tare: number,
}

export enum RESPONSE_STATUS {
    NO_MEALS = "no-meals",
    SUCESS = "sucess",
    ERROR = "error"
}