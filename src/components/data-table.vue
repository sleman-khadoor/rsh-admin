<template>
  <v-data-table 
    hide-default-footer
    height="390px">
    <thead class="bg-white-grey">
      <tr>
        <th v-for="header in headers" :key="header.title" class="text-center font-weight-bold">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="item in data" :key="item.slug.en">
        <td v-for="subItem in headers" :key="subItem.key">
          <div v-if="subItem.key === 'actions'" >
            <v-btn variant="flat" @click="$emit('OpenDialog', item)" class="action-btn">
              <img  width="30px" src="@/assets/icons/edit.svg"  class="px-1"/>
            </v-btn>
            <v-btn  width="30px" variant="text" @click="$emit('OpenDeleteDialog', item)" class="action-btn">
              <img width="30px" src="@/assets/icons/trash.svg" class="px-1" />
            </v-btn>
          </div>
          <div v-else>
            {{ item[subItem.key][subItem.subKey] }}
          </div>
        </td>
      </tr>
    </tbody>
    </v-data-table>
    <paginate />
</template>

<script>
import { defineComponent } from 'vue'
import paginate from './v-pagination.vue';

export default defineComponent({
    components: {
      paginate,
    },
    props: ['headers','data'],
    setup(props) {
        return {
            props,
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
</style>
