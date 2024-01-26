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
              <progressCircular v-if="authStore.loading"/>
              <v-row>
                <v-col cols="12" md="6" lg="4">
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
                        :to="'/list/visited'"
                      >
                      <v-img
                          :src="require('/images/viewed-story.jpg')"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        >
                          <v-card-text>
                            <v-btn color="accent">Visited Stories</v-btn>
                          </v-card-text>                      
                        </v-img>   
                        
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">
                            {{ authStore.count_read_stories }} visited stories
                          </div>
                        </v-card-text>                      
                      </v-card>
                  </div>
                  </v-hover>                  
                </v-col>

                <v-col cols="12" md="6" lg="4">
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
                        :to="'/list/unvisited'"
                      >
                      <v-img
                          :src="require('/images/viewed-story.jpg')"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        >
                          <v-card-text>
                            <v-btn color="accent">Unvisited Stories</v-btn>
                          </v-card-text>                      
                        </v-img>   
                        
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">
                            {{ authStore.count_unread_stories > 15 ? '15+': authStore.count_unread_stories}} unvisited stories
                          </div>
                        </v-card-text>                      
                      </v-card>
                  </div>
                  </v-hover>                  
                </v-col>

                <v-col cols="12" md="6" lg="4">
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
                        :to="'/list/latest'"
                      >
                      <v-img
                          :src="require('/images/viewed-story.jpg')"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          class="elevation-2"
                          style="border-radius: 16px"
                        >
                          <v-card-text>
                            <v-btn color="accent">Latest Stories</v-btn>
                          </v-card-text>                      
                        </v-img>   
                        
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">
                            {{ authStore.count_latest_stories }} latest stories
                          </div>
                        </v-card-text>                      
                      </v-card>
                  </div>
                  </v-hover>                  
                </v-col>

              </v-row>
            </div>
          </div>
        </v-col>

        <v-col>
          <div class="pt-10">
            <siderbar />
          </div>
        </v-col>
      </v-row>
    </div>
  </template>

  <script>

  import { useAuthStore } from '@/stores/auth'

  export default {
    name: "Category",

    mounted() {
        this.authStore.getCountReadStories()
        this.authStore.getCountUnReadStories()
        this.authStore.getCountLatestStories()
      },

      data() {
        return {
          authStore: useAuthStore()
        }
      },

      components: {
        siderbar: () => import("@/components/details/sidebar"),
      },
  };
  </script>
