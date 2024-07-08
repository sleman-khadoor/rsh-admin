<template>
  <div class="text-center">
    <v-dialog
      v-model="props.dialog"
      max-width="600"
      class="dialog"
    >
      <v-card
        class="pa-5 font-dark-blue"
        >
        <div class="px-4">
          <v-icon icon="mdi-account" class="mr-2"/><span class="size-35">{{title}}</span>
        </div>
        <v-form ref="formv" @submit.prevent="handleSubmit">
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
                label="Author Name In Arabic*"
                v-model="form.name.ar"
                :rules="rules.arName"
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
                label="Author Name In English*"
                :rules="rules.enName"
                required
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
                label="About Author In Arabic*"
                v-model="form.about.ar"
                rows="7"
                persistent-hint
                :rules="rules.arAbout"
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
                label="About Author In English*"
                v-model="form.about.en"
                rows="7"
                :rules="rules.enAbout"
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
                    <img v-if="form.avatar" width="70" height="70" ref="imgRef" :src="form.avatar" class="my-auto"/>
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
        <v-row dense class="justify-end px-4">
            <v-col
              cols="12"
              md="3"
              sm="3">
                 <v-btn
                    class="text-none text-white font-weight-regular close-btn"
                    text="Cancel"
                    color="grey"
                    block
                    @click="Object.keys(props.selectedAuthor).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"
                  ></v-btn>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="3">
                 <v-btn 
                    type="submit"
                    class="text-none text-white font-weight-regular"
                    text="Save"
                    color="dark-blue"
                    :loading="props.loading"
                    block
                  ></v-btn>
            </v-col>
        </v-row>
      </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { baseUrl } from '@/utils/axios';
import { defineComponent, onUpdated, reactive, computed, ref } from 'vue'

export default defineComponent({
    props: ['dialog', 'selectedAuthor', 'eventType', 'loading'],
    data: () => ({
      rules : {
        arName: [
          v => !!v || 'Author name in Arabic is required',
        ],
        enName: [
          v => !!v || 'Author name in English is required',
        ],
        arAbout: [
          v => !!v || 'About Author in Arabic is required',
        ],
        enAbout: [
          v => !!v || 'About Author in English is required',
        ]
      }
    }),
    setup(props, {emit}) {
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
        const formv = ref(null);
        onUpdated(() => {
          if(props.selectedAuthor) {
            form.name.ar = props.selectedAuthor.name?.ar
            form.name.en = props.selectedAuthor.name?.en
            form.about.ar = props.selectedAuthor.about?.ar
            form.about.en = props.selectedAuthor.about?.en
            form.avatar =  baseUrl + props.selectedAuthor.avatar
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
          console.log('object file', form.avatar);
        }
        function handleSubmit() {
          if (formv.value) {
            if(formv.value.validate()){
              if (Object.keys(props.selectedAuthor).length !== 0) {
                  emit('edit', JSON.stringify(form), 'edit')
                } else {
                  emit('add', form, 'add')
                }
            }
          }
        }
        return {
            props,
            form,
            formv,
            title,
            clickInputFile,
            printFiles,
            handleSubmit, 
        }        
    },
})
</script>

<style scoped>
  .img-container{
    height: 14.5vh !important;
    border: 1px solid rgba(118,118,118) !important;
  }

  .dialog {
    height: 1000px;
  }

</style>