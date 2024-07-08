<template>
  <div class="text-center">
    <v-dialog
      v-model="props.dialog"
      max-width="450"
      class="dialog"
    >
        <v-card
        class="pa-5 font-dark-blue"
        >
        <div class="px-4">
          <v-icon icon="mdi-book-multiple" class="mr-2"/><span class="size-35">{{title}}</span>
        </div>
        <v-form ref="formv" @submit.prevent="handleSubmit" class="form">
        <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
          <v-row dense>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                variant="outlined"
                class="pa-0"
                label="Category Name In Arabic*"
                v-model="form.title.ar"
                :rules="rules.arTitle"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                variant="outlined"
                label="Category Name In English*"
                :rules="rules.enTitle"
                required
                v-model="form.title.en"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-row dense class="justify-end px-4">
          <v-col
            cols="12"
            md="4"
            sm="4">
               <v-btn
                  class="text-none text-white font-weight-regular close-btn"
                  text="Cancel"
                  color="grey"
                  block
                  @click="Object.keys(props.selectedCategory).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"
                ></v-btn>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="4">
               <v-btn type="submit"
                  class="text-none text-white font-weight-regular"
                  text="Save"
                  :loading="props.loading"
                  color="dark-blue"
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
import { defineComponent, onUpdated, reactive, computed, ref } from 'vue'

export default defineComponent({
    props: ['dialog', 'selectedCategory', 'eventType', 'loading'],
    data: () => ({
      rules : {
        arTitle: [
          v => !!v || 'Category name in Arabic is required',
        ],
        enTitle: [
          v => !!v || 'Category name in English is required',
        ]
      }
    }),
    setup(props, {emit}) {
        let form = reactive({
          title: {
            ar: '',
            en: ''
          }
        })
        const formv = ref(null);
        onUpdated(() => {
          if(props.selectedCategory) {
            form.title.ar = props.selectedCategory.title?.ar
            form.title.en = props.selectedCategory.title?.en
          } else {
            form.title.ar = null
            form.title.en = null
          }
        })
        const title = computed(() => {
            return Object.keys(props.selectedCategory).length !== 0 ? `Edit Category` : `Add Category`;
        })
        function handleSubmit() {
          if (formv.value) {
            if(formv.value.validate()){
              if (Object.keys(props.selectedCategory).length !== 0) {
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
