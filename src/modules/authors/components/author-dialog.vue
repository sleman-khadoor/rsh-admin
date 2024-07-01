<template>
  <div class="text-center">
    <v-dialog
      v-model="props.dialog"
      max-width="600"
    >
      <!-- <template v-slot:activator>
        
      </template> -->

      <v-card
        prepend-icon="mdi-account"
        title="Add Author"
        class="pa-1"
      >
        <v-card-text class="pb-0">
          <v-row dense>
            <v-col
              cols="12"
              md="6"
              sm="6"
            >
              <v-text-field
                variant="outlined"
                class="pa-0"
                label="Author name in Arabic*"
                v-model="form.name.ar"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
              sm="6"
            >
              <v-text-field
                variant="outlined"
                hint="example of helper text only on focus"
                label="Author name in English"
                v-model="form.name.en"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-textarea
                variant="outlined"
                label="About Author in Arabic"
                v-model="form.about.ar"
                rows="3"
                persistent-hint
                required
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-textarea
                variant="outlined"
                label="About Author in English*"
                v-model="form.about.en"
                rows="3"
                required
              ></v-textarea>
            </v-col>
            <v-col
                cols="12"
                md="12"
                sm="12">
                <v-file-input label="File input" v-model="form.avatar" variant="outlined"></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-row dense>
            <v-col
              class="px-7 pb-2"
              cols="12"
              md="12"
              sm="12">
                 <v-btn
                    class="text-none text-white font-weight-regular pa-0"
                    prepend-icon="mdi-checkbox-marked-circle"
                    text="Save"
                    size="large"
                    color="dark-blue"
                    block
                    @click="props.selectedAuthor !== {} ? $emit('edit', JSON.stringify(form)) :  $emit('add', JSON.stringify(form))"
                  ></v-btn>
            </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { defineComponent, onUpdated, reactive } from 'vue'

export default defineComponent({
    props: ['dialog', 'selectedAuthor'],
    setup(props) {
        let form = reactive({
          name: {
            ar: '',
            en: ''
          },
          about: {
            ar: '',
            en: ''
          },
          avatar: ''
        })
        onUpdated(() => {
          if(props.selectedAuthor) {
            form.name.ar = props.selectedAuthor.name?.ar
            form.name.en = props.selectedAuthor.name?.en
            form.about.ar = props.selectedAuthor.about?.ar
            form.about.en = props.selectedAuthor.about?.en
            form.avatar = props.selectedAuthor.avatar
          } else {
            form.name.ar = null
            form.name.en = null
            form.about.ar = null
            form.about.en = null
            form.avatar = null
          }
        })
        return {
            props,
            form
        }        
    },
})
</script>
