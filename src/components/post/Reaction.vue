<template>
    <span>
        <template v-for="(reaction, key, index) in categoryStore.reaction_summary">
            <v-icon v-if="key == 'love'" dark x-small color="pink">mdi-heart</v-icon>
            <v-icon v-if="key == 'like'" dark x-small color="info">mdi-thumb-up</v-icon>
            <v-icon v-if="key == 'happy'" dark x-small color="#FF891B">mdi-emoticon-happy</v-icon>
            <v-icon v-if="key == 'sad'" dark x-small color="orange">mdi-emoticon-sad</v-icon>
            <v-icon v-if="key == 'angry'" dark x-small color="red">mdi-emoticon-angry</v-icon>
        </template>
    </span>
</template>

<script>
  import { useCategoryStore } from '@/stores/category'

  export default {
    name: "reaction",

    data() {
        return {
            categoryStore: useCategoryStore()
        }
    },   
    
    
  }
</script>