<template>
  <header>
    <nav>
      <h1 tabindex="0" @click="loadCountries">Where in the world?</h1>
      <button class="theme-toggle"><i class="bx bx-moon"></i>Dark mode</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BaseNavbar",
  methods:{
    loadCountries(){
      this.$emit('load-countries');
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: $white;
  box-shadow: 0 3px 13px rgba($color: #000000, $alpha: 0.1);

  @include mobile {
    position: relative;
    width: 100%;
    padding: 25px 0;
  }
  @include tablet {
    position: relative;
    width: 100%;
    padding: 25px 0;
  }
  @include laptop{
    width: 100%;
    padding: 20px 0;
  }

  nav {
    position: relative;
    
    @include mobile {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
    }
    @include tablet {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
    }
    @include laptop{
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
    }

    h1 {
      color: $mode-text;
      cursor: pointer;
      
      @include mobile{
        font-size: 1rem;
        font-weight: 800;
      }
      @include tablet{
        font-size: 1rem;
        font-weight: 800;
      }
      @include laptop{
        font-size: 1.3rem;
        font-weight: 800;
      }

      &:focus{
        border: 1px solid $mode-text;
      }
    }
    button{
      background: transparent;
      text-transform: capitalize;
      display: inline-flex;
      align-items: center;
      border: none;
      outline: none;

      &:focus{
        outline: 1px solid $mode-text;
      }

      i{
        margin-right: 8px;
      }
    }
  }
}
</style>