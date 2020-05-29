import {CardDetailsModel} from "@/models/game/card/cardDetailsModel";

export interface GameStateModel {

    id: number,
    board: Array<CardDetailsModel>,
    blueScore: number,
    redScore: number,
    endGame: boolean,
    endTurn: boolean,
    winnerTeam: string,
    gameEndByAssassin: boolean,
    startingTeamColor: string,
    lobbyId?: string,
    civiliansFoundByBlueTeam: number,
    civiliansFoundByRedTeam: number,
    rounds: number

}