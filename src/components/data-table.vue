<template>
  <v-table
    height="390px"    
  >
    <thead class="bg-white-grey">
      <tr>
        <th v-for="header in headers" :key="header.title" class="text-center">
          {{header.title}}
        </th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="item in data" :key="item.slug.en">
        <td v-for="subItem in headers" :key="subItem.key">
        <div v-if="subItem.key === 'actions'">
          <v-btn variant="text"  @click="$emit('OpenDialog', item)">
            <img src="@/assets/icons/edit.svg" class="px-1"/>
          </v-btn>
          <v-btn variant="text">
            <img src="@/assets/icons/trash.svg" class="px-1"/>
          </v-btn>
        </div>
        <div v-else>
            {{item[`${subItem.key}`][`${subItem.subKey}`]}}
        </div>
            
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['headers','data'],
    setup(props) {
        return {
            props
        }        
    },
})
</script>
