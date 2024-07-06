<template>
    <v-pagination
        class="py-2"
        id="pagination"
        v-model="props.meta.current_page"
        color="dark-blue"
        active-color="white"
        :total-visible="5"
        :size="32"
        @update:modelValue="$emit('newPage',props.meta.current_page)"
    ></v-pagination>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['meta'],
    setup(props) {
        function clickPage () {
            console.log('clicked page', props.meta.current_page);
        }
        return {
            props,
            clickPage
        }        
    },
})
</script>
<style>
 .v-pagination__item {
     .v-btn--variant-plain, .v-btn--variant-outlined, .v-btn--variant-text, .v-btn--variant-tonal {
        background: inherit !important;
        background-color:  inherit !important;
     }
     .v-btn {
        border-width: 1px !important;
        
     }
}
.v-pagination .v-btn {
    border-radius: 9px !important;
}
 .v-pagination__item--is-active {
     .v-btn--variant-plain, .v-btn--variant-outlined, .v-btn--variant-text, .v-btn--variant-tonal {
        background: #0C2748 !important;
        background-color: #0C2748 !important;
     }
}
</style>