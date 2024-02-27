<template>
  <span>
    <v-btn
      @click="
        categoryStore.postReaction({
          id: categoryStore.story.story.id,
          type: 'like',
        })
      "
      class="mx-1"
      fab
      dark
      small
      color="info"
      :loading="
        categoryStore.loading_reaction[0]?.reaction == 'like' ? true : false
      "
    >
      <v-icon dark small>mdi-thumb-up</v-icon>
    </v-btn>

    <v-btn
      class="mx-1"
      fab
      dark
      small
      color="pink"
      :loading="
        categoryStore.loading_reaction[0]?.reaction == 'love' ? true : false
      "
      @click="
        categoryStore.postReaction({
          id: categoryStore.story.story.id,
          type: 'love',
        })
      "
    >
      <v-icon dark small>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      class="mx-1"
      fab
      dark
      small
      color="#FF891B"
      :loading="
        categoryStore.loading_reaction[0]?.reaction == 'happy' ? true : false
      "
      @click="
        categoryStore.postReaction({
          id: categoryStore.story.story.id,
          type: 'happy',
        })
      "
    >
      <v-icon dark>mdi-emoticon-happy-outline</v-icon>
    </v-btn>

    <v-btn
      class="mx-1"
      fab
      dark
      small
      color="orange"
      :loading="
        categoryStore.loading_reaction[0]?.reaction == 'sad' ? true : false
      "
      @click="
        categoryStore.postReaction({
          id: categoryStore.story.story.id,
          type: 'sad',
        })
      "
    >
      <v-icon dark>mdi-emoticon-sad-outline</v-icon>
    </v-btn>

    <v-btn
      class="mx-1"
      fab
      dark
      small
      color="red"
      :loading="
        categoryStore.loading_reaction[0]?.reaction == 'angry' ? true : false
      "
      @click="
        categoryStore.postReaction({
          id: categoryStore.story.story.id,
          type: 'angry',
        })
      "
    >
      <v-icon dark>mdi-emoticon-angry-outline</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  name: "reaction",

  data() {
    return {
      categoryStore: useCategoryStore(),
    };
  },
};
</script>
