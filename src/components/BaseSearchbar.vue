<template>
  <div>
    <input type="search" :placeholder="placeholderText" v-model="searchText" @keyup="search(searchText)"/>
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
  data(){
    return{
      searchText: "",
    }
  },
  methods:{
    search(data){
      this.$emit('searchtext', data)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>