import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import * as websocket from '@/services/websocket';
import {config} from "@/config";
import {GameCreationModel} from "@/models/gameCreationModel";
import {GameStateModel} from "@/models/gameStateModel";
import {TeamVoteModel} from "@/models/teamVoteModel";
import axios, {AxiosResponse} from 'axios';
import {LobbyModel} from "@/models/lobbyModel";
import {CardDetailsModel} from "@/models/cardDetailsModel";
import {CardVoteModel} from "@/models/cardVoteModel";

const BASE_URL = process.env.VUE_APP_BASE_URL;

@Module
export default class GameModule extends VuexModule {
    private game: GameStateModel = {
        id: -1,
        board: [],
        blueScore: 0,
        redScore: 0,
        civiliansFoundByBlueTeam: 0,
        civiliansFoundByRedTeam: 0,
        rounds: 0,
        endGame: false,
        endTurn: false,
        winnerTeam: "",
        gameEndByAssassin: false,
        startingTeamColor: "",
    }

    private cardVotes: Array<CardVoteModel> = [];

    @Action({rawError: true})
    public subscribeToGame() {
     //   const lobbyId: string = this.context.getters["lobbyId"];
        const gamePath: string = "/" + this.gameId;
        websocket.subscribe(gamePath, (body) => {
                if (body) {
                    this.context.commit("UPDATE_GAME", body);
                }
            }
        )
    }

    @Action({rawError: true})
    public async createGame(): Promise<void> {
        const resp: AxiosResponse = await axios.post(BASE_URL + "/game", {lobbyId: this.context.getters["lobbyId"]});
        if (resp.status === 201) {
            const gameModel: GameCreationModel = resp.data;
            this.context.commit("SET_GAME", gameModel);
        }
    }

    @Action({rawError: true})
    public fetchActiveGame(): void {
        const lobbyModel: LobbyModel = {
            id: this.context.getters["lobbyId"],
            currentGameId: -1,
            players: [],
            everyoneRdy: false,
            kickingPhase: false,
        }
        websocket.send(config.FETCH_GAME_PATH, lobbyModel)
    }

    @Action({rawError: true})
    public sendGameState(teamVoteModel: TeamVoteModel): void {
        websocket.send(config.GAME_STATE_UPDATE_PATH, teamVoteModel);
    }

    @Action({commit: "ADD_CARD_VOTE", rawError: true})
    public addCardVote(cardVote: CardVoteModel): CardVoteModel {
        return cardVote;
    }

    @Mutation
    private ADD_CARD_VOTE(cardVote: CardVoteModel): void {
        this.cardVotes.push(cardVote);
    }

    @Mutation
    private UPDATE_GAME(gameStateModel: GameStateModel) {
        this.game = gameStateModel;
    }

    @Mutation
    private SET_GAME(gameCreationModel: GameCreationModel): void {
        this.game.id = gameCreationModel.id;
        this.game.board = gameCreationModel.board;
    }

    get rounds(): number {
        return this.game.rounds;
    }

    get civiliansFoundByBlueTeam(): number {
        return this.game.civiliansFoundByBlueTeam;
    }

    get civiliansFoundByRedTeam(): number {
        return this.game.civiliansFoundByRedTeam;
    }

    get blueScore(): number {
        return this.game.blueScore;
    }

    get redScore(): number {
        return this.game.redScore;
    }

    get gameId(): number {
        return this.game.id;
    }

    get board(): Array<CardDetailsModel> {
        return this.game.board;
    }
}