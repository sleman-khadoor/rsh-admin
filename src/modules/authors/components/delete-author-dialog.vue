<template>
    <div class="text-center">
      <v-dialog
        v-model="props.deleteDialog"
        max-width="400"
        persistent
      >
      <v-card>
        <v-card-title class="headline">
            <img width="30px" src="@/assets/icons/trash.svg" class="m-4" />
        </v-card-title>
        <v-card-text>
          Please note that an item cannot be restored once it has been permanently deleted.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="grey" @click="dialog = false">
            Back
          </v-btn>
          <v-btn color="red" class="white--text" @click="dialog = false">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
      props: ['deleteDialog', 'selectedAuthor'],
      setup(props) {
          return {
              props,
          }        
      },
  })
  </script>

  <style scoped>
  .headline {
    font-weight: bold;
    text-align: center;
    font-size: 18px;
  }
  </style>