<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <h1 class="text-h4 font-weight-bold">Moral Lesson</h1>

            <h4 class="text-h6">
              The lessons that we learn from our experiences, from the stories
              that we are told, and from the people that we meet. They teach us
              about right and wrong, about good and evil, and about how to live
              a good and meaningful life.
            </h4>
          </div>

          <v-divider class="my-4"></v-divider>
          <div>
            <div>
              <progressCircular v-if="categoryStore.loading" />
              <v-row
                v-for="moral_lesson in categoryStore.moral_lessons.data"
                :key="moral_lesson.id"
              >
                <v-col cols="12" md="3">
                  <v-card
                    flat
                    height="100%"
                    :to="
                      '/category/' +
                      moral_lesson.category.slug +
                      '?q=' +
                      moral_lesson.title_slug
                    "
                  >
                    <v-img
                      :aspect-ratio="16 / 9"
                      height="100%"
                      :src="getPublicImageThumbnail(moral_lesson.image)"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
                    <v-btn
                      color="accent"
                      depressed
                      :to="'/category/' + moral_lesson.category.slug"
                      >{{ moral_lesson.category.category }}</v-btn
                    >

                    <router-link
                      :to="
                        '/category/' +
                        moral_lesson.category.slug +
                        '?q=' +
                        moral_lesson.title_slug
                      "
                      class="text-decoration-none"
                    >
                      <h3 class="text-h4 font-weight-bold pt-3">
                        {{ moral_lesson.title }}
                      </h3>
                    </router-link>

                    <div
                      class="text-body-1 font-weight-regular pt-3 text--secondary"
                      v-html="
                        $options.filters.formatText(moral_lesson.moral_lesson.substring(0, 200) + '...')
                      "
                    ></div>
                  </div>
                </v-col>
              </v-row>

              <v-row justify="space-between" class="mb-2">
                <v-col cols="6" md="6" lg="6" sm="6">
                  <a
                    class="align-center"
                    @click="
                      categoryStore.getMoralLesson(
                        parseInt(categoryStore.moral_lessons.current_page) - 1,
                      )
                    "
                    v-if="categoryStore.moral_lessons.current_page != 1"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                    <div class="text-h6 primary--text pl-2">
                      <div class="text-subtitle-1">Previous Page</div>
                    </div>
                  </a>
                </v-col>

                <v-col cols="6" md="6" lg="6" sm="6">
                  <div
                    class="align-center text-right"
                    v-if="
                      categoryStore.moral_lessons.current_page !=
                      categoryStore.moral_lessons.last_page
                    "
                  >
                    <a
                      class="text-h6 primary--text pr-2"
                      @click="
                        categoryStore.getMoralLesson(
                          parseInt(categoryStore.moral_lessons.current_page) +
                            1,
                        )
                      "
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                      <div class="text-subtitle-1">Next Page</div>
                    </a>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="pt-3">
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  name: "Home",

  mounted() {
    this.categoryStore.getMoralLesson(1);
  },

  data() {
    return {
      categoryStore: useCategoryStore(),
    };
  },

  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
