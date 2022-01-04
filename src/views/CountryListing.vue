<template>
  <BaseNavbar @load-countries="loadCountries" />
  <main>
    <section class="filter-region">
      <BaseSearchbar
        placeholderText="Search for a country..."
        class="search-bar"
        v-model="searchText"
        @printer="updateText($event)"
      />
      <BaseFilter @filterByRegion="filterByRegion($event)" />
    </section>

    <section class="country" v-if="countries">
      <CountryCard
        v-for="(country, index) in filteredCountries"
        :key="index"
        :countryInfo="country"
      />
    </section>

    <!-- loading state for countries while they are loaded -->
    <section class="loading" v-else>
      <h1>Please hold on a bit, while the countries are loading</h1>
      <div class="spinner"></div>
    </section>
  </main>

  <footer>
    <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
    <div class="circle-loader" v-show="showLoader"></div>
  </footer>
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
      searchText: "",
      countries: null,
      allCountries: null,
      startIndex: 0,
      maxIndex: 250,
      increment: 10,
      showLoader: false,
    };
  },
  async created() {
    await axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        this.allCountries = response.data;
        this.countries = this.allCountries.slice(
          this.startIndex,
          this.increment
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
     loadCountries() {
       axios
        .get("https://restcountries.com/v2/all")
        .then((response) => {
          this.allCountries = response.data;
          this.countries = this.allCountries.slice(
            this.startIndex,
            this.increment
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // search by country name
    updateText(text) {
      this.searchText = text;
      console.log(this.searchText);
    },
    // filter by region
    filterByRegion(region) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region.toLowerCase()}`)
        .then((response) => {
          this.countries = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // infinite scrolling
    handleScrollToBottom() {
      const observer = new IntersectionObserver((entries) => {
        if (this.countries != null) {
          if (entries[0].isIntersecting && this.increment < this.maxIndex) {
            this.addToCountries();
          } else {
            this.showLoader = false;
          }
        }
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
    // This function is used to add more countries to the list
    addToCountries() {
      this.showLoader = true;
      this.startIndex = this.increment;
      this.increment += 10;
      setTimeout(() => {
        this.countries = this.countries.concat(
          this.allCountries.slice(this.startIndex + 1, this.increment)
        );
      }, 1000);
    },
  },
  // calling the infinite scrolling function
  mounted() {
    this.handleScrollToBottom();
  },
  // computed properties return the countries that match the search text
  computed: {
    filteredCountries: function () {
      return this.countries.filter((nation) => {
        if (this.searchText == "") {
          if (typeof nation.name == "string") {
            return nation.name.match(this.searchText);
          } else {
            return nation.name.common.match(this.searchText);
          }
        } else {
          if (typeof nation.name == "string") {
            return nation.name.match(
              this.searchText.replace(
                this.searchText[0],
                this.searchText[0].toUpperCase()
              )
            );
          } else {
            return nation.name.common.match(
              this.searchText.replace(
                this.searchText[0],
                this.searchText[0].toUpperCase()
              )
            );
          }
        }
      });
    },
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
      @include tablet {
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
        transition: 0.15s ease;

        &:focus {
          outline: 1px solid $mode-text;

          & ~ span > i {
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
      border: 5px solid $mode-text;
      border-bottom-color: transparent;
      border-left-color: transparent;
      animation: rotate 0.5s ease-in infinite;
      border-radius: 50px;
      margin-top: 30px;
    }
  }
}

footer {
  position: relative;
  width: 100%;
  margin-bottom: 50px;

  #scroll-trigger {
    height: 10px;
    margin: 0 auto;
  }

  .circle-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid $mode-text;
    border-top-color: $mode-text;
    border-right-color: $mode-text;
    border-bottom-color: transparent;
    border-left-color: transparent;
    animation: spin 1s ease-in-out infinite;
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
