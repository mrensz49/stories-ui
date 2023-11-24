<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <div>
              <h2 class="text-h4 font-weight-bold">Categories</h2>

              <h4 class="text-h6">Select your favourite category.</h4>
            </div>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="6" lg="4"  v-for="category in categoryStore.categories" :key="category.id">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="50"
                  close-delay="50"
                >
                  <div>
                    <v-card
                      flat
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      hover
                      :to="'/category/'+category.slug"
                    >
                      <v-img
                        :src="getImageUrl(category.image)"
                        :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="200px"
                        class="elevation-2"
                        style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn color="accent">{{ category.category }}</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          {{ category.contents_count }} stories
                        </div>

                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
            <skeletonLoader v-if="categoryStore.loading"/>
          </div>
        </div>
      </v-col>

      <v-col>
        <div>
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { useCategoryStore } from '@/stores/category'

export default {
  name: "Category",

  mounted() {
      this.categoryStore.getCategories()
    },

    data() {
      return {
        categoryStore: useCategoryStore()
      }
    },

    components: {
      siderbar: () => import("@/components/details/sidebar"),
    },
};
</script>
