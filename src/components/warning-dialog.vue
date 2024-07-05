<template>
<div class="text-center">
    <v-dialog v-model="props.warningDialog" max-width="435" persistent>
        <v-card>
            <v-card-title class="headline">
                <img width="55px" src="@/assets/icons/warning.svg" class="font-weight-bold ms-1 warning-icon" />
            </v-card-title>
            <v-card-text class="styled-text">
                {{ props.message}}
            </v-card-text>
            <v-card-actions class="pa-5 flex-column justify-center align-center">
                <v-btn class="text-none text-white font-weight-regular pa-0 back-btn" text="Back" size="large" color="black" block @click="$emit('closeDialog', 'delete')"></v-btn>
            </v-card-actions>
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

<style scoped>
.headline {
    font-weight: bold;
    text-align: center;
    font-size: 18px;
}

.ms-1 {
    margin-top: 20px !important;
}

.back-btn {
    margin-inline-start: 0.0rem !important;
    background-color: gray;
    color: white !important;
    border-radius: 10px;
}

.warning-icon {
    background-color: rgba(255, 0, 0, 0.08);
    border-radius: 100%;
    padding: 10px;
}

.styled-text {
    font-weight: bold;
    margin-top: -15px;
    margin-bottom: -15px;
}
</style>
