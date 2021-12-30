<template>
  <div>
    <input type="search" :placeholder="placeholderText" />
    <span><i class="bx bx-search-alt-2"></i></span>
  </div>
</template>

<script>
export default {
  name: "BaseSearchbar",
  props: {
    placeholderText: {
      type: String,
      default: "Search",
    },
  },
};
</script>

<style lang="scss" scoped>

</style>