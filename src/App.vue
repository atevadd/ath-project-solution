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

// .select {
//   width: 100%;
//   height: 45px;
//   border: 1px solid #aaa;
//   border-radius: 5px;
//   display: block;
//   padding-left: 15px;
//   outline: none;
//   background: transparent;

//   &:focus {
//     border: 1px solid $mode-text;

//     & ~ label {
//       top: 0px;
//       left: 10px;
//       padding: 0 5px;
//       color: $mode-text;
//       background: $mode-bg;
//       z-index: 10;
//       font-weight: 600;
//     }
//   }

//   &:valid {
//     border: 1px solid $mode-text;

//     & ~ label {
//       top: 0px;
//       left: 10px;
//       padding: 0 5px;
//       color: $mode-text;
//       background: $mode-bg;
//       z-index: 10;
//     }
//   }

//   &:valid:not(:focus) {
//     border: 1px solid #aaa;

//     & ~ label {
//       top: 0px;
//       left: 10px;
//       padding: 0 5px;
//       color: $mode-text;
//       background: $mode-bg;
//       z-index: 10;
//     }
//   }
// }
</style>
