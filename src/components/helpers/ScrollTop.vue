<template>
  <v-avatar
    v-show="scY > 450"
    @click="toTop"
    class="scroll-top pointer elevation-4"
    color="warning"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: "ScrollTop",

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },

  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
