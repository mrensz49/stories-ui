<template>
  <div>
    <h2 class="text-h5 font-weight-bold">Latest Posts</h2>

    <v-carousel v-model="model">
      <v-carousel-item
        v-for="latest5 in categoryStore.latest5"
        :key="latest5.id"
      >
        <!-- :color="color" -->
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              :aspect-ratio="16 / 9"
              height="100%"
              :src="getPublicImage(latest5.image)"
            >
              <div
                class="d-flex flex-column justify-space-between fill-height pt-2 ps-2"
              >
                <v-card-text>
                  <v-btn
                    color="warning"
                    small
                    :to="
                      '/category/' +
                      latest5.category.slug +
                      '?q=' +
                      latest5.title_slug
                    "
                  >
                    <small>{{ latest5.title }}</small>
                  </v-btn>
                </v-card-text>
              </div>
            </v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  name: "LatestPost",

  data() {
    return {
      categoryStore: useCategoryStore(),

      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    };
  },
};
</script>
