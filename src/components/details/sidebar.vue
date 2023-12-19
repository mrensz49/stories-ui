<template>
  <div>
    <div>
      <h3 class="text-h5 font-weight-medium pb-4">Popular Posts</h3>

      <v-divider></v-divider>

      <div>
        <v-row v-for="(category, index) in categoryStore.popular5" :key="'sb_'+index" class="py-2">
          <template v-if="category">

            <v-col cols="12" md="6" lg="5">
              <v-card height="100%" flat :to="'/category/'+category.slug+'?q='+category.title_slug">
                <v-img
                  :src="getPublicImage(category.image)"
                  :aspect-ratio="16 / 9"
                  height="100%"
                ></v-img>
              </v-card>
            </v-col>

            <v-col>
              <div>
                <v-btn depressed color="accent" small :to="'/category/'+category.slug">{{ category.category }}</v-btn>

                <router-link :to="'/category/'+category.slug+'?q='+category.title_slug" class="text-decoration-none">
                  <h3 class="text-h6 font-weight-bold primary--text py-3">
                    {{ category.title }}
                  </h3>
                </router-link>

                <!-- <div class="d-flex align-center">
                  <v-avatar color="accent" size="24">
                    <v-icon dark small>mdi-feather</v-icon>
                  </v-avatar>

                  <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                </div> -->
              </div>
            </v-col>
          </template>
        </v-row>
      </div>
    </div>

    <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Category</h3>

      <v-divider></v-divider>
      <v-card
        v-for="category in categoryStore.categories"
        color="accent" dark flat
        :key="category.id" class="my-4"
        :to="'/category/'+category.slug"

      >
        <v-card-text
          class="d-flex justify-space-between align-center white--text"
        >
          <h6 class="text-h6">{{ category.category }}</h6>

          <!-- <div class="text-h6">47</div> -->
        </v-card-text>
      </v-card>

    </div>

    <!-- <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Top Authors</h3>

      <v-divider></v-divider>

      <div class="pt-4">
        <div class="d-flex align-center mb-6" v-for="i in 5" :key="i">
          <v-avatar color="accent" size="64">
            <v-icon dark x-large>mdi-feather</v-icon>
          </v-avatar>

          <div class="pl-2">
            <div class="text-h6">Yan Lee</div>
            <div class="text-subtitle-1">47 Articles</div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Tags</h3>

      <v-divider></v-divider>

      <v-row class="pt-4">
        <v-col v-for="i in 7" :key="i" class="flex-shrink-0" cols="auto">
          <v-chip color="accent">#Images</v-chip>
        </v-col>
      </v-row>
    </div> -->

    <!-- <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Newsletter</h3>

      <v-divider></v-divider>

      <v-text-field
        label="Your email adress"
        solo
        type="email"
        outlined
        flat
        class="pt-4"
      ></v-text-field>
      <v-btn color="accent" block large>Subscrbe</v-btn>
    </div> -->
    <top-scroll></top-scroll>
  </div>
</template>

<script>

  import { useCategoryStore } from '@/stores/category'

  export default {
    name: "SideBar",

    mounted() {
      this.categoryStore.getCategories()
      this.categoryStore.getPopular5()
    },

    data() {
      return {
        categoryStore: useCategoryStore()
      }
    },

  };

</script>