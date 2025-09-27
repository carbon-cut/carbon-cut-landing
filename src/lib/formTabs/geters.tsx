import { TabValues } from "./types";
import { Car, Zap, UtensilsCrossed, Trash2, Plane } from "lucide-react";

export const getColor = (tab: TabValues | string) => {
    switch (tab) {
        case "transport":
            return "#00A261";
        case "food":
            return "#003A52";
        case "vacation":
            return "#004DC2";
        case "energie":
            return "#FF6034";
        case "waste":
            return "#CC552A";
    }
}

export const getName = (tab: TabValues | string) => {
    switch (tab) {
        case "transport":
            return "Transport";
        case "food":
            return "Food";
        case "vacation":
            return "Vacation";
        case "energie": 
            return "Energy";
        case "waste":
            return "Waste";
        default:
            return "Error";
    }
}

export const getIcon = (tab: TabValues | string) => {
    switch (tab) {
        case "transport":
            return Car;
        case "food":
            return UtensilsCrossed;
        case "vacation":
            return Plane;
        case "energie":
            return Zap;
        case "waste":
            return Trash2;
            default:
                return Car;
    }
}

export const getIndex = (tab: TabValues | string) => {
    switch (tab) {
        case "transport":
            return 0;
        case "food":
            return 2;
        case "vacation":
            return 4;
        case "energie":
            return 1;
        case "waste":
            return 3;
        default:
            return 0;
    }
}