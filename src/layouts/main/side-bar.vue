<template>
<v-navigation-drawer color="dark-blue" class="text-white" permanent app ref="nav">
    <v-list v-model:opened="open" class="mt-5 mr-3" height="95%" min-height="30" dense>
            <div v-for="(item, index) in sidebarRoutes" :key="index">
                <v-list-item :id="`item_${index}`" v-if="item.path !== undefined" :value="item.title" :class="(selectedItem === index) ? 'height-10-per mx-auto v-list-item--active white-active' : 'height-10-per mx-auto white-active'" @click="go(item.path, index)">
                    <v-list-item-title class="size-25">
                        {{item.title}}
                    </v-list-item-title>

                    <template v-slot:prepend>
                        <v-list-item-icon class="my-auto mr-4 height-unset">
                            <v-badge v-if="item.showBadge && item.notifyNum" color="error" :content="item.notifyNum">
                                <img class="mt-1" width="18" min-width="8" height="18" :src="iconUrl(item.icon,(selectedItem === index),item.path)">
                            </v-badge>
                            <img class="mt-1" v-else width="18" min-width="8" height="18" :src="iconUrl(item.icon,(selectedItem === index),item.path)">
                        </v-list-item-icon>
                    </template>
                </v-list-item>
                <!--group-->
                <v-list-group v-else :value="item.title">

                    <template v-slot:activator="{ props }">
                        <v-list-item @click="updateSidebarItem(index)" :class="selectedItem === index ? 'v-list-item--active white-active white-hidden' : ''" v-bind="props">
                            <v-list-group-title class="size-25">
                                {{item.title}}
                            </v-list-group-title>
                            <template v-slot:prepend>
                                <v-list-group-icon class="my-auto height-unset mr-4">
                                    <v-badge v-if="item.showBadge && item.notifyNum" color="error" :content="item.notifyNum">
                                        <img width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                                    </v-badge>
                                    <img v-else width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                                </v-list-group-icon>
                            </template>
                            <template v-slot:append>
                                <v-list-group-icon class="my-auto height-unset" style="height: 18px">
                                    <img width="18" min-width="8" height="18" class="my-auto" src="@/assets/icons/arrow-circle-right.svg">
                                </v-list-group-icon>
                            </template>
                        </v-list-item>
                    </template>

                    <v-list-item v-for="([title, path, showBadge, notifyNum], i) in item.subtitles" :key="i" :id="`item_${index}_${i}`" :value="title" :class="(tempSelectedItem === index && tempSelectedSubItem === i) ? ' v-list-item--active white-active' : (selectedItem !== index) ? 'white-hidden' : 'white-active'" @click="go(path, index, i, item.subtitles[i])">
                        <template v-if="showBadge && notifyNum" v-slot:append>
                            <v-badge color="error" :content="notifyNum" inline></v-badge>
                        </template>
                        <v-list-item-title class="size-18">
                            {{title}}
                        </v-list-item-title>
                    </v-list-item>

                </v-list-group>
            </div>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import roles from '@/utils/roles.js';
import { mapGetters } from 'vuex';

export default {
    data() {
        const store = useStore();
        return {
            drawer: true,
            rail: true,
            selectedItem: null,
            selectedSubItem: null,
            tempSelectedItem: null,
            tempSelectedSubItem: null,
            open: [],
            sidebar: [{
                    title: 'Book Management',
                    icon: 'book',
                    meta: {
                        roles: [roles.super_admin, roles.books_admin],
                    },
                    subtitles: [
                        ['Book categories', '/book-categories'],
                        ['Authors', '/authors'],
                        ['Books', '/books'],
                    ]
                },
                {
                    title: 'Blog Management',
                    icon: 'blog',
                    meta: {
                        roles: [roles.super_admin, roles.blogs_admin],
                    },
                    subtitles: [
                        ['Blog categories', '/blog-categories'],
                        ['Blogs', '/blogs'],
                    ]
                },
                {
                    title: 'News',
                    path: '/news',
                    icon: 'news',
                    meta: {
                        roles: [roles.super_admin, roles.news_admin],
                    },
                },
                {
                    title: 'User Management',
                    path: '/users',
                    icon: 'user-managment',
                    meta: {
                        roles: [roles.super_admin, roles.users_admin],
                    },
                },
                {
                    title: 'Represented Authors',
                    path: '/represented-authors',
                    icon: 'user-tag',
                    meta: {
                        roles: [roles.super_admin, roles.contacts_admin],
                    },
                },
                {
                    title: 'Our Partners',
                    path: '/partners',
                    icon: 'partner',
                    meta: {
                        roles: [roles.super_admin, roles.contacts_admin],
                    },
                },
                {
                    title: 'Achievements',
                    path: '/achievements',
                    icon: 'award',
                    meta: {
                        roles: [roles.super_admin, roles.contacts_admin],
                    },
                },
                {
                    title: 'Contact Information',
                    path: '/contacts',
                    icon: 'contact',
                    meta: {
                        roles: [roles.super_admin, roles.contacts_admin],
                    },
                },
                {
                    title: 'Contact Us',
                    path: '/contact-requests',
                    icon: 'sms',
                    showBadge: 'contactUs',
                    notifyNum: 0,
                    meta: {
                        roles: [roles.super_admin, roles.services_admin],
                    },
                },
                {
                    title: 'Service requests',
                    icon: 'requests',
                    meta: {
                        roles: [roles.super_admin, roles.services_admin],
                    },
                    showBadge: 'serviceRequests',
                    notifyNum: 0,
                    subtitles: [
                        ['Translation', '/service-requests/translation', 'translation'],
                        ['Proofreading', '/service-requests/proofreading', 'proofreading'],
                        ['Creative editing', '/service-requests/creative-editing', 'creativeEditing'],
                        ['Literary agency', '/service-requests/literary-agency', 'literaryAgency'],
                        ['Marketing', '/service-requests/marketing', 'marketing'],
                        ['Content writing', '/service-requests/content-writing', 'contentWriting'],
                        ['Book delivery', '/service-requests/book-delivery', 'bookDelivery'],
                        ['Organizing events & conferences', '/service-requests/organizing-events-conferences', 'organizingEventsAndConferences'],
                    ]
                },
            ],
            userRoles: computed(() => store.getters['User/user']?.roles),
            sidebarRoutes: [],
        }
    },
    computed: {
        ...mapGetters('Core', ['getUnreadNotificationsStatus']),
    },
    methods: {
        updateSidebarItem(index) {
            localStorage.setItem('sidebarCurrentItem', index)
            this.selectedItem = index
        },
        go(route, index, i = null, element) {
            let list = document.getElementsByClassName('v-list-item v-list-item--active')
            if(list && list.length) {
                let i = 0
                for(i; i< list.length; i++) {
                    list[i].classList.remove('v-list-item--active');
                }
            }
            let currentElement = i !== null ? document.getElementById(`item_${index}_${i}`) : document.getElementById(`item_${index}`)
            currentElement.classList.add('v-list-item--active')
            this.tempSelectedItem = null
            this.tempSelectedSubItem = null
            localStorage.setItem('sidebarCurrentItem', index )
            i ? localStorage.setItem('sidebarCurrentSubItem', i) : localStorage.setItem('sidebarCurrentSubItem', 0)
            this.$router.push(route)
            this.selectedItem = index
            this.selectedSubItem = i            
            if (element && element.length > 3 && element[3] != null) {
                element[3] = 0;
            }
            console.log(element);
        },
        iconUrl(icon, isBlue, itemPath) {
            let im
            try {
                if(!isBlue || !(this.$route.path === itemPath)) {
                    im = new URL(`../../assets/icons/${icon}.svg`, import.meta.url).href
                } else {
                    im = new URL(`../../assets/icons/${icon}-blue.svg`, import.meta.url).href
                }
                
            } catch (err) {
                im = '@/assets/icons/logo.svg'
            }
            return new URL(`${im}`,
                import.meta.url).href
        },
        updateSideBarRoutes() {
            const mapedRoles = this.userRoles.map(role => {
                return role.name;
            });
            this.sidebarRoutes = [];
            this.sidebar.forEach((e) => {
                if (e.meta?.roles) {
                    if (e.meta.roles.some((role) => mapedRoles.includes(role))) {
                        this.sidebarRoutes.push(e);
                    }
                } else {
                    this.sidebarRoutes.push(e);
                }
            });
        },
    },
    watch: {
        getUnreadNotificationsStatus(newV) {
            this.sidebar = this.sidebar.map((e) => {
                if (e.subtitles && e.subtitles.length) {
                    let sumNotify = 0
                    e.showBadge ? e.subtitles.forEach(element => {
                        if (newV[element[2]] && newV[element[2]] !== undefined) {
                            element[3] = newV[element[2]]
                            sumNotify = sumNotify + newV[element[2]]
                        }
                    }) : null;
                    e.notifyNum = sumNotify
                } else {
                    e.showBadge ? e.notifyNum = newV[e.showBadge] : null;
                }
                return e;
            });
        },
    },
    beforeMount() {
        this.selectedItem = Number(localStorage.getItem('sidebarCurrentItem'));
        this.selectedSubItem = Number(localStorage.getItem('sidebarCurrentSubItem'));
        this.tempSelectedItem = this.selectedItem
        this.tempSelectedSubItem = this.selectedSubItem
        this.updateSideBarRoutes();
        this.open.push(this.sidebarRoutes[this.selectedItem]?.title)
    },

}
</script>

<style>
.v-list-item--density-default.v-list-item--one-line {
    min-height: 30px !important;
    padding-top: 4px;
    padding-bottom: 4px;
}

.white-active.v-list-item--active {
    background-color: white !important;
    color: #0C2748;
    border-radius: 0 20px 20px 0 !important;
}
.white-active.v-list-item--active.white-hidden {
    background-color: unset !important;
    color: unset !important;
    border-radius: unset !important;
}

.v-list-group__items .v-list-item {
    padding-inline-start: 50px !important;
}
</style>
