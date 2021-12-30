<template>
    <main>
        <BaseButton>
            <i class="bx bx-arrow-left"></i>
            Back
        </BaseButton>
    </main>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
export default {
  name: "CountryDetail",
  components:{
      BaseButton,
  },
  data(){
      return{
          countrydetail: null,
      }
  },
  props: {
    countryname: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>