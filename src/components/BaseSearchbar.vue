<template>  
  <!-- The searchbar component -->
  <div>
    <input type="search" :placeholder="placeholderText" v-model="searchText" @keyup="print(searchText)"/>
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
    // This function is called when the user starts typing in the search component
    // it emits an event and the search text
    print(data){
        this.$emit('printer', data)
    }
  }
};
</script>
