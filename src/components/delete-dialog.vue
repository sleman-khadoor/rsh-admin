<template>
<div class="text-center">
    <v-dialog v-model="props.deleteDialog" max-width="425" persistent>
        <v-card class="pa-5">
            <v-card-title class="headline text-center font-weight-bold">
                <img width="60px" src="@/assets/icons/trash.svg" class="font-weight-bold ms-1 delete-icon bg-red-opacity pa-2 rounded-circle" />
                <p>Are you sure to delete the item?</p>
            </v-card-title>
            <v-card-text class="styled-text">
                <p class="text-center">Please note that an item cannot be restored once it has been permanently deleted.</p>
            </v-card-text>
            <v-row dense class="justify-end px-6">
                <v-col cols="12" md="4" sm="4">
                    <v-btn class="text-none text-white font-weight-regular close-btn bg-grey" text="Cancel" block @click="$emit('closeDialog', 'delete')"></v-btn>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-btn type="submit" class="text-none text-white font-weight-regular bg-red" text="Delete" block @click="$emit('delete', JSON.stringify(form), 'delete')"></v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['deleteDialog', 'selectedAuthor', 'loading'],
    setup(props) {
        return {
            props,
        }
    },
})
</script>

<style scoped>
.dialog {
    height: 1000px;
}
</style>
