<template>
<div>
  <div v-if="props.loading">
    <v-data-table 
    hide-default-footer
    hover
    height="50px">
    <thead class="bg-white-grey">
        <tr>
            <th v-for="header in headers" :key="header.title" class="text-center font-weight-bold">
                {{ header.title }}
            </th>
        </tr>
    </thead>
    </v-data-table>
    <div class="d-flex justify-center align-center" style="height: 270px" >
          <v-progress-circular
            :size="50"
            :width="7"
            :color="$colors.choco"
            indeterminate
          ></v-progress-circular>
    </div>
  </div>
    <v-data-table
      v-else 
      hide-default-footer
      hover
      height="320px">
      <thead class="bg-white-grey">
        <tr>
          <th v-for="header in headers" :key="header.title" class="text-center font-weight-bold">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <p>{{console.log(props.itemKey)}}</p>
        <tr v-for="(item, index) in data" :key="itemRouteKey(item)" :style="index%2 !== 0 ? 'background: #FCFCFC' : ''">
          <td v-for="subItem in headers" :key="subItem.key">
            <div v-if="subItem.key === 'actions'" >
                <img v-if="actionsTable[0]['edit']" @click="$emit('OpenDialog', item)" width="30px" src="@/assets/icons/edit.svg" class="px-1 cursor-pointer" />
                <img v-if="actionsTable[1]['delete']" @click="$emit('OpenDeleteDialog', item)" width="30px" src="@/assets/icons/trash.svg" class="px-1 cursor-pointer" />
                <img v-if="actionsTable[2]['view']" width="30px" src="@/assets/icons/view.svg" class="px-1 cursor-pointer" />
            </div>
            <div v-else>
              {{ item[subItem.key][subItem.subKey]?? item[subItem.key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </v-data-table>
    <paginate :meta="props.meta" @newPage="$emit('newPage',$event)" />    
</div>
</template>

<script>
import { defineComponent} from 'vue'
import paginate from './v-pagination.vue';

export default defineComponent({
    components: {
        paginate,
    },
    props: ['headers','actionsTable','data', 'meta', 'loading', 'itemKey'],
    setup(props) {
      
      function itemRouteKey(item){
        if(props.itemKey == 'translationSlug'){
          return item.slug.en;
        }else if(props.itemKey == 'slug'){
          return item.slug;
        }else{
          return item.id;
        }
      }
      return {
          props,
          itemRouteKey,
      }
    },
})
</script>

<style>
.action-btn {
    margin: -18px;
}

.action-btn:hover {
    background-color: transparent !important
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
</style>
