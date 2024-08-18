<template>
<div class="text-center">
    <v-dialog v-model="props.dialog" max-width="450" class="dialog">
        <v-card class="pa-5 font-dark-blue">
            <div class="px-6">
                <v-icon icon="mdi-book-multiple" class="mr-2" /><span class="size-35">{{title}}</span>
            </div>
            <v-card-text :v-if="props.eventType!=='delete'" class="pb-0">
                <v-row dense>
                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" label="Category Name In English*" :rules="rules.enTitle" required v-model="form.title.en"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" sm="12" class="input-field">
                        <v-text-field variant="outlined" class="pa-0" label="Category Name In Arabic*" v-model="form.title.ar" :rules="rules.arTitle" required dir='rtl'></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="4" sm="4">
                    <v-btn class="text-none text-white font-weight-regular close-btn" text="Cancel" color="grey" block @click="Object.keys(props.selectedCategory).length !== 0 ? $emit('closeEditDialog', 'edit'): $emit('closeAddDialog', 'add')"></v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-btn type="submit" class="text-none text-white font-weight-regular" text="Save" :loading="loading" color="dark-blue" block @click="handleSubmit()"></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { watch } from 'vue';
import { defineComponent, reactive, computed, ref } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    props: ['dialog', 'selectedCategory', 'eventType'],
    data: () => ({
        rules: {
            arTitle: [
                v => !!v || 'category name in arabic is required',
            ],
            enTitle: [
                v => !!v || 'category name in english is required',
            ]
        }
    }),
    setup(props, { emit }) {
        const store = useStore();
        const getInitialForm = () => ({
            title: {
                ar: null,
                en: null
            },
        })
        let form = reactive({
            title: {
                ar: null,
                en: null
            },
        })
        const formv = ref(null);
        const loading = computed(() => store.getters['BlogCategories/loading'])
        watch(() => props.dialog, () => {
            if (props.dialog) {
                if (props.selectedCategory) {
                    form.title.ar = props.selectedCategory.title?.ar
                    form.title.en = props.selectedCategory.title?.en
                } else {
                    Object.assign(form, getInitialForm())
                }
            } else {
                Object.assign(form, getInitialForm())
            }
        });
        const title = computed(() => {
            return Object.keys(props.selectedCategory).length !== 0 ? `Edit Category` : `Add Category`;
        })

        function checkValidation() {
            if (form.title.en && form.title.ar) {
                return true
            } else {
                return false
            }
        }

        function handleSubmit() {
            if (checkValidation()) {
                if (Object.keys(props.selectedCategory).length !== 0) {
                    if (props.selectedCategory.avatar === form.avatar) {
                        let data = {
                            title: {
                                en: form.title.en,
                                ar: form.title.ar,
                            },
                        }
                        emit('edit', data, 'edit')
                    } else {
                        emit('edit', form, 'edit')
                    }
                } else {
                    emit('add', form, 'add')
                }
            }
        }
        return {
            props,
            form,
            formv,
            title,
            loading,
            handleSubmit,
        }
    },
})
</script>

<style>
.img-container {
    height: 14.5vh !important;
    border: 1px solid rgba(118, 118, 118) !important;
}

.dialog {
    height: 1000px;
}

.input-field .v-field__input {
    min-height: 40px !important;
    padding-top: unset !important;
    padding-bottom: unset !important
}
</style>
