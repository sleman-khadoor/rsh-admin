<template>
<div class="text-center">
    <v-dialog v-model="props.deleteDialog" max-width="425" persistent>
        <v-card>
            <v-card-title class="headline">
                <img width="55px" src="@/assets/icons/trash.svg" class="font-weight-bold ms-1 delete-icon" />
                <p>Are you sure to delete the item?</p>
            </v-card-title>
            <v-card-text class="styled-text">
                Please note that an item cannot be restored once <span class="break-line"> it has been permanently deleted.</span>
            </v-card-text>
            <v-card-actions class="pa-5 flex-column justify-center align-center">
                <v-btn class="text-none text-white font-weight-regular pa-0 delete-btn" text="Delete" size="large" block @click="$emit('delete', JSON.stringify(form), 'delete')"></v-btn>
                <v-btn class="text-none text-white font-weight-regular pa-0 back-btn" text="Back" size="large" color="black" block @click="$emit('closeDialog', 'delete')"></v-btn>
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

.ms-1 {
    margin-top: 8px !important;
}

.break-line {
    margin-left: 70px;
}

.delete-btn {
    background-color: red;
    color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    margin-top: -4px
}

.back-btn {
    margin-inline-start: 0.0rem !important;
    color: grey !important;
    border-radius: 10px;
}

.delete-icon {
    margin-top: 8px !important;
    background-color: rgba(255, 0, 0, 0.08);
    border-radius: 100%;
    padding: 10px;
}
</style>
