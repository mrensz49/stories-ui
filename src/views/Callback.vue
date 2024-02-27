<template>
  <div>welcome</div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "CallbackPage",
  mounted() {
    EventService.finalCallback()
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log({ err: err });
      });
  },
};
</script>
