<template>
    <div>
      <v-row>
        <v-col cols="12" lg="8" xl="8">
          <div>
            <div>
              <div>
                <h2 class="text-h4 font-weight-bold">My Dashboard</h2>

                <h4 class="text-h6">Your recent and upcoming activities.</h4>
              </div>

              <v-divider class="my-4"></v-divider>

              <v-row>

                SOON to open!
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
