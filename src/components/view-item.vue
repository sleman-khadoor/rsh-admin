<template>
<div>
    <div v-if="props.loading">
        <div class="d-flex justify-center align-center" style="height: 270px">
            <v-progress-circular :size="50" :width="7" :color="$colors.choco" indeterminate></v-progress-circular>
        </div>
    </div>

    <v-card v-else class="card pa-8">
        <v-data-table hide-default-footer hover class="table">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.title" class="font-weight-bold size-16">
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="subItem in headers" :key="subItem.key" class="font-grey size-14">
                        <div>
                            {{ props.data?.[subItem.key] }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-data-table>
        <v-card-text>
            <h4 class="pb-2 size-16"> Message Content</h4>
            <p class="font-grey">{{ props.itemType =='contact'? props.data?.message : props.data?.description}}</p>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

    props: ['headers', 'actionsTable', 'data', 'meta', 'loading', 'itemKey', 'selectedContactRequest', 'itemType'],
    setup(props) {

        function itemRouteKey(item) {
            if (props.itemKey == 'translationSlug') {
                return item.slug.en;
            } else if (props.itemKey == 'slug') {
                return item.slug;
            } else {
                return item.id;
            }
        }
        return {
            props,
            itemRouteKey,
        }
    },
})
</script>

<style>
.v-table--density-default {
    --v-table-header-height: 10px;
    --v-table-row-height: 10px;
}

.loader {
    position: absolute;
    margin-left: 37%;
    margin-top: 8%;
}

.v-table .v-table__wrapper>table>thead>tr>th {
    border-bottom: unset
}

.v-table>.v-table__wrapper>table {
    width: 75%;
}

.card {
    min-height: 460px;
}
</style>
