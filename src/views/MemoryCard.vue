<template>
<img @click="openModal" class="logo_help" src="../assets/logo_help.png" alt="logo aide" />
<Modal @close-modal="modalClosed" v-if="showModal" :text="textModal"/>

<Select v-model="selectedFamily" :content="families" @select-change="selectChange"/>
    <a :href="getURlKanji()" >Détails</a>
    <Button @click="changeKanji();" text="Prochain Kanji" color="#F5F5F5"/>
    <div class="card">
        <Card :kanji="kanji"  />
    </div>

    <transition name="toast">
    <Toast v-if="showToast" :text="trad.translatedText"  />
    </transition> 

</template>

<script>
import Card from '../components/Card'
import Button from '../components/button'
import Toast from '../components/Toast'
import Modal from '../components/Modal'
import Select from '../components/Select'

export default {
    name: 'MemoryCard',
    components: {
        Card,
        Button,
        Toast,
        Modal,
        Select,
    },
     data() {
        return {
            kanji: [],
            trad: "",
            showToast: false,
            textModal: "Cette page est là pour vous aider à retenir les kanji. Elle vous permet de vous tester vous même sur votre connaissance de ces symboles. Vous pouvez ensuite vérifier votre réponse en passant le curseur sur la carte, ayant ainsi accès aux traductions anglaises (au verso) et française (venant d'en bas). Vous pouvez ensuite, soit passez à un autre kanji, soit accéder à la page du kanji via le lien 'détail'.",
            showModal: false,
            selectedFamily:"1",
        }
    },
    methods: {
    //renvoie n kanjis aléatoires de l'api (de grade 1)
    async fetchNKanjis(n){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-'+this.selectedFamily)
        const data = await res.json()


        let result = []
        for(let i=0;i <n; i++)
        {
        var random = data[Math.floor(Math.random() * data.length)];
        result.push(random)
        }
        
        return result
      }, // récupère les informations du kanji passé en paramètre
      async getInfosKanji(kanji){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/'+kanji)
        const data = await res.json()
        return data

      }, //récupère les traductions en français des traductions anglais d'un kanji // LIMITE DE TRADUCTION -> ne traduire que le premier mot (pas tous les sens)
      async getFrench(){//words) {
          
        const res = await fetch('https://2.56.212.232:5000')
        console.log(data)
        console.log("yes")
        const data = await res.json()
        console.log(data)
        return data
           /* const res = await fetch("https://libretranslate.com/translate", {
            method: "POST", 
            body: JSON.stringify({
               // q: words[w],
                q:words[0],
                source: "en",
                target: "fr"
                }),
            headers: { "Content-Type": "application/json" }
            });
            return await res.json()*/

         // }
          //return trad
      },
    async changeKanji(){
        this.kanji = await this.fetchNKanjis(1)
        this.kanji = await this.getInfosKanji(this.kanji)
        this.trad = await this.getFrench(this.kanji.meanings)
        this.triggerToast()
    },
    triggerToast(){
        this.showToast = true;
        setTimeout(() => this.showToast = false, 1000)
    },
    getURlKanji(){
        return `${window.location.origin}/kanji/${this.kanji.kanji} `
    },
    openModal(){
        this.showModal= ! this.showModal
    },
    modalClosed(){
        this.showModal=false
    },   
    selectChange(family){
        this.selectedFamily = family
        this.changeKanji(); //réactualise les cartes

    },
       
    },
    async created() {
      this.families = ["1","2","3","4","5","6","8"]//,"tous"] //familles de kanji proposées dans le select
      this.changeKanji()
    }
}
</script>
<style scoped>

.card {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin: -150px;
    float: left;
    perspective: 500px;
}

Button {
    color:black;
    margin-left:45%;
    margin-top: 4%;
}

a {
    color: white;
    margin-left: 1%;
    margin-top: 1%;

}

/* animation toast */
.toast-enter-from {
    opacity: 0;
    transform: translateY(+60px)
}
.toast-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.toast-enter-active {
    transition: all 0.3s ease;
}

.toast-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(+60px)
}
.toast-leave-active {
    transition: all 0.3s ease;
}

.logo_help {
        width:3%;
        min-width:35px;
        left:95%;
        margin-top:1%;
        position:relative

  }
   Select {
      position: relative;
      margin-left: 43%;
      width:3%;
      min-width:40px;

    }
</style>
