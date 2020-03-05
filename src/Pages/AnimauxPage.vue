<template>
    <div>
        <div class="row">
            <h1>Animaux</h1>

            <form action="#" @submit.prevent="putAnimal()">

                <div class="form-group">
                    <label for="nom">Nom</label>
                    <input type="text" value="nom" id="nom" v-model="animalRequest.nom">
                </div>

                <div class="form-group">
                    <label for="type">Type</label>
                    <input type="text" value="type" id="type" v-model="animalRequest.type">
                </div>

                <div class="form-group">
                    <label for="proprietaire">Propriétaire</label>
                    <select name="proprietaire" id="proprietaire" v-model="animalRequest.proprietaire" class="browser-default">
                        <option v-for="personne in personnes" :value="personne">{{ personne.prenom }}</option>
                    </select>
                </div>

                <button type="submit">Ajouter</button>

            </form>

            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>nom</th>
                    <th>type</th>
                    <th>propriétaire</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="animal in animaux">
                    <td>{{ animal.id }}</td>
                    <td>{{ animal.nom }}</td>
                    <td>{{ animal.type }}</td>
                    <th><span v-if="animal.proprietaire">{{ animal.proprietaire.prenom }}</span></th>
                    <td><a href="#" @click.prevent="deleteAnimal(animal.id)">Supprimer</a></td>
                </tr>
                </tbody>
            </table>
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
        name: "AnimauxPage",
        computed: {
            ...mapGetters([
                'isAuthenticated'
            ])
        },
        methods: {
            ...mapActions([]),
        },
        components: {}
    })
    export default class AnimauxPage extends Vue {

        animaux: Array<Animal> = null;
        personnes : Array<Personne> = null;

        animalRequest: Animal = {
            id: null,
            nom: null,
            type: null,
            proprietaire: null
        };

        mounted() {
            this.loadAnimaux();
            this.loadPersonnes();
        }

        loadAnimaux() {

            let url = "/back/animaux";

            this.axios.get(url)
                .then((response) => {
                    this.animaux = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        loadPersonnes() {

            let url = "/back/personnes";

            this.axios.get(url)
                .then((response) => {
                    this.personnes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        putAnimal(){
            let url = "/back/animaux";

            this.axios.put(url, this.animalRequest)
                .then((response) => {
                    this.loadAnimaux();
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        deleteAnimal(id: number){
            let url = "/back/animaux/:ID".replace(":ID", id.toString() );

            this.axios.delete(url)
                .then((response) => {
                    this.loadAnimaux();
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    };
</script>