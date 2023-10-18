<template>
    <div class="text-center">
        <v-dialog
          v-model="categoryStore.searchDialog"
          activator="parent"
          width="900"
        >

          <v-card theme="dark" class="pa-8 d-flex justify-center flex-wrap">
            <v-responsive max-width="550">
            <v-img
                class="mx-auto mt-10 mb-14"
                max-width="50"
                src="./images/icon/icon.PNG"
            ></v-img>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              chips
              clearable
              hide-details
              hide-selected
              item-text="title"
              item-value="id"
              label="Search topic or title..."
              solo
              prepend-inner-icon="mdi-magnify"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Search for your favorite
                    <strong>Story</strong>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attr, on, item, selected }">
                <v-chip
                  v-bind="attr"
                  :input-value="selected"
                  color="blue-grey"
                  class="white--text"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-book
                  </v-icon>
                  <span v-text="item.title"></span>
                </v-chip>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.category.category"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-book</v-icon>
                </v-list-item-action>
              </template>
            </v-autocomplete>
            <v-row justify="center" dense class="mt-8">
                <v-card-actions>
                    <v-btn color="primary" block @click="categoryStore.searchDialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-row>

            </v-responsive>

        </v-card>

        </v-dialog>
    </div>
  </template>

<script>

import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()

export default {
  data () {
    return {
        categoryStore: useCategoryStore(),

        isLoading: false,
        items: [],
        model: null,
        search: null,
    }
  },


  watch: {
      model (val) {
        if (val != null) {

          this.isLoading = true
          fetch(`http://stories-v2.test/search-url-slug?id=${val}`)
            .then(res => res.clone().json())
            .then(res => {
              this.$router.push(`/category/${res.category.slug}?q=${res.title_slug}`).catch(err => {});

            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.isLoading = false
              categoryStore.searchDialog = false
            })
        }
      },
      search (val) {
        // Items have already been loaded
        // if (this.items.length > 0) return


        if (val.length > 1) {
          this.isLoading = true
          // Lazily load input items
          fetch(`http://stories-v2.test/search?q=${val}`)
            .then(res => res.clone().json())
            .then(res => {
              this.items = res.data
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => (this.isLoading = false))
        }
      },
    },

}
</script>