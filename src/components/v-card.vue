<template>
  <div class="min-h-100 h-auto">
    <div class="h-100" v-if="props.loading || (!props.data && props.cardType!='achievements')">
      <div class="d-flex justify-center align-center" style="height: 300px">
        <v-progress-circular :size="50" :width="7" :color="$colors.choco" indeterminate></v-progress-circular>
      </div>
    </div>
    
    <div class="h-100" v-else-if="data.length === 0">
      <div class="d-flex flex-column justify-center align-center h-100">
        <img  width="30%" class="ma-auto" src="@/assets/icons/no-data.svg">
      </div>
    </div>
    
    <v-container class="container pb-0 h-auto" v-else>
      <v-row dense class="pa-4 align-content-stretch h-auto">
        <v-col v-for="(item, index ) in props.data" :key="item.id" cols="6" md="6" sm="12" class="input-field pa-2">
          <v-card  class="card pa-1" height="165px">
            <v-card-text class="py-2" :dir="langs[index] === 'ar' ? 'rtl' : 'ltr'">
              {{ langs[index] === 'en' ? truncatedText(item, 'en')  : truncatedText(item, 'ar')}}
              <p v-if="cardType == 'reviews'" class="font-dark-blue font-weight-bold" >
                {{ langs[index] === 'en'? item.username.en : item.username.ar  }}
              </p>
            </v-card-text>
            <v-card-actions class="pl-3 d-flex flex-wrap align-center justify-space-between py-0 card-actions">
              <div class="d-flex flex-wrap">
                <img v-if="actionsTable[0]['edit']" @click="$emit('OpenDialog', item)" width="30px" src="@/assets/icons/edit.svg" class="px-1 cursor-pointer" />
                <img v-if="actionsTable[1]['delete']" @click="$emit('OpenDeleteDialog', item)" width="30px" src="@/assets/icons/trash.svg" class="px-1 cursor-pointer" />
                <img v-if="actionsTable[2]['view']" @click="langs[index] === 'en' ? $emit('OpenViewEnDialog', item, 'en'): $emit('OpenViewArDialog', item, 'ar')" width="30px" src="@/assets/icons/view.svg" class="px-1 cursor-pointer" />
              </div>
              <div>
                <v-btn-toggle v-model="langs[index]" variant="outlined" divided class="ml-auto toggle bg-white">
                  <v-btn value="en" class="size-18" @click="langs[index] = 'en'"> English</v-btn>
                  <v-btn value="ar" class="size-18" @click="langs[index] = 'ar'">Arabic</v-btn>
                </v-btn-toggle>
              </div>
            </v-card-actions>
          </v-card>
        </v-col> 
      </v-row>
    </v-container>  
    <paginate v-if="props.meta" :meta="props.meta" @newPage="$emit('newPage', $event)" />
  </div>
</template>

<script>
import { defineComponent, watch } from 'vue';
import paginate from './v-pagination.vue';
import { ref } from 'vue';

export default defineComponent({
  components: {
    paginate,
  },
  props: ['headers', 'actionsTable', 'data', 'meta', 'loading', 'itemKey', 'cardType'],
  setup(props) {
    let langs = ref([]);
    
    function updateLang(item, lang) {
      if(item.lang !== lang){
        item.lang = lang;   
      }
        
    }
    
    function itemRouteKey(item) {
      if (props.itemKey === 'translationSlug') {
        return item.slug.en;
      } else if (props.itemKey === 'slug') {
        return item.slug;
      } else {
        return item.id;
      }
    }

    function truncatedText(item, lang){
      let text = '';
      if(props.cardType === 'achievements'){
        text = lang == 'en'? item.content?.en : item.content?.ar;
      }else if(props.cardType === 'reviews'){
        text = lang == 'en'? item.review?.en : item.review?.ar;
      }else if(props.cardType === 'awards'){
        text = lang == 'en'? item.title?.en : item.title?.ar;
      }
      const maxLength = 240;
      return text?.length > maxLength? text.substring(0, maxLength) + '...' : text;
    }

    watch(props, (newV) => {
            console.log(newV);
            langs.value = []
            props.data.forEach(element => {
              console.log(element);
              langs.value.push('en')
            });
    }, { deep: true });
    watch(langs, (newV) => {
            console.log(newV);
    }, { deep: true });
    return {
      props,
      itemRouteKey,
      updateLang,
      langs,
      truncatedText
    };
  },
});
</script>

<style>
.action-btn {
  margin: -18px;
}

.action-btn:hover {
  background-color: transparent !important;
}

.v-table--density-default {
  --v-table-header-height: 49px;
  --v-table-row-height: 44px;
}

.loader {
  position: absolute;
  margin-left: 37%;
  margin-top: 8%;
}

.card {
  border: 0.5px solid #a5a5a5;
  border-radius: 10px;
}

.toggle {
  border-radius: 1000px;
  min-height: 32px !important;
  background-color: #F8F8F8 !important;
}

.v-btn-group--density-default.v-btn-group {
  height: unset;
}

.toggle .v-btn--active {
  background-color: #0C2748;
  color: #ffffff;
}

.card{
  min-height: 145px;
  padding-bottom: 50px;
}
.card-actions{
  width: 100%;
  position: absolute;
  bottom: 0;
}
.toggle-container{
  margin-left: 245px;
}
.container{
  min-height: 320px;
}
</style>
