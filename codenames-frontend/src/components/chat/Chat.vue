<template>
    <div class="text-left">
        <div class="chat-div col-sm-12" id="display">
            <div v-for="chatMessage in chatMessages" :key="chatMessage.id">
                <font-awesome-icon class="ml-2" icon="user-secret" v-if="chatMessage.name === currentPlayerName"/>
                <label class="mx-2"
                       :style="chatMessage.teamColor === 'BLUE' ? 'color: dodgerblue':chatMessage.teamColor === 'RED' ? 'color: indianred' : 'color: #87194B' ">
                    {{chatMessage.name}}: {{chatMessage.message}}</label>
            </div>
        </div>
        <div class="my-3">
            <b-input-group size="sm">
                <b-form-input id="chat-message"
                              type="text"
                              v-on:keyup.enter="sendChatMessage"
                              v-model="chatMessageToSend"></b-form-input>
                <b-input-group-append>
                    <b-button squared
                              type="submit"
                              @click="sendChatMessage">
                        {{ $t("chat.send") }}
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {MessageModel} from "@/models/chat/messageModel";
    import {Subscription} from "webstomp-client";


    @Component
    export default class Chat extends Vue {
        private subscription!: Subscription;
        private chatMessageToSend = "";

        public scrollToEnd() {
            const container = document.getElementById("display");
            container!.scrollTop = container!.scrollHeight;
        }

        mounted() {
            // TODO: can we get types for action payloads? use action creators?
            this.$store.dispatch("subscribeToChat")
                .then(subs => this.subscription = subs);
            this.scrollToEnd();
        }

        updated() {
            this.$nextTick(() => this.scrollToEnd());
        }

        beforeDestroy() {
            this.$store.dispatch("unsubscribeToChat", this.subscription)
        }

        public sendChatMessage(): void {
            this.$store.dispatch("sendChatMessage", this.chatMessageToSend)
            this.chatMessageToSend = "";
        }

        get chatMessages(): Array<MessageModel> {
            return this.$store.getters["messages"];
        }

        get currentPlayerName(): string {
            return this.$store.getters["currentPlayerName"];
        }

        get lobbyId(): string {
            return this.$store.getters["lobbyId"];
        }

    }
</script>

<style scoped>
    input {
        opacity: 0.6;
    }

    input:focus {
        opacity: 1;
        outline: none;
        box-shadow: none;
        border: none;
    }

    label {
        color: rgb(135, 25, 75);
    }

    .chat-div {
        height: 60vh;
        background-color: rgba(255, 255, 255, 0.6);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .chat-div::-webkit-scrollbar {
        display: none;
    }

    .chat-div {
        -ms-overflow-style: none;
    }

    svg {
        color: rgb(135, 25, 75);
    }


    button {
        background-color: rgb(135, 25, 75);
        border: 0 solid;
        box-shadow: inset 0 0 20px rgba(250, 230, 15, 0);
        outline: rgba(135, 25, 75, .5) solid 1px;
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

</style>