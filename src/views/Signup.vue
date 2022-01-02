<template>
  <!-- The verification code form -->
  <main class="response" v-if="isSent">
    <h1>Email verification code sent to your email, enter it here</h1>
    <form class="response__form" @submit.prevent="verifyForm">
      <BaseInputField class="input-box">
        <input
          type="email"
          id="response-email"
          required
          v-model="verificationDetails.email"
          autocomplete="email"
        />
        <label for="response-email">Email</label>
      </BaseInputField>
      <BaseInputField class="input-box">
        <input
          type="text"
          id="code"
          required
          v-model="verificationDetails.code"
        />
        <label for="code">verification code</label>
      </BaseInputField>
      <BaseButton :class="[isLoading ? 'loading' : '', 'response__btn']"
        >Verify me</BaseButton
      >
    </form>
  </main>

  <!-- The signup form  -->
  <main class="signup" v-else>
    <section class="signup__image">
      <img src="@/assets/world.png" alt="world map" />
    </section>
    <section class="signup__form">
      <h1>Exploring the world starts here. Signup to continue</h1>
      <form autocomplete="off" @submit.prevent="submitForm">
        <div class="errorMessage" v-show="errorMessage">{{ errorMessage }}</div>
        <BaseInputField class="input-box">
          <input
            type="email"
            id="email"
            v-model="loginDetails.email"
            required
            autocomplete="email"
            inputmode="email"
          />
          <label for="email">Email</label>
        </BaseInputField>
        <BaseInputField class="input-box">
          <select v-model="loginDetails.country" class="select" required>
            <option
              :value="country"
              v-for="(country, index) in countryList"
              :key="index"
            >
              {{ country }}
            </option>
          </select>
          <label for="country">country</label>
        </BaseInputField>
        <BaseButton :class="[isLoading ? 'loading' : '', 'signup__btn']">
          Signup
        </BaseButton>

        <p class="signup__alt-text">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="login-link"
            >Login</router-link
          >
        </p>
      </form>
    </section>
  </main>
</template>

<script>
import BaseInputField from "../components/BaseInputField";
import BaseButton from "../components/BaseButton";
import axios from "axios";
import countryList from "@/assets/js/country.js";

export default {
  name: "Signup",
  components: {
    BaseInputField,
    BaseButton,
  },
  data() {
    return {
      countryList,
      isLoading: false,
      isSent: false,
      errorMessage: null,
      loginDetails: {
        email: "",
        country: "",
      },
      verificationDetails: {
        email: "",
        code: null,
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.loginDetails);
      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/send-verify-email-code",
        headers: {
          "content-type": "apllication/json",
        },
        data: JSON.stringify(this.loginDetails),
      };

      axios(config)
        .then((response) => {
          this.isLoading = false;

          if (
            response.data.data.message === "Email verification code sent" ||
            response.data.status === 200
          ) {
            this.isSent = true;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error.response.data);

          this.errorMessage = error.response.data.error.fields.email[0];

          //   if (error.response.data.error.fields.email[0] !== undefined) {
          //     this.errorMessage = "The email is already taken";
          //   } else if (error.response.data.error.fields.country[0]) {
          //     this.errorMessage = "The selected country is invalid";
          //   } else {
          //     this.errorMessage = "Incorrect details";
          //   }

          setTimeout(() => {
            this.errorMessage = null;
          }, 4000);
        });
    },
    verifyForm() {
      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/verify-email-code",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(this.verificationDetails),
      };

      axios(config)
        .then((response) => {
          console.log(response);

          if (response.status === 200 || response.success === true) {
            sessionStorage.setItem("api_token", response.data.data.api_token);
            this.$router.push({ name: "SetPassword" });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.response {
  position: relative;
  width: 100%;
  animation: reveal 0.2s ease;

  h1 {
    text-align: center;
    margin: 20px auto;
    padding: 0 20px;
    color: $mode-text;

    @include mobile {
      font-size: 1.4rem;
    }
    @include tablet {
      font-size: 1.4rem;
    }
    @include laptop {
      font-size: 1.6rem;
      width: 40%;
    }
  }

  form {
    position: relative;
    margin: 10px auto;

    @include mobile {
      width: 90%;
    }
    @include tablet {
      width: 90%;
    }
    @include laptop {
      width: 40%;
    }

    .input-box {
      position: relative;
      width: 100%;

      @include mobile {
        margin-bottom: 20px;
      }
      @include tablet {
        margin-bottom: 20px;
      }
      @include laptop {
        margin-bottom: 30px;
      }

      input {
        width: 100%;
        height: 45px;
        border: 1px solid #aaa;
        border-radius: 5px;
        display: block;
        padding-left: 15px;
        outline: none;
        background: transparent;

        &:focus {
          border: 1px solid $mode-text;

          & ~ label {
            top: 0px;
            left: 10px;
            padding: 0 5px;
            color: $mode-text;
            background: $mode-bg;
            z-index: 10;
            font-weight: 600;
          }
        }

        &:valid {
          border: 1px solid $mode-text;

          & ~ label {
            top: 0px;
            left: 10px;
            padding: 0 5px;
            color: $mode-text;
            background: $mode-bg;
            z-index: 10;
          }
        }

        &:valid:not(:focus) {
          border: 1px solid #aaa;

          & ~ label {
            top: 0px;
            left: 10px;
            padding: 0 5px;
            color: $mode-text;
            background: $mode-bg;
            z-index: 10;
          }
        }
      }
      label {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        text-transform: capitalize;
        transition: 0.15s ease;
        pointer-events: none;
        font-weight: 300;

        @include mobile {
          font-size: 0.75rem;
        }
        @include tablet {
          font-size: 0.85rem;
        }
        @include laptop {
          font-size: 0.9rem;
        }
      }
    }

    .response__btn {
      width: 100%;
      padding: 15px 0;
      border: none;
      background-color: $mode-text;
      color: $white;
      font-weight: 600;
      outline: 2px dashed $mode-text;
      outline-offset: -5px;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      // box-shadow: -10px 10px 0px rgba($color: $mode-text, $alpha: .3);
      transition: outline-offset 0.1s ease;

      &:active {
        box-shadow: none;
        outline: 2px dashed $mode-text;
        outline-offset: 4px;
      }
      &:not(:active) {
        outline: none;
      }
      &:hover {
        box-shadow: none;
        outline: 2px dashed $mode-text;
        outline-offset: 5px;
      }
      &:not(:hover) {
        outline: none;
      }

      &:focus {
        box-shadow: none;
        outline: 2px dashed $mode-text;
        outline-offset: 5px;
      }
      &:not(:focus) {
        outline: none;
      }

      &.loading {
        position: relative;
        z-index: 2;
        cursor: wait;
        color: rgb(167, 167, 167);
        pointer-events: none;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 300%;
          height: 100%;
          background: $mode-text
            repeating-linear-gradient(
              60deg,
              transparent,
              transparent 10px,
              lighten($color: $mode-text, $amount: 5%) 10px,
              lighten($color: $mode-text, $amount: 5%) 20px
            );
          z-index: -1;
          animation: loading 1s infinite linear;
        }
      }
    }
  }
}

// the form styling starts here
.signup {
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  animation: reveal 0.2s ease;

  @include mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @include tablet {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @include laptop {
    display: grid;
    grid-template-columns: 65% 35%;
  }

  &__image {
    width: 100%;
    height: 100%;
    // border: 1px solid red;

    @include mobile {
      display: none;
    }
    @include tablet {
      display: none;
    }
    @include laptop {
      display: flex;
      align-items: center;
      background-color: #2b2b2b;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  &__form {
    width: 90%;
    height: 100%;

    @include mobile {
      display: flex;
      flex-direction: column;
    }
    @include tablet {
      display: flex;
      flex-direction: column;
    }
    @include laptop {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin: auto;
      padding: 40px;
    }

    h1 {
      margin: 20px auto;
      color: $mode-text;

      @include mobile {
        font-size: 1.4rem;
      }
      @include tablet {
        font-size: 1.4rem;
      }
      @include laptop {
        font-size: 1.6rem;
      }
    }

    .errorMessage {
      text-align: center;
      padding: 7px;
      border-radius: 5px;
      background-color: rgb(216, 43, 43);
      color: $white;
      margin: 5px 0 15px;
      font-size: 0.9rem;
    }

    form {
      position: relative;
      width: 100%;

      .input-box {
        position: relative;
        width: 100%;

        @include mobile {
          margin-bottom: 20px;
        }
        @include tablet {
          margin-bottom: 20px;
        }
        @include laptop {
          margin-bottom: 30px;
        }

        input,
        .select {
          width: 100%;
          height: 45px;
          border: 1px solid #aaa;
          border-radius: 5px;
          display: block;
          padding-left: 15px;
          outline: none;
          background: transparent;

          &:focus {
            border: 1px solid $mode-text;

            & ~ label {
              top: 0px;
              left: 10px;
              padding: 0 5px;
              color: $mode-text;
              background: $mode-bg;
              z-index: 10;
              font-weight: 600;
            }
          }

          &:valid {
            border: 1px solid $mode-text;

            & ~ label {
              top: 0px;
              left: 10px;
              padding: 0 5px;
              color: $mode-text;
              background: $mode-bg;
              z-index: 10;
            }
          }
          &:autocomplete {
            background-color: transparent;
          }
          &:valid:not(:focus) {
            border: 1px solid #aaa;

            & ~ label {
              top: 0px;
              left: 10px;
              padding: 0 5px;
              color: $mode-text;
              background: $mode-bg;
              z-index: 10;
            }
          }
        }
        label {
          display: block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 15px;
          text-transform: capitalize;
          transition: 0.15s ease;
          pointer-events: none;
          font-weight: 300;

          @include mobile {
            font-size: 0.75rem;
          }
          @include tablet {
            font-size: 0.85rem;
          }
          @include laptop {
            font-size: 0.9rem;
          }
        }
      }

      // The signup button style
      .signup__btn {
        width: 100%;
        padding: 15px 0;
        border: none;
        background-color: $mode-text;
        color: $white;
        font-weight: 600;
        outline: 2px dashed $mode-text;
        outline-offset: -5px;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        // box-shadow: -10px 10px 0px rgba($color: $mode-text, $alpha: .3);
        transition: outline-offset 0.1s ease;

        &:active {
          box-shadow: none;
          outline: 2px dashed $mode-text;
          outline-offset: 4px;
        }
        &:not(:active) {
          outline: none;
        }

        &:hover {
          box-shadow: none;
          outline: 2px dashed $mode-text;
          outline-offset: 4px;
        }
        &:focus {
          box-shadow: none;
          outline: 2px dashed $mode-text;
          outline-offset: 4px;
        }

        &.loading {
          position: relative;
          z-index: 2;
          cursor: wait;
          color: rgb(167, 167, 167);

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 300%;
            height: 100%;
            background: $mode-text
              repeating-linear-gradient(
                60deg,
                transparent,
                transparent 10px,
                lighten($color: $mode-text, $amount: 5%) 10px,
                lighten($color: $mode-text, $amount: 5%) 20px
              );
            z-index: -1;
            animation: loading 1s infinite linear;
          }
        }
      }

      .signup__alt-text {
        text-align: center;
        margin-top: 20px;

        @include mobile {
          font-size: 0.75rem;
        }
        @include tablet {
          font-size: 0.85rem;
        }
        @include laptop {
          font-size: 0.95rem;
        }

        .login-link {
          color: $mode-text;
          text-decoration: none;
          font-weight: 600;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}

// Loading animation
@keyframes loading {
  0% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(20px);
  }
}

@keyframes reveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>