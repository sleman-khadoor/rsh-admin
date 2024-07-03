<template>
    <v-pagination
        v-model="page"
        :length=16
        :total-visible=4
    ></v-pagination>
</template>
<script>
    // import { useStore } from 'vuex'
    // import { computed,onMounted } from 'vue'

    export default{

        // data(){
        //     return {page}
        // }
        // computed:{
        //     currentPage:{
        //         get(){
        //             return this.$store.state.author.authors.current_page;
        //         }
        //     },
        //     lastPage:{
        //         get(){
        //             return this.$store.state.author.authors.last_page
        //         }
        //     }
        // }

    }
</script>