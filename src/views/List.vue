<template>
  <div>
    <progressCircular v-if="authStore.loading" />
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <h2 class="text-h4 font-weight-bold text-capitalize">
              {{ type }} Stories
            </h2>

            <h4 class="text-h6 mb-10">
              {{ activities }}
            </h4>
          </div>

          <v-divider class="my-4"></v-divider>
          <div>
            <v-alert
              type="error"
              color="#C51162"
              dark
              v-if="type == 'upcoming'"
            >
              It remains unread as its release date is still ahead.
            </v-alert>

            <v-row v-for="list in authStore.list_stories.data" :key="list.id">
              <v-col cols="12" md="3">
                <v-card
                  flat
                  height="100%"
                  :to="'/category/' + list.slug + '?q=' + list.title_slug"
                  :disabled="type == 'upcoming'"
                >
                  <v-img
                    :aspect-ratio="16 / 9"
                    height="100%"
                    :src="getPublicImageThumbnail(list.image)"
                  ></v-img>
                </v-card>
              </v-col>

              <v-col>
                <div>
                  <v-btn
                    color="accent"
                    depressed
                    :to="'/category/' + list.slug"
                    >{{ list.slug }}</v-btn
                  >

                  <router-link
                    :to="'/category/' + list.slug + '?q=' + list.title_slug"
                    class="text-decoration-none"
                    v-if="type != 'upcoming'"
                  >
                    <h3 class="text-h4 font-weight-bold pt-3">
                      {{ list.title }}
                    </h3>
                  </router-link>
                  <span v-else>
                    <h3 class="text-h4 font-weight-bold pt-3">
                      {{ list.title }}
                    </h3>
                  </span>

                  <div
                    class="text-body-2 font-weight-regular pt-3 text--secondary"
                    v-html="list.moral_lesson.substring(0, 200) + '...'"
                  ></div>
                  <div class="text-body-2 pt-2 text--secondary">
                    <span v-show="type == 'visited'">
                      Viewed at <span>&#8226;</span>
                      {{ getHumanDateDay(list.last_viewed_at) }}
                    </span>
                    <span v-show="type == 'unvisited' || type == 'latest'">
                      Released at <span>&#8226;</span>
                      {{ getHumanDateDay(list.date_release) }}
                    </span>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-row justify="space-between" class="mb-2">
              <v-col cols="6" md="6" lg="6" sm="6">
                <a
                  class="align-center"
                  v-if="authStore.list_stories.current_page != 1"
                  @click="
                    loadStories(
                      parseInt(authStore.list_stories.current_page) - 1,
                    )
                  "
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
                    authStore.list_stories.current_page !=
                    authStore.list_stories.last_page
                  "
                >
                  <a
                    class="text-h6 primary--text pr-2"
                    @click="
                      loadStories(
                        parseInt(authStore.list_stories.current_page) + 1,
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
      </v-col>

      <v-col>
        <div class="pt-16">
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "List",

  mounted() {
    if (this.type == "visited") {
      this.activities = "Your recent activities.";
      this.authStore.getReadStories(1);
    } else if (this.type == "unvisited") {
      this.activities = "Your upcoming activities.";
      this.authStore.getUnReadStories(1);
    } else if (this.type == "upcoming") {
      this.activities = "Your upcoming activities.";
      this.authStore.getUpcomingStories(1);
    } else {
      this.activities = "Your upcoming activities.";
      this.authStore.getLatestStories(1);
    }
  },

  data() {
    return {
      authStore: useAuthStore(),

      activities: "",
      type: this.$route.params.type,
    };
  },

  methods: {
    loadStories(page) {
      if (this.type == "visited") {
        this.authStore.getReadStories(page);
      } else if (this.type == "unvisited") {
        this.authStore.getUnReadStories(page);
      } else {
        this.authStore.getLatestStories(page);
      }
    },
  },

  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
