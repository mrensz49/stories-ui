<template>
  <div>
    <skeleton-article v-if="categoryStore.loading" />
    <div
      v-if="
        typeof categoryStore.story.category !== 'undefined' &&
        !categoryStore.loading
      "
    >
      <v-card color="grey lighten-4">
        <v-img
          v-if="categoryStore.story.story.image"
          :src="getPublicImage(categoryStore.story.story.image)"
          width="100%"
        ></v-img>
        <v-card-text>
          <div>
            <v-btn
              color="accent"
              :to="'/category/' + categoryStore.category.category.slug"
              >{{ categoryStore.story.category.category }}</v-btn
            >
          </div>

          <div class="text-h7 font-weight-bold primary--text pt-4">
            <h1>{{ categoryStore.story.story.title }}</h1>
          </div>

          <v-divider class="my-4"></v-divider>

          <v-card flat color="transparent">
            <v-card-text>

              <div
                class="text-subtitle-1 primary--text text-justify"
                v-html="$options.filters.formatText(categoryStore.story.story.data)"
              ></div>              
            </v-card-text>
          </v-card>

          <h2 class="mt-7">Moral Lesson</h2>
          <div class="py-7">
            <v-alert
              class="text-justify"
              border="left"
              colored-border
              color="orange"
            >
              <div v-html="$options.filters.formatText(categoryStore.story.story.moral_lesson)"></div>
            </v-alert>
          </div>

          <!-- <v-divider class="my-2 pb-2" v-if="categoryStore.story.story.image_source"></v-divider> -->

          <v-row>
            <v-col cols="12" lg="8" md="8" sm="12">
              <div fluid class="pa-0">
                <div class="pl-2">
                  <reacted-by />
                </div>
                <button-reaction />
              </div>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12" class="text-right">
              <v-icon color="blue">mdi-share-variant-outline</v-icon>
              <ShareNetwork
                network="facebook"
                :url="url_share"
                :title="categoryStore.story.story.title"
                :description="descriptionSocial"
                quote="You will learn most things by looking, but reading gives understanding. - Paul Rand"
                hashtags="storiesforyou"
              >
                <v-btn
                  color="info"
                  class="text-capitalize ml-1"
                  small
                  type="submit"
                  outlined
                  dark
                  @open="open"
                  @change="change"
                  @close="close"
                >
                  <v-icon color="blue">mdi-facebook</v-icon>
                </v-btn>
              </ShareNetwork>

              <ShareNetwork
                network="twitter"
                :url="url_share"
                :title="categoryStore.story.story.title"
                :description="descriptionSocial"
                quote="You will learn most things by looking, but reading gives understanding. - Paul Rand"
                hashtags="storiesforyou"
                class="text-decoration-none"
              >
                <v-btn
                  color="info"
                  class="text-capitalize ml-1 text-decoration-none"
                  small
                  type="submit"
                  outlined
                  dark
                  @open="open"
                  @change="change"
                  @close="close"
                >
                  <v-icon color="blue">mdi-twitter</v-icon>
                </v-btn>
              </ShareNetwork>
            </v-col>
          </v-row>

          <suggested-story />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  name: "Home",

  metaInfo() {
    const title = this.categoryStore.story && this.categoryStore.story.story && this.categoryStore.story.story.moral_lesson
    ? this.categoryStore.story.story.title
    : 'storiesforyou'; 

  // Check if story and its nested properties are available
  const description = this.categoryStore.story && this.categoryStore.story.story && this.categoryStore.story.story.moral_lesson
    ? this.removeHtmlTags(this.categoryStore.story.story.moral_lesson)
    : this.descriptionSocial;      

    return {
      title: title,
      titleTemplate: '%s | storiesforyou',
      description: description,
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
      meta: [
        { vmid: title, name: title, content: description },
        {
          vmid: "og:title",
          property: "og:title",
          content: title && title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
          template: (chunk) => `${chunk} | storiesforyou`,
        },
        {
          vmid: "og:image",
          property: "og:image",
          content: `https://www.admin.storiesforyou.net/images/icon/icon.png`,
        },
      ],
    };
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        await this.categoryStore.getStory({
          name: this.$route.params.name,
          title: this.$route.query.q,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    open() {
      console.log("open");
    },

    change() {
      console.log("change");
    },

    close() {
      console.log("close");
    },

    removeHtmlTags(text) {
      // Use regex to remove HTML tags
      return text.replace(/<[^>]*>/g, '');
    }    
  },

  watch: {
    $route: function () {
      this.fetchData();
    },
  },

  data() {
    return {
      categoryStore: useCategoryStore(),
      url_share: window.location.href,
      descriptionSocial:
        "When you read an online story, you're not just reading it on your own. You're joining a community of readers and authors who are passionate about stories. You can share your thoughts on the story with other readers, and you can even leave comments for the story.",
    };
  },

  components: {
    ReactedBy: () => import("@/components/post/ReactedBy"),
    ButtonReaction: () => import("@/components/post/ButtonReaction"),
    SuggestedStory: () => import("@/components/post/SuggestedStory"),
  },
};

</script>
