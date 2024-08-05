<template>
<div>
    <div v-if="props.loading">
        <div class="d-flex justify-center align-center" style="height: 270px">
            <v-progress-circular :size="50" :width="7" :color="$colors.choco" indeterminate></v-progress-circular>
        </div>
    </div>

    <v-card v-else class="card pa-8">
        <v-row class="justify-space-between px-4">
            <v-col lg="3" md="6" sm="12" v-for="header in headers" :key="header.title">
                <span class="font-weight-bold size-16">{{ header.title }}</span>
                <br/>
                <span class="font-grey size-14">{{props.data?.[header.key]}}</span>
            </v-col>
        </v-row>
        <v-card-text>
            <h4 class="pb-2 size-16"> Message Content</h4>
            <p class="font-grey">{{ props.itemType =='contact'? props.data?.message : props.data?.description}}</p>
        </v-card-text>
        <v-container v-if="props.data?.documents">
            <h4 class="pb-2 size-16 mb-2">Attachments</h4>
            <div class="d-flex flex-wrap">
                <div class="col ma-1" v-for="(attachment, index) in props.data.documents" :key="index" @click="downloadAttachment(attachment)">
                    <div :class="'img-container'" @click="clickInputFile" style="position: relative; height: 200px;">
                        <div class="w-mc ma-auto h-100 d-flex justify-center align-center pa-2" style="height: 200%; width: 100%;">
                            <img ref="imgRef" :src="getAttachment(attachment)" class="my-auto" style="width: 100%; height: 100%; object-fit: contain;" />
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </v-card>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { baseUrl } from '@/utils/axios';

export default defineComponent({
    props: ['headers', 'actionsTable', 'data', 'meta', 'loading', 'itemKey', 'selectedContactRequest', 'itemType'],
    data() {
        baseUrl
    },
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

        function getAttachment(attachment) {
            const extension = this.getFileExtension(attachment.document_link);
            if (extension === 'pdf') {
                return '/src/assets/images/pdf.png';
            }else if (extension === 'docx' || extension === 'doc') {
                return '/src/assets/images/docx.png';
            }else if (extension === 'xlsx' || extension === 'xls') {
                return '/src/assets/images/xlsx.png';
            }else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                return baseUrl + attachment.document_link;
            }
        }

        function getFileExtension(url) {
            return url.split('.').pop().toLowerCase();
        }

        function downloadAttachment(attachment) {
            const download = attachment.document_link;
            const href = baseUrl + download;
            const element_link = document.createElement("a");
            element_link.href = href;
            element_link.target = "_blank";
            document.body.appendChild(element_link);
            element_link.click();
            document.body.removeChild(element_link);
        }

        return {
            props,
            itemRouteKey,
            getAttachment,
            getFileExtension,
            downloadAttachment,
        }
    },
})
</script>

<style scoped>
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

.img-container {
    height: 25vh !important;
    border: 1px solid rgba(118, 118, 118) !important;
}
</style>
