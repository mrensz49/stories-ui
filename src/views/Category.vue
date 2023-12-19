<template>
    <div >

      <v-row v-if="typeof categoryStore.category.category !== 'undefined'">
        <v-col cols="12" lg="8" xl="8">
          <progressCircular v-if="categoryStore.loading_page"/>
          <div v-if="!this.$route.query.q">
            <div>
                <v-img
                  :src="getImageUrl(categoryStore.category.category.image)"
                  :aspect-ratio="16 / 5"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
                  dark
                >
                <v-card-text class="fill-height d-flex align-end">
                  <v-row class="flex-column">
                    <v-col cols="12" lg="8" md="10" xl="7">
                      <h2 class="text-h3 py-3" style="line-height: 1.2">
                        Reading is a journey, and every story is a new destination.
                      </h2>
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-img>

                <div class="py-4">
                    <v-btn color="accent">{{ categoryStore.category.category.category }}</v-btn>
                </div>

                <v-row v-for="cat in categoryStore.category.contents.data" :key="cat.id" class="py-2">
                  <v-col cols="12" md="2">
                    <v-card flat height="100%" :to="'/category/'+categoryStore.category.category.slug+'?q='+cat.title_slug">
                      <v-img
                          :aspect-ratio="16 / 9"
                          :src="getPublicImage(cat.image)"
                          alt="No Image"
                      ></v-img>

                    </v-card>
                  </v-col>

                  <v-col>
                    <a @click="newPage(categoryStore.category.category.slug, cat.title_slug)">
                      <h3 class="text-h5 text--secondary font-weight-bold"> <!-- pt-3 -->
                        {{ cat.title }}
                      </h3>
                    </a>
                    <!-- <v-divider class="my-4"></v-divider> -->
                  </v-col>

                </v-row>
              </div>
              <div>

              <v-row justify="space-between">
                <v-col cols="6" md="6" lg="6" sm="6">
                  <a class="align-center"
                    @click="categoryStore.getNewPage({
                        name: categoryStore.category.category.slug,
                        page: parseInt(categoryStore.category.contents.current_page) - 1
                      })"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                    <div class="text-h6 primary--text pl-2">
                      <div class="text-subtitle-1">Previous Page</div>
                    </div>
                  </a>
                </v-col>

                <v-col cols="6" md="6" lg="6" sm="6">
                  <div class="align-center text-right">
                    <a class="text-h6 primary--text pr-2"
                      @click="categoryStore.getNewPage({
                        name: categoryStore.category.category.slug,
                        page: parseInt(categoryStore.category.contents.current_page) + 1
                      })"
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                      <div class="text-subtitle-1">Next Page</div>
                    </a>
                  </div>
                </v-col>

              </v-row>

          </div>
        </div>

        <story v-if="this.$route.query.q"/>
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
        this.categoryStore.getCategory(this.$route.params?.name)
      },

      data() {
        return {
          categoryStore: useCategoryStore()
        }
      },

      methods: {

        newPage(name, title) {
          this.$router.push('./'+name+'?q='+title)
        }
      },

      components: {
        siderbar: () => import("@/components/details/sidebar"),
        story: () => import("@/views/Content"),
      },

      watch:{
        "$route" : function(){
          if (this.$route.params.name) {
            this.categoryStore.getNewPage({
              name: this.$route.params.name,
              page: parseInt(this.categoryStore.category.contents.current_page)
            })
          }
          else{
            this.categoryStore.getCategory(this.$route.params.name)
          }

        }
      },
  };
  </script>
