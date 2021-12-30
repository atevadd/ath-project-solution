<template>
  <button @click="goBack">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  methods: {
    goBack() {
      history.back();
    },
  },
};
</script>