<template>
  <BaseNavbar />
  <main class="country">
    <!-- Button component -->
    <BaseButton class="country__back-btn" @click="goBack">
      <i class="bx bx-left-arrow-alt"></i>
      Back
    </BaseButton>
    <section class="country__container">
      <section class="country__flag">
        <img
          :src="countryDetail.flags.png"
          :alt="countryDetail.name + ' flag'"
          loading="lazy"
        />
      </section>
      <section class="country__info">
        <h1>{{ countryDetail.name }}</h1>
        <div class="country__text-wrapper">
          <div class="country__text">
            <p>
              <span class="bold">Native Name: </span
              >{{ countryDetail.nativeName }}
            </p>
            <p>
              <span class="bold">Population: </span
              >{{ countryDetail.population }}
            </p>
            <p><span class="bold">Region: </span>{{ countryDetail.region }}</p>
            <p>
              <span class="bold">Sub Region: </span
              >{{ countryDetail.subregion }}
            </p>
            <p>
              <span class="bold">Capital: </span>{{ countryDetail.capital }}
            </p>
          </div>
          <div class="country__text">
            <p>
              <span class="bold">Top Level Domain: </span
              >{{ countryDetail.topLevelDomain[0] }}
            </p>
            <p>
              <span class="bold">Currencies: </span
              >{{ countryDetail.currencies[0].name }}
            </p>
            <p>
              <span class="bold">Languages: </span>
              <span
                class="lang"
                v-for="(language, index) in countryDetail.languages"
                :key="index">{{ language.name }}
              </span>
            </p>
          </div>
        </div>
        <div class="country__border">
          <p>
            <span class="bold">Border Countries: </span>
            <span
              class="borders"
              v-for="(border, index) in countryDetail.borders"
              :key="index"
              ><router-link
                  :to="{
                    name: 'CountryDetail',
                  }"
                  >{{ border }}</router-link
                ></span
            >
          </p>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import BaseNavbar from "@/components/BaseNavbar.vue";
import BaseButton from "../components/BaseButton.vue";
import axios from "axios";

export default {
  name: "CountryDetail",
  components: {
    BaseNavbar,
    BaseButton,
  },
  data() {
    return {
      countryDetail: null,
    };
  },
  props: {
    countryname: {
      type: String,
      required: true,
    },
  },
  methods: {
    goBack() {
      history.back();
    },
  },
  created() {
    axios
      .get(
        `https://restcountries.com/v2/name/${this.countryname}?fullText=true`
      )
      .then((response) => {
        this.countryDetail = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.country {
  position: relative;

  @include mobile {
    width: 90%;
    margin: 40px auto;
  }
  @include tablet {
    width: 90%;
    margin: 40px auto;
  }
  @include laptop {
    width: 90%;
    margin: 60px auto;
  }

  &__back-btn {
    border: none;
    background: $white;
    color: $mode-text;
    box-shadow: 1px 1px 8px rgba($color: #1a1a1a, $alpha: 0.35);
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 600;
    transition: 0.15s ease;

    @include mobile {
      padding: 5px 25px;
      justify-content: center;
    }
    @include tablet {
      padding: 5px 25px;
      justify-content: center;
    }
    @include laptop {
      padding: 7px 25px;
      justify-content: center;
    }

    &:hover {
      background-color: $mode-text;
      color: $white;
    }

    i {
      margin-right: 5px;

      @include mobile {
        font-size: 1rem;
        font-weight: 300;
      }
      @include tablet {
        font-size: 1rem;
        font-weight: 600;
      }
      @include laptop {
        font-size: 1rem;
        font-weight: 300;
      }
    }
  }

  &__container {
    position: relative;
    width: 100%;
    // border: 1px solid red;

    @include mobile {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      margin: 60px 0;
      //   border: 1px solid red;
    }
    @include tablet {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      margin: 60px 0;
    }
    @include laptop {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin: 60px 0;
      column-gap: 100px;
    }

    .country__flag {
      width: 100%;

      @include mobile {
        height: 200px;
      }
      @include tablet {
        height: 250px;
      }
      @include laptop {
        height: 300px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .country__info {
      align-self: center;
      // border: 1px solid red;

      h1 {
        position: relative;

        @include mobile {
          font-size: 1.2rem;
          margin: 28px 0 12px;
        }
        @include tablet {
          font-size: 1.2rem;
          margin: 28px 0 15px;
        }
        @include laptop {
          font-size: 1.7rem;
          margin-bottom: 20px;
          font-weight: 800;
        }
      }

      .country__text-wrapper {
        width: 90%;
        display: flex;

        @include mobile {
          flex-direction: column;
          align-items: flex-start;
        }
        @include tablet {
          flex-direction: column;
          align-items: flex-start;
        }
        @include laptop {
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .country__text {
          position: relative;

          @include mobile {
            margin-bottom: 20px;
          }
          @include tablet {
            margin-bottom: 20px;
          }

          p {
            @include mobile {
              font-size: 0.78rem;
              margin: 5px 0;
            }
            @include tablet {
              font-size: 0.8rem;
              margin: 5px 0;
            }
            @include laptop {
              font-size: 0.9rem;
              margin: 5px 0;
            }

            // .bold{
            //     font-size: .75rem;
            // }

            .lang {
              &:last-child {
                &::after {
                  content: " ";
                }
              }
              &::after {
                content: ", ";
              }
            }
          }
        }
      }
    }

    .country__border {
      position: relative;

      @include mobile {
        margin-bottom: 20px;
      }

      .bold {
        @include mobile {
          font-size: 0.79rem;
        }
        @include tablet {
          font-size: 0.85rem;
        }
        @include laptop {
          font-size: 0.9rem;
        }
      }

      p {
        .borders {
          box-shadow: 1px 1px 8px rgba($color: #1a1a1a, $alpha: 0.15);
          padding: 2px 20px;
          margin-right: 10px;
          text-transform: lowercase;
          font-size: 0.85rem;

          a{
            text-decoration: none;
            color: $mode-text;
          }
        }
      }
    }
  }
}
</style>