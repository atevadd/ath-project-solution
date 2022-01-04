<template>
  <router-view />
</template>


<script>
import BaseNavbar from "@/components/BaseNavbar.vue";

export default {
  name: "App",
  components: {
    BaseNavbar,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito sans", sans-serif;
}

.container {
  width: 90%;
  margin: 0 auto;
}

.bold {
  font-weight: 600;
}

body {
  background-color: $mode-bg;
  overflow-x: hidden;
}

</style>
