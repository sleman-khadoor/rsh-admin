<template>
<div class="text-center">
    <v-dialog v-model="props.warningDialog" max-width="400" persistent class="dialog">
        <v-card class="pa-5">
            <v-card-title class="headline text-center font-weight-bold">
                <img width="60px" src="@/assets/icons/warning.svg" class="font-weight-bold ms-1 delete-icon bg-red-opacity pa-2 rounded-circle" />
            </v-card-title>
            <v-card-text class="styled-text font-weight-bold text-center">
                {{ props.message}}
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="3" sm="3">
                    <v-btn class="text-none text-white font-weight-regular close-btn bg-grey" text="Cancel" block @click="$emit('closeDialog', 'delete')"></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['warningDialog', 'message'],
    setup(props) {
        return {
            props,
        }
    },
})
</script>
