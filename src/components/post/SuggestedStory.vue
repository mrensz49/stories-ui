<template>
  <div>
    <v-divider class="my-12"></v-divider>

    <v-row justify="space-between">
      <v-col cols="12" md="6" lg="5" sm="6">
        <router-link
          :to="
            '/category/' +
            categoryStore.story.previous.category.slug +
            '?q=' +
            categoryStore.story.previous.title_slug
          "
          class="text-decoration-none"
        >
          <div class="d-flex align-center">
            <div>
              <v-icon>mdi-arrow-left</v-icon>
            </div>

            <div class="text-h6 primary--text pl-2">
              <div class="text-subtitle-2">Previous Story</div>
              {{ categoryStore.story.previous.title }} (<small>{{
                categoryStore.story.previous.category.category
              }}</small
              >)
            </div>
          </div>
        </router-link>
      </v-col>

      <v-col cols="12" md="6" lg="5" sm="6">
        <router-link
          :to="
            '/category/' +
            categoryStore.story.next.category.slug +
            '?q=' +
            categoryStore.story.next.title_slug
          "
          class="text-decoration-none"
        >
          <div class="d-flex align-center text-right">
            <div class="text-h6 primary--text pr-2">
              <div class="text-subtitle-2">Next Story</div>
              {{ categoryStore.story.next.title }} (<small>{{
                categoryStore.story.next.category.category
              }}</small
              >)
            </div>

            <div>
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  data() {
    return {
      categoryStore: useCategoryStore(),
    };
  },
};
</script>
