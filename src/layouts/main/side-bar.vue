<template>
      <v-navigation-drawer
        color="dark-blue"
        class="text-white"
        permanent
        app
      >
        <v-list class="mt-5" height="95%" min-height="30" v-model:opened="open" dense>
          <v-list-item
              v-model="selectedItem"
              mandatory
              class="height-100 w-100"
            >
            <div v-for="(item, index) in sidebarRoutes"
              :key="index">
              <v-list-item
                v-if="item.path !== undefined"
                :value="item.title"
                class="height-10-per mx-auto white-active"
                @click="go(item.path, index)"
              >
              <v-list-item-title class="size-25">
                      {{item.title}}
              </v-list-item-title>
              <template v-slot:prepend>
                <v-list-item-icon class="my-auto mr-4 height-unset">
                  <img width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                </v-list-item-icon>
              </template>
              </v-list-item>
              <!--group-->
              <v-list-group v-else>
                
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                  >
                    <v-list-group-title class="size-25">
                      {{item.title}}
                    </v-list-group-title>
                    <template v-slot:prepend>
                          <v-list-group-icon class="my-auto height-unset mr-4">
                            <img width="18" min-width="8" height="18" v-bind:src="iconUrl(item.icon)">
                          </v-list-group-icon>
                    </template>
                    <template v-slot:append>
                          <v-list-group-icon class="my-auto height-unset" style="height: 18px">
                            <img width="18" min-width="8" height="18" class="my-auto" src="@/assets/icons/arrow-circle-right.svg">
                          </v-list-group-icon>
                    </template>
                  </v-list-item>
                </template>

                  <v-list-item
                    v-for="([title, path], i) in item.subtitles"
                    :key="i"
                    :value="title"
                    class="white-active"
                    @click="go(path, index)"
                  >
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

  export default {
    data () {
      const store = useStore();
      return {
        drawer: true,
        rail: true,
        selectedItem: null,
        open: ['Book Management', 'Blog Management', 'Service requests',],
        sidebar: [
          {
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
            subtitles: [
                ['Translation', '/service-requests/translation'],
                ['Proofreading', '/service-requests/proofreading'],
                ['Creative editing', '/service-requests/creative-editing'],
                ['Literary agency', '/service-requests/literary-agency'],
                ['Marketing', '/service-requests/marketing'],
                ['Content writing', '/service-requests/content-writing'],
                ['Book delivery', '/service-requests/book-delivery'],
                ['Organizing events & conferences', '/service-requests/organizing-events-conferences'],
              ]
          },
        ],
        userRoles : computed(() => store.getters['User/user']?.roles),
        sidebarRoutes: [],
      }
    },
    methods: {
      go (route, index) {
        localStorage.setItem('sidebarCurrentItem', index)
        this.$router.push(route)
      },
      iconUrl (icon) {
        let im
        try {
          im = `../../assets/icons/${icon}.svg`
        } catch (err) {
          im = '@/assets/icons/logo.svg'
        }
        return new URL(`${im}`,import.meta.url).href
      },
      updateSideBarRoutes() {
        const mapedRoles = this.userRoles[0].name;
        this.sidebarRoutes = this.sidebar.filter((e) => {
          if (e.meta?.roles) {
            if (e.meta.roles.some((role) => mapedRoles.includes(role))) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        });
      },
    },
    watch: {
      getUnreadNotificationsStatus(newV) {
        this.linksData = this.sidebar.map((e) => {
          e['showBadge'] = newV[e.title];
          return e;
        });

        this.updateSideBarRoutes();
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