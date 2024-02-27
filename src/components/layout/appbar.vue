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
        <span v-for="(item, i) in btnItemsMobile" :key="'nav_' + i">
          <template v-if="item.text == 'Search'">
            <v-list-item
              :href="item.href"
              :target="item.target"
              :to="item.to"
              link
              @click="btnProcess(item.path)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-if="item.text == 'Why Login?' && !authStore.is_logged_in">
            <v-list-item
              :href="item.href"
              :target="item.target"
              :to="item.to"
              link
              @click="btnProcess(item.path)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-if="item.text == 'Logout' && authStore.is_logged_in">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  v-bind="attrs"
                  v-on="on"
                  class="text-capitalize ml-1 mt-4"
                >
                  <v-icon class="mr-1">mdi-account-circle</v-icon>
                  {{ authStore.user?.name }}
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  ><v-list-item-title
                    class="ml-3 mr-3 pointer"
                    @click="btnProcess(item.path)"
                    ><v-icon small>mdi-logout</v-icon> Logout</v-list-item-title
                  ></v-list-item
                >
              </v-list>
            </v-menu>
          </template>
        </span>

        <span v-for="(item, i) in barItems" :key="'bar_' + i">
          <template v-if="item.title == 'Dashboard' && authStore.is_logged_in">
            <v-list-item
              :href="item.href"
              :target="item.target"
              :to="item.to"
              link
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-if="item.title != 'Dashboard'">
            <v-list-item
              :href="item.href"
              :target="item.target"
              :to="item.to"
              link
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </span>
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
          <v-col class="d-flex align-center" cols="12" md="3" lg="3">
            <v-app-bar-nav-icon
              v-if="!$vuetify.breakpoint.mdAndUp"
              @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
              class="font-weight-bold text-h5 primary--text"
              style="cursor: pointer"
              @click="$router.push('/').catch(() => {})"
            >
              <v-img
                width="175px"
                :src="require('/images/logo/storiesforyou-logo.png')"
              ></v-img>
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="5">
            <span v-for="(item, i) in barItems" :key="'bi_' + i">
              <template
                v-if="item.title == 'Dashboard' && authStore.is_logged_in"
              >
                <v-btn
                  :to="item.to"
                  class="text-capitalize"
                  exact
                  exact-active-class="accent--text"
                  text
                >
                  {{ item.title }}
                </v-btn>
              </template>

              <template v-if="item.title != 'Dashboard'">
                <v-btn
                  :to="item.to"
                  class="text-capitalize"
                  exact
                  exact-active-class="accent--text"
                  text
                >
                  {{ item.title }}
                </v-btn>
              </template>
            </span>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-right">
            <span v-for="(item, i) in btnItems" :key="'btn_' + i">
              <span v-if="item.text == 'Search'">
                <v-btn
                  :color="item.color"
                  :outlined="item.outlined"
                  class="ml-3 text-capitalize"
                  @click="btnProcess(item.path)"
                >
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-btn>
              </span>
              <span v-if="item.text == 'Why Login?' && !authStore.is_logged_in">
                <v-btn
                  :color="item.color"
                  :outlined="item.outlined"
                  class="ml-3 text-capitalize"
                  @click="btnProcess(item.path)"
                >
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-btn>
              </span>
              <span v-if="item.text == 'Logout' && authStore.is_logged_in">
                <!-- <v-btn
                    :color="item.color"
                    :outlined="item.outlined"
                    class="ml-3 text-capitalize"
                    @click="btnProcess(item.path)"
                >
                  
                  {{ item.text }}
                </v-btn> -->
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="warning"
                      v-bind="attrs"
                      v-on="on"
                      class="text-capitalize ml-1"
                    >
                      <v-icon class="mr-1">mdi-account-circle</v-icon>
                      {{ authStore.user?.name }}
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <!-- <v-list-item><v-list-item-title class="ml-3 mr-3 pointer"><v-icon small>mdi-cog</v-icon> Profile</v-list-item-title></v-list-item> -->
                    <v-list-item
                      ><v-list-item-title
                        class="ml-3 mr-3 pointer"
                        @click="btnProcess(item.path)"
                        ><v-icon small>mdi-logout</v-icon>
                        Logout</v-list-item-title
                      ></v-list-item
                    >
                  </v-list>
                </v-menu>
              </span>
            </span>
          </v-col>
        </v-row>
      </v-container>
      <searchModal />
    </v-app-bar>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";
import { useAuthStore } from "@/stores/auth";

export default {
  data: () => ({
    categoryStore: useCategoryStore(),
    authStore: useAuthStore(),

    drawer: null,
    btnItemsMobile: [
      {
        text: "Why Login?",
        color: "warning",
        icon: "mdi-account",
        path: "login",
      },
      {
        text: "Logout",
        color: "warning",
        icon: "mdi-logout",
        path: "logout",
      },
      {
        text: "Search",
        color: "primary",
        icon: "mdi-eye",
        path: "search",
      },
    ],
    btnItems: [
      {
        text: "Search",
        color: "primary",
        icon: "mdi-eye",
        path: "search",
      },
      {
        text: "Why Login?",
        color: "warning",
        icon: "mdi-account",
        path: "login",
      },
      {
        text: "Logout",
        color: "warning",
        icon: "mdi-logout",
        path: "logout",
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
    items: [{ title: "Profile" }, { title: "Logout" }],
  }),

  components: {
    searchModal: () => import("@/components/modals/Search"),
  },

  methods: {
    btnProcess(path) {
      if (path == "login") {
        this.$router.push("/" + path).catch((err) => {});
      } else if (path == "logout") {
        this.authStore.handleLogout();
      } else {
        this.categoryStore.searchDialog = true;
      }
    },
  },
};
</script>
