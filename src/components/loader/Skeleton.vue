<template>
  <v-row>
    <v-col cols="12" lg="4" xl="4" v-for="n in 3" :key="n">
      <v-skeleton-loader
        :loading="true"
        height="240"
        type="image, article"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
