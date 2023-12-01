<template>
  <div>
    <div>
      <v-card>
        <v-img
            :aspect-ratio="16 / 9"
            dark
            gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
            height="500px"
            :src="require('/images/banner.jpg')"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">
                  You will learn most things by looking, but reading gives understanding.
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
                <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-feather</v-icon>
                </v-avatar>

                <div class="text-h6 pl-2">Paul Rand</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Recommended For You</h2>

            <v-row>
              <template v-for="recommended in categoryStore.data">
                <template v-for="contents in recommended">
                      <recommended :content="contents" />
                  </template>
                </template>
            </v-row>
            <skeletonLoader v-if="categoryStore.loading_rec"/>
          </div>

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Featured Moral Lesson</h2>

            <v-row>
              <v-col v-for="moral in categoryStore.moral_lesson3" :key="moral.id" cols="12" lg="6" md="6" xl="4">
                <v-card dark flat :to="'/category/'+moral.category.slug+'?q='+moral.title_slug">
                  <v-img
                      :aspect-ratio="16 / 9"
                      class="elevation-2 fill-height"
                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                      height="600px"
                      :src="require('/images/moral_lesson.jpg')"
                      >
                    <div
                        class="d-flex flex-column justify-space-between fill-height"
                    >
                      <v-card-text>
                        <v-btn color="accent">
                            <small>{{ moral.title.substring(0,41) }}</small>
                          </v-btn>
                      </v-card-text>

                      <v-card-text>
                        <div
                            class="text-h5 py-3 font-weight-bold"
                            style="line-height: 1.2"
                            v-html="moral.moral_lesson.substring(0,300)+'...'"
                        ></div>

                      </v-card-text>
                    </div>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold">Latest Posts</h2>

            <div>
              <v-row v-for="latest5 in categoryStore.latest5" :key="latest5.id" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%"
                    :to="'/category/'+latest5.category.slug+'?q='+latest5.title_slug"
                  >
                    <v-img
                        :aspect-ratio="16 / 9"
                        height="100%"
                        :src="getImageUrl(latest5.category.image)"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
                    <v-btn color="accent" depressed :to="'/category/'+latest5.category.slug">{{ latest5.category.category }}</v-btn>

                    <h3 class="text-h4 font-weight-bold pt-3">
                      {{ latest5.title }}
                    </h3>

                    <div class="text-h6 font-weight-regular pt-3 text--secondary" v-html="latest5.data.substring(0,250)+'...'"></div>
                    <!--
                    <div class="d-flex align-center">
                      <v-avatar color="accent" size="36">
                        <v-icon dark>mdi-feather</v-icon>
                      </v-avatar>

                      <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                    </div> -->
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="pt-16">
          <siderbar/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { useCategoryStore } from '@/stores/category'

export default {
  name: "Home",

  mounted() {
    this.categoryStore.getRecommended()
    this.categoryStore.getLatest5()
    this.categoryStore.moralLesson3()
  },

  data() {
    return {
      categoryStore: useCategoryStore()
    }
  },

  components: {
    siderbar: () => import("@/components/details/sidebar"),
    recommended: () => import("@/components/cards/recommended"),
  },
};
</script>
