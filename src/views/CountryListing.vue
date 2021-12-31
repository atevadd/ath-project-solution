<template>
<BaseNavbar />
  <main>
    <section class="filter-region">
      <BaseSearchbar
        placeholderText="Search for a country..."
        class="search-bar"
      />
      <BaseFilter />
    </section>

    <!-- loading state for countries while they are loaded -->
    <section class="country" v-if="countries">
      <CountryCard
        v-for="(country, index) in countries"
        :key="index"
        :countryInfo="country"
        @search-text="search"
      />
    </section>
    <section class="loading" v-else>
      <h1>Please hold on a bit, while the countries are loading</h1>
      <div class="spinner"></div>
    </section>
  </main>
</template>

<script>
import BaseNavbar from "@/components/BaseNavbar.vue";
import BaseSearchbar from "@/components/BaseSearchbar.vue";
import BaseFilter from "@/components/BaseFilter.vue";
import CountryCard from "../components/CountryCard.vue";
import axios from "axios";

export default {
  name: "CountryListing",
  components: {
        BaseNavbar,
    BaseSearchbar,
    BaseFilter,
    CountryCard,
  },
  data() {
    return {
      countries: null,
    };
  },
  methods:{
    search(data){
      console.log(data)
    }
  },
  created() {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        this.countries = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
main {
  position: relative;
  width: 100%;

  .filter-region {
    width: 100%;
    display: flex;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
    }
    @include tablet {
      width: 90%;
      margin: 40px auto;
      align-items: center;
      justify-content: space-between;
    }
    @include laptop {
      width: 90%;
      margin: 40px auto;
      align-items: center;
      justify-content: space-between;
    }

    .search-bar {
      position: relative;

      @include mobile {
        width: 90%;
        margin: 30px auto;
      }
      @include tablet{
        width: 50%;
      }
      @include laptop {
        width: 35%;
      }

      input {
        width: 100%;
        height: 50px;
        background-color: $white;
        border: none;
        padding-left: 60px;
        box-shadow: 0 3px 10px rgba($color: #1a1a1a, $alpha: 0.15);
        color: $mode-input;
        font-weight: 400;
        outline: none;
        border-radius: 5px;
        transition: .15s ease;

        &:focus {
          outline: 1px solid $mode-text;

          & ~ span > i{
            color: $mode-text;
            // font-weight: 800;
          }
        }
      }
      span {
        position: absolute;
        top: 55%;
        left: 25px;
        transform: translateY(-50%);

        i {
          color: $mode-input;

          @include mobile {
            font-size: 1rem;
          }
          @include laptop {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  .country {
    position: relative;
    display: grid;
    margin: 0 auto 50px;

    @include mobile {
      width: 90%;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 30px 0;
      margin: 30px auto;
    }
    @include tablet {
      width: 90%;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px;
    }
    @include laptop {
      width: 90%;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-template-rows: minmax(250px, 310px);
      gap: 70px;
    }
  }

  .loading {
    width: 90%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      color: $mode-text;
      font-weight: 600;
      font-size: 1.3rem;
      text-align: center;
    }
    .spinner {
      width: 35px;
      height: 35px;
      border: 3px solid $mode-text;
      border-bottom: none;
      border-left: none;
      animation: rotate 0.2s linear infinite;
      border-radius: 50%;
      margin-top: 30px;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
