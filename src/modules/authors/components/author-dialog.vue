<template>
  <div class="text-center">
    <v-dialog
      v-model="props.dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        :title="title" 
        class="pa-1"
      >
        <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
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
              cols="6"
              md="6"
              sm="6"
            >
              <v-textarea
                variant="outlined"
                label="About Author in Arabic"
                v-model="form.about.ar"
                rows="7"
                persistent-hint
                required
              ></v-textarea>
            </v-col>

            <v-col
              cols="6"
              md="6"
              sm="6"
            >
              <v-textarea
                variant="outlined"
                label="About Author in English*"
                v-model="form.about.en"
                rows="7"
                required
              ></v-textarea>
            </v-col>
             <v-col
                cols="12"
                md="12"
                sm="12"
                class="mb-5"
              >
                <div :class="'img-container'"  @click="clickInputFile">
                  <p class="size-22 overflow-hidden w-25 mb-0 pt-3 pl-3 position-absolute v-label v-field-label" >Author photo*</p>
                  <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2">
                    <img v-if="form.avatar" width="70" height="70" ref="imgRef" src="@/assets/icons/logo.svg" class="my-auto"/>
                    <img v-else width="30" height="30" src="@/assets/icons/img-upload.svg" class="my-auto"/>
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      class="mx-auto w-mc pa-0"
                      id="hidenFileInput"
                      hide-input
                      v-model="form.avatar"
                      truncate-length="15"
                      :prepend-icon="null"
                      append-outer="mdi-close"
                      @change="printFiles(form.avatar, 'image')"
                    >
                    </v-file-input>
                    <p class="size-22 overflow-hidden font-deep-grey bold text-start">{{ form.avatar ? form.avatar.name :  ''}}</p>
                  </div>
                </div>
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
                    @click="Object.keys(props.selectedAuthor).length !== 0 ? $emit('edit', JSON.stringify(form), 'edit') :  $emit('add', JSON.stringify(form),'add')"
                  ></v-btn>
            </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { defineComponent, onUpdated, reactive, computed } from 'vue'

export default defineComponent({
    props: ['dialog', 'selectedAuthor', 'eventType'],
    setup(props) {
        console.log('event type is', props.eventType);
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
        const title = computed(() => {
            return Object.keys(props.selectedAuthor).length !== 0 ? `Edit Author` : `Add Author`;
        })
        function clickInputFile () {
          document.getElementById('hidenFileInput').click()
        }
        function printFiles (file) {
          const img = this.$refs.imgRef;

          if (file) {
            let reader = new FileReader();

            reader.onload = function (e) {
              img.src = e.target.result;
            };

            reader.readAsDataURL(file);
          }
        }
        return {
            props,
            form,
            title,
            clickInputFile,
            printFiles
        }        
    },
})
</script>
<style scoped>
.img-container{
  height: 14.5vh !important;
  border: 1px solid rgba(118,118,118) !important;
}
</style>