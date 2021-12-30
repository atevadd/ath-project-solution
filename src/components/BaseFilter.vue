<template>
  <section class="filter">
    <div class="filter__dropdown" @click="showFilterItems">
      <p>Filter by region</p>
      <i class="bx bx-chevron-down"></i>
    </div>
    <div class="filter__items">
      <p v-for="(continent, index) in continents" :key="index">
        {{ continent }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "BaseFilter",
  data() {
    return {
      continents: ["Africa", "America", "Asia", "Europe", "Oceania"],
    };
  },
  methods:{
    showFilterItems(){
      document.querySelector(".filter__items").classList.toggle("show");
    }
  },
};
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  z-index: 10;

  @include mobile {
    margin: 0 auto;
    width: 90%;
  }
  @include tablet{
    width: 25%;
  }
  @include laptop {
    width: 15%;
    // border: 1px solid red;
  }

  &__dropdown {
    position: relative;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgba($color: #1a1a1a, $alpha: .15);
    cursor: pointer;
    transition: background-color .1s ease;

    &:active{
      background-color: #e9e9e9;
    }

    @include mobile {
      width: 50%;
      padding: 15px 10px;
    }
    @include tablet {
      width: 100%;
      padding: 15px 10px;
    }
    @include laptop{
      padding: 10px 15px;
    }
    p {
      color: $mode-text;
      @include mobile {
        font-size: 0.85rem;
        font-weight: 600;
      }
      @include tablet{
        font-size: .85rem;
        font-weight: 600;
      }
      @include laptop {
        font-size: 0.85rem;
        font-weight: 600;
      }
    }
    i {
      @include mobile {
        font-size: 1.1rem;
      }
      @include laptop {
        font-size: 1.1rem;
      }
    }
  }
  &__items {
    position: absolute;
    border-radius: 5px;
    padding: 10px 0;
    display: none;
    box-shadow: 0 3px 10px rgba($color: #1a1a1a, $alpha: .15);


    @include mobile {
      width: 50%;
      background: $white;
      margin-top: 5px;
    }
    @include tablet {
      width: 100%;
      background: $white;
      margin-top: 5px;
    }
    @include laptop{
      width: 100%;
      background: $white;
      margin-top: 5px;
    }
    &.show{
        display: block;
        animation: slideup .2s ease;
    }

    p {
      padding: 5px 10px; 
      color: $mode-text;
      font-weight: 600;
      font-size: .9rem;
      cursor: pointer;

      &:hover{
        background-color: #e9e9e9;
      }
    }
  }
}

@keyframes slideup{
  from{
    transform: translateY(25px);
    opacity: 0;
  }
  to{
    transform: translateY(0);
  }
}
</style>