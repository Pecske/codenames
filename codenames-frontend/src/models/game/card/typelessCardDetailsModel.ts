import {WordDetailModel} from "@/models/game/card/wordDetailModel";

export interface TypelessCardDetailsModel {
    id:number,
    word:WordDetailModel,
    isFound:boolean,
}