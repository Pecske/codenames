<template>
    <div class="main-div col-sm-12">
        <div class="locale-change">
<!--            🌐 -->
            <LocaleSwitcher/>
        </div>
        <div id="spies"
             :class="['col-lg-4 offset-lg-4',
                      {'move-right':isOverCreate},
                      {'move-left':isOverRandom}]"></div>
        <div class="codenames-header">
            <b-img :src="logoUrl"></b-img>
        </div>
        <div id="welcome-buttons" class="text-center col-md-8 offset-md-2">
            <b-button squared
                      @click="createLobby"
                      @mouseover="isOverCreate = true"
                      @mouseleave="isOverCreate = false"
                      class="mr-5">
                {{ $t("welcome-header.private-room") }}
<!--                Create private room-->
            </b-button>
            <b-button squared
                      @mouseover="isOverRandom = true"
                      @mouseleave="isOverRandom = false">
                {{$t("welcome-header.random-room")}}
<!--                Random room-->
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import router from "@/router";
    import LocaleSwitcher from "@/components/LocaleSwitcher.vue";


    @Component({
        components: {
            LocaleSwitcher
        }
    })
    export default class WelcomeHeader extends Vue {
        private logoUrl = require("../assets/semanedoc.png");
        private isOverCreate = false;
        private isOverRandom = false;

        public async createLobby() {
            localStorage.clear();
            const language = this.$route.query.lang
            const created: boolean = await this.$store.dispatch("createLobby", { language });
            if (created) {
                router.push({name: "Lobby", params: {lobbyId: this.lobbyId}});
            }
        }

        get lobbyId(): string {
            return this.$store.getters["lobbyId"];
        }
    }
</script>

<style scoped>

    @media (max-width: 1025px) {
        #spies {
            display: none;
        }
    }

    #spies {
        background-image: url("../assets/spies.png");
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        bottom: 0;
        height: 95vh;
        z-index: 0;
        opacity: 1;
        transition: .5s;
    }

    #welcome-buttons {
        margin-top: 30vh;
        position: absolute;
        z-index: 1;
    }

    #spies.move-right {
        transform: translateX(3%);
        -webkit-transform: translateX(3%);
    }

    #spies.move-left {
        transform: translateX(-3%);
        -webkit-transform: translateX(-3%);
    }

    .main-div {
        background-image: url("../assets/background.svg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        min-height: 100vh;
        min-width: 100vw;
    }

    img {
        margin-top: 60px;
        max-width: 75%;
    }

    button {
        background-color: rgb(135, 25, 75);
        border: 0 solid;
        box-shadow: inset 0 0 20px rgba(250, 230, 15, 0);
        outline: rgba(250, 230, 15, .5) solid 1px;
        outline-offset: 0px;
        text-shadow: none;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    }

    button:hover {
        background-color: rgb(135, 25, 75);
        border: 0px solid;
        box-shadow: inset 0 0 20px rgba(250, 230, 15, .5), 0 0 20px rgba(250, 230, 15, .2);
        outline-color: rgba(250, 230, 15, 0);
        outline-offset: 15px;
        text-shadow: 1px 1px 2px #427388;
    }

    .locale-change {
        display: flex;
        align-items: center;
    }
</style>