<template>
  <div>
    <v-navigation-drawer
        v-if="!$vuetify.breakpoint.smAndUp"
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color="primary"
        dark
    >
      <v-list color="primary" nav>
        <v-list-item
            v-for="(item, i) in btnItems"
            :key="'nav_'+i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
            @click="categoryStore.searchDialog = true"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in barItems"
            :key="'bar_'+i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="#f5ecbc"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon
                v-if="!$vuetify.breakpoint.mdAndUp"
                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/').catch(()=>{})"
            >
              <v-icon color="warning" large>mdi-book</v-icon>
              Stories
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
            <v-btn
                v-for="(item, i) in barItems"
                :key="'bi_'+i"
                :to="item.to"
                class="text-capitalize"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn
            >
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <v-btn
                v-for="(item, i) in btnItems"
                :key="'btn_'+i"
                :color="item.color"
                :outlined="item.outlined"
                class="ml-3 text-capitalize"
                @click="btnProcess(item.path)"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-btn>

          </v-col>
        </v-row>
      </v-container>
      <searchModal/>
    </v-app-bar>
  </div>
</template>

<script>

import { useCategoryStore } from '@/stores/category'

export default {
  data: () => ({
    categoryStore: useCategoryStore(),

    drawer: null,
    btnItems: [
      {
        text: "Search",
        color: "primary",
        icon: "mdi-eye",
        path: 'search'
      },
      {
        text: "Why Login?",
        color: "warning",
        icon: "mdi-account",
        path: 'login'
      },
    ],
    barItems: [
      {
        title: "Dashboard",
        to: "/dashboard",
      },
      {
        title: "Home",
        to: "/",
      },
      {
        title: "Category",
        to: "/categories",
      },
      {
        title: "Moral Lesson",
        to: "/moral-lesson",
      },
    ],
  }),

  components: {
    searchModal: () => import("@/components/modals/Search"),
  },

  methods: {
    btnProcess(path) {
      if (path == 'login') {
        this.$router.push('/'+path).catch(err => {});
      }
      else {
        this.categoryStore.searchDialog = true
      }
    }
  },

};
</script>
