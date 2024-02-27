<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <div>
              <h2 class="text-h5 font-weight-bold">Credits</h2>
              <h4 class="text-h6">&nbsp;</h4>
            </div>

            <v-divider class="my-4 mt-n4"></v-divider>
            <progressCircular v-if="categoryStore.loading" />
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <v-card flat hover>
                  <v-card-text>
                    <v-simple-table dense>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left" width="30%">Image</th>
                            <th class="text-left">Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template
                            v-for="datas in removeDuplicateObjects(
                              categoryStore.credits,
                            )"
                          >
                            <tr
                              v-for="(item, index) in datas"
                              :key="index + '_' + item.id"
                            >
                              <td class="py-3">
                                <v-img
                                  :aspect-ratio="16 / 9"
                                  :src="getPublicImageThumbnail(item.image)"
                                  class="rounded-sm"
                                ></v-img>
                              </td>
                              <td>
                                <small>{{ item.image_source }}</small>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/category";

export default {
  name: "Category",

  mounted() {
    this.categoryStore.getCredits(1);
    this.processInfiniteScroll();
  },

  data() {
    return {
      categoryStore: useCategoryStore(),
      temp_current_page: "",
    };
  },

  methods: {
    processInfiniteScroll() {
      window.addEventListener("scroll", () => {
        if (
          window.innerHeight + Math.round(window.scrollY) + 1 >=
          document.body.offsetHeight
        ) {
          if (this.temp_current_page != this.categoryStore.current_page) {
            this.categoryStore.getCredits(this.categoryStore.current_page);
          }
          this.temp_current_page = this.categoryStore.current_page;
        }
      });
    },

    removeDuplicateObjects(array) {
      return array.filter((item, index, self) => {
        // Return true only if the current object is the first occurrence in the array
        return (
          self.findIndex(
            (otherItem) => JSON.stringify(item) === JSON.stringify(otherItem),
          ) === index
        );
      });
    },
  },
};
</script>
