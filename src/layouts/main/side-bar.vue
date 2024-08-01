<template>
<v-navigation-drawer color="dark-blue" class="text-white" permanent app>
    <v-list class="mt-5" height="95%" min-height="30" v-model:opened="open" dense>
        <v-list-item v-model="selectedItem" mandatory class="height-100 w-100">
            <div v-for="(item, index) in sidebarRoutes" :key="index">
                <v-list-item v-if="item.path !== undefined" :value="item.title" class="height-10-per mx-auto white-active" @click="go(item.path, index)">
                    <v-list-item-title class="size-25">
                        {{item.title}}
                    </v-list-item-title>
                    <template v-slot:prepend>
                        <v-list-item-icon class="my-auto mr-4 height-unset">
                            <v-badge v-if="item.showBadge && item.notifyNum" color="error" :content="item.notifyNum">
                                <img width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                            </v-badge>
                            <img v-else width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                        </v-list-item-icon>
                    </template>
                </v-list-item>
                <!--group-->
                <v-list-group v-else>

                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">
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

                    <v-list-item v-for="([title, path, showBadge, notifyNum], i) in item.subtitles" :key="i" :value="title" class="white-active" @click="go(path, index, item.subtitles[i])">
                        <template v-if="showBadge && notifyNum" v-slot:append>
                            <v-badge color="error" :content="notifyNum" inline></v-badge>
                        </template>
                        <v-list-item-title class="size-18">
                            {{title}}
                        </v-list-item-title>
                    </v-list-item>

                </v-list-group>
            </div>
        </v-list-item>
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
            open: ['Book Management', 'Blog Management', 'Service requests', ],
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
                        roles: [roles.super_admin, roles.represented_authors_admin],
                    },
                },
                {
                    title: 'Our Partners',
                    path: '/partners',
                    icon: 'partner',
                    meta: {
                        roles: [roles.super_admin, roles.partners_admin],
                    },
                },
                {
                    title: 'Achievements',
                    path: '/achievements',
                    icon: 'award',
                    meta: {
                        roles: [roles.super_admin, roles.achievements_admin],
                    },
                },
                {
                    title: 'Contact Information',
                    path: '/contacts',
                    icon: 'contact',
                    meta: {
                        roles: [roles.super_admin, roles.about_admin],
                    },
                },
                {
                    title: 'Contact Us',
                    path: '/contact-requests',
                    icon: 'sms',
                    showBadge: 'contactUs',
                    notifyNum: 0,
                    meta: {
                        roles: [roles.super_admin, roles.contacts_admin],
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
        go(route, index, element) {
            localStorage.setItem('sidebarCurrentItem', index)
            this.$router.push(route)
            element[3] = 0
        },
        iconUrl(icon) {
            let im
            try {
                im = `../../assets/icons/${icon}.svg`
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
    mounted() {
        this.selectedItem = Number(localStorage.getItem('sidebarCurrentItem'))
        this.updateSideBarRoutes();
    }
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

.v-list-group__items .v-list-item {
    padding-inline-start: 50px !important;
}
</style>
