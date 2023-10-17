<template>
    <div >

      <v-row v-if="typeof categoryStore.category.category !== 'undefined'">
        <v-col cols="12" lg="12" xl="8">
          <div v-if="!this.$route.query.q">
            <div>
                <v-img
                  :src="'/images/bg/' + categoryStore.category.category.image"
                  :aspect-ratio="16 / 9"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
                ></v-img>

                <div class="py-4">
                    <v-btn color="accent">{{ categoryStore.category.category.category }}</v-btn>
                </div>

                <v-row v-for="cat in categoryStore.category.contents.data" :key="cat.id" class="py-2">
                  <v-col cols="12" md="2">
                    <v-card flat height="100%" :to="'/category/'+categoryStore.category.category.slug+'?q='+cat.title_slug">
                      <v-img
                          :aspect-ratio="16 / 9"
                          :src="'/images/bg/' + categoryStore.category.category.image"
                          height="100%"
                      ></v-img>
                    </v-card>
                  </v-col>

                  <v-col>
                    <a @click="newPage(categoryStore.category.category.slug, cat.title_slug)">
                      <h3 class="text-h5 text--secondary font-weight-bold pt-3">
                        {{ cat.title }}
                      </h3>
                    </a>
                  </v-col>
                </v-row>
              </div>
              <div>

              <v-row justify="space-between" class="mb-2">
                <v-col cols="12" md="6" lg="4">
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

                <v-col cols="12" md="6" lg="4">
                  <div class="align-center text-right">
                    <v-icon>mdi-arrow-right</v-icon>
                    <a class="text-h6 primary--text pr-2"
                      @click="categoryStore.getNewPage({
                        name: categoryStore.category.category.slug,
                        page: parseInt(categoryStore.category.contents.current_page) + 1
                      })"
                    >
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
      <v-col cols="8" lg="8" xl="8">
        <skeletonLoaderCard v-if="categoryStore.loading"/>
      </v-col>
    </div>
  </template>

  <script>

  import { useCategoryStore } from '@/stores/category'

  export default {
    name: "Category",

    mounted() {
        this.categoryStore.getCategory(this.$route.params.name)
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
              name: this.categoryStore.category.category.slug,
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
