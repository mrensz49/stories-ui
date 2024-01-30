<template>
    <div>
        <skeleton-article v-if="categoryStore.loading"/>
        <div v-if="typeof categoryStore.story.category !== 'undefined' && !categoryStore.loading">
        <v-card color="grey lighten-4">

            <v-img
                v-if="categoryStore.story.story.image"
                :src="getPublicImage(categoryStore.story.story.image)"
                width="100%"
            ></v-img>

            <v-card-text>
            <div>
                <v-btn color="accent" :to="'/category/'+categoryStore.category.category.slug">{{ categoryStore.story.category.category }}</v-btn>
            </div>

            <div class="text-h5 font-weight-bold primary--text pt-4">
                <h4>{{ categoryStore.story.story.title }}</h4>
            </div>

            <v-divider class="my-4"></v-divider>

            <v-card flat color="transparent">
                <v-card-text>
                    <div class="text-subtitle-1 primary--text text-justify" v-html="categoryStore.story.story.data"></div>
                </v-card-text>
            </v-card>

            <v-divider class="my-4 pb-2"></v-divider>

            <h2>Moral Lesson</h2>
            <div class="py-7">
                <v-alert
                    class="text-justify"
                    border="left"
                    colored-border
                    color="orange"
                >
                    <div v-html="categoryStore.story.story.moral_lesson"></div>
                </v-alert>
            </div>

            <v-divider class="my-2 pb-2" v-if="categoryStore.story.story.image_source"></v-divider>
            <small>
                <div v-html="categoryStore.story.story.image_source"></div>
            </small>

            <!-- <div class="d-flex align-center justify-space-between mt-8">
                <div>
                <v-row>
                    <v-col class="flex-shrink-0" cols="auto">
                    <v-chip color="accent">#Animalis</v-chip>
                    </v-col>

                    <v-col class="flex-shrink-0" cols="auto">
                    <v-chip color="accent">#Travel</v-chip>
                    </v-col>

                    <v-col class="flex-shrink-0" cols="auto">
                    <v-chip color="accent">#Birds</v-chip>
                    </v-col>
                </v-row>
                </div>

                <div class="text-h5">
                Share >
                <v-btn icon large>
                    <v-icon large color="primary">mdi-facebook</v-icon>
                </v-btn>

                <v-btn icon large>
                    <v-icon large color="primary">mdi-twitter</v-icon>
                </v-btn>

                <v-btn icon large>
                    <v-icon large color="primary">mdi-linkedin</v-icon>
                </v-btn>

                <v-btn icon large>
                    <v-icon large color="primary">mdi-instagram</v-icon>
                </v-btn>
                </div>
            </div> -->

            <!-- <v-divider class="my-8"></v-divider>

            <div>
                <v-row justify="space-between">
                <v-col cols="12" md="6" lg="4">
                    <div class="d-flex align-center">
                    <div>
                        <v-icon>mdi-arrow-left</v-icon>
                    </div>

                    <div class="text-h6 primary--text pl-2">
                        <div class="text-subtitle-1">Previous Post</div>Photos of Jeep models that will change
                        your mood
                    </div>
                    </div>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                    <div class="d-flex align-center text-right">
                    <div class="text-h6 primary--text pr-2">
                        <div class="text-subtitle-1">Next Post</div>What do I need to know to start learning
                        JavaScript?
                    </div>

                    <div>
                        <v-icon>mdi-arrow-right</v-icon>
                    </div>
                    </div>
                </v-col>
                </v-row>
            </div> -->
            </v-card-text>
        </v-card>
        </div>
    </div>
</template>

<script>

import { useCategoryStore } from '@/stores/category'

export default {
  name: "Home",

  mounted() {
    this.categoryStore.getStory({
        name: this.$route.params.name,
        title: this.$route.query.q,
    })
  },

  data() {
    return {
      categoryStore: useCategoryStore()
    }
  },

  watch:{
    "$route" : function(){
        this.categoryStore.getStory({
            name: this.$route.params.name,
            title: this.$route.query.q,
        })
    }
  },

};

</script>