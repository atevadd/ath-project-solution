<template>
  <div class="country__card">
    <div class="country__image">
      <router-link :to="{name: 'CountryDetail', params: {countryname: countryInfo.name}}">
          <img :src="countryInfo.flags.png" :alt="countryInfo.name + ' flag'" loading="lazy"/>
      </router-link>
    </div>
    <div class="country__details">
      <h3 class="country__name" v-if="typeof countryInfo.name == 'string'">{{countryInfo.name}}</h3>
      <h3 class="country__name" v-else>{{countryInfo.name.common}}</h3>
      <p class="country__population">
        <span class="bold">Population: </span>{{countryInfo.population}}
      </p>
      <p class="country__region">
        <span class="bold">Region: </span>{{countryInfo.region}}
      </p>
      <p class="country__capital" v-if="typeof countryInfo.capital === 'string'">
        <span class="bold">Capital: </span>{{countryInfo.capital}}
      </p>
      <p class="country__capital" v-else>
        <span class="bold">Capital: </span>{{countryInfo.capital[0]}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryCard",
  props: {
    countryInfo: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.country__card {
  width: 100%;
  position: relative;
  border-radius: 4px;
  background-color: $white;
  box-shadow: 0 0 10px rgba($color: #1a1a1a, $alpha: 0.15);

  .country__image {
    width: 100%;
    height: 150px;
    border-radius: 4px 4px 0 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .country__details {
    width: 100%;
    position: relative;
    padding: 10px 0 10px 15px;

    .country__name {
      @include mobile {
        font-size: 1rem;
      }
      @include laptop{
          font-size: 1.1rem;
          margin-bottom: 15px;
          margin-top: 10px;
      }
    }
    p{
        margin: 5px 0;
        font-size: .85rem;
    }
  }
}
</style>