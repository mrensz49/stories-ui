<template>
  <v-app>
    <AppBar></AppBar>

    <v-container class="mt-16">
      <v-row justify="center" align="center">
        <v-col lg="10" md="10" sm="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
   
    <AddToHomeBtn></AddToHomeBtn>
    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/appbar.vue"),
    Footer: () => import("@/components/layout/footer.vue"),
    AddToHomeBtn: () => import("@/components/helpers/AddToHomeBtn.vue"),

  },
  data: () => ({}),
};
</script>
