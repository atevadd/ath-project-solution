<template>
  <div>
    <input type="text" :placeholder="placeholderText" v-model="searchText" @keyup="print(searchText)"/>
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
    return {
      searchText:""
    }
  },
  methods: {
    print(data){
        this.$emit('printer', data)
    }
  }
};
</script>
