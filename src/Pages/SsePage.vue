<template>
    <div>
        <div class="row">

            <h1>Sse</h1>

            <router-link to="/">Retour</router-link>

            <form action="#" @submit.prevent="postMessage()">
                <div class="form-group">
                    <label for="message">Message</label>
                    <input type="text" value="message" id="message" v-model="message">
                </div>
                <button type="submit">Poster</button>
            </form>

        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Inject} from 'vue-property-decorator'
    import {mapGetters, mapActions} from 'vuex';
    import {EnumActions} from "../Store/enumActions";
    import {Observable} from "rxjs";
    import {EnumGetters} from "../Store/enumGetters";

    import {Animal, Personne} from "../plalance-rest";

    @Component({
        name: "SsePage",
        computed: {
            ...mapGetters([
                'isAuthenticated'
            ])
        }
    })
    export default class SsePage extends Vue {

        message: string = "";

        messages: Array<any> = [];

        mounted() {
            this.subscribeSse();
        }

        subscribeSse() {


            let es = new EventSource("/back/broadcast");

            es.addEventListener("message", (e) => {
                this.$store.dispatch(EnumActions.TOAST_TEXT, [true, e.data]);
            });

            es.onerror = e => {console.log('onerror:' + e.toString())};
            es.onopen = e => {console.log('onopen');};

        }

        postMessage(){
            let url = "/back/sse";

            this.axios.post(url, this.message)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };
</script>