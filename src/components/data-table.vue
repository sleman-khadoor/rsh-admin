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
  <div v-else-if="data.length === 0">
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
    <div class="d-flex flex-column justify-center align-center" style="height: 270px" >
        <img  width="20%" src="@/assets/icons/no-data.svg">
    </div>
  </div>
    <v-data-table
      v-else
      hide-default-footer
      hover
      height="375">
      <thead class="bg-white-grey">
        <tr>
          <th v-for="header in headers" :key="header.title" class="text-center font-weight-bold">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(item, index) in data" :key="itemRouteKey(item)" :style="index%2 !== 0 ? 'background: #FCFCFC' : ''">
          <td v-for="subItem in headers" :key="subItem.key">
            <div v-if="subItem.key === 'actions'" >
              <img v-if="actionsTable[3]?.['reset']" @click="$emit('OpenResetDialog', item)" width="30px" src="@/assets/icons/password.svg" class="px-1 cursor-pointer" />
              <img v-if="actionsTable[2]?.['view']" @click="$emit('viewItem', item)" width="30px" src="@/assets/icons/view.svg" class="px-1 cursor-pointer" />
              <img v-if="actionsTable[0]?.['edit']" @click="$emit('OpenDialog', item)" width="30px" src="@/assets/icons/edit.svg" class="px-1 cursor-pointer" />
              <img v-if="actionsTable[1]?.['delete']" @click="$emit('OpenDeleteDialog', item)" width="30px" src="@/assets/icons/trash.svg" class="px-1 cursor-pointer" />
            </div>
            <div v-else-if="subItem.key === 'reviews'">
                <div class="d-flex justify-center">
                  <img @click="$emit('ViewReviews', item)"  width="25px" src="@/assets/icons/manage.svg" class="px-1 cursor-pointer" />
                  <p class="font-choco">Manage reviews</p>
                </div>
            </div>
            <div v-else-if="subItem.key === 'awards'">
              <div class="d-flex justify-center">
                <img @click="$emit('ViewAwards', item)" width="25px" src="@/assets/icons/manage.svg" class="px-1 cursor-pointer" />
                <p class="font-choco">Manage awards</p>
              </div>
          </div>
          <div v-else-if="subItem.key === 'book_title'">
            {{ truncatedText(item.title.en) }}
          </div>
          <div v-else-if="subItem.key === 'author'">
            {{ item.author.name.en }}
          </div>
          <div v-else>
            {{ item[subItem.key]?.[subItem.subKey]?? item[subItem.key] }}
          </div>
          </td>
        </tr>
      </tbody>
    </v-data-table>
    <paginate v-if="props.meta" :meta="props.meta" @newPage="$emit('newPage',$event)" />    
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
      function truncatedText(text){
        const maxLength = 30;
        return text.length > maxLength? text.substring(0, maxLength) + '...' : text;
      }
      return {
          props,
          itemRouteKey,
          truncatedText,
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
