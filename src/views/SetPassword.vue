<template>
// This is the page to create a new password after email verification
  <main class="password">
    <h1>Create your password</h1>
    <form
      class="password__form"
      @submit.prevent="setPassword"
      autocomplete="off"
    >

    <div class="message" v-show="errorMessage">
        {{ errorMessage }}
    </div>
      <BaseInputField class="input-box">
        <input
          type="password"
          id="passsword"
          v-model="userPassword.password"
          inputmode="text"
          required
          autocomplete="new-password"
        />
        <label for="password">Your passsword</label>
        <span class="password__toggle" @click="togglePassword"
          ><i class="bx bx-hide"></i
        ></span>
      </BaseInputField>
      <BaseButton
        :class="[isLoading ? 'loading' : '', 'password__btn']"
        type="submit"
        >Set password</BaseButton
      >
    </form>
  </main>
</template>

<script>
import BaseInputField from "../components/BaseInputField.vue";
import BaseButton from "../components/BaseButton.vue";
import axios from "axios";

export default {
  name: "SetPassword",
  components: {
    BaseInputField,
    BaseButton,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      userPassword: {
        password: "",
      },
    };
  },
  methods: {
    togglePassword(e) {
      let passwordField =
        e.target.parentElement.previousElementSibling.previousElementSibling;
      let icon = e.target;
      if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.className = "bx bxs-hide";
      } else {
        passwordField.type = "password";
        icon.className = "bx bxs-show";
      }
    },
    setPassword() {
      console.log(this.userPassword);

      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/set-password",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("api_token")}`,
        },
        data: JSON.stringify(this.userPassword),
      };

      axios(config)
        .then((response) => {
          console.log(response);
          this.isLoading = false;

          if (response.status === 204) {
            this.$router.push({
              name: "Login",
              params: {
                message: "Account created successfully",
              },
            });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.errorMessage = 'Password must be at least 8 characters'

          setTimeout(() =>{
              this.errorMessage = null
          }, 3000)
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.password {
  width: 100%;

  h1 {
    text-align: center;
    margin: 20px 0;
    padding: 0 20px;

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

  &__form {
    position: relative;
    width: 90%;
    margin: 10px auto;

    @include mobile {
      width: 90%;
    }
    @include tablet {
      width: 70%;
    }
    @include laptop {
      width: 30%;
    }

    .message{
        text-align: center;
        padding: 7px;
        border-radius: 5px;
        background-color: rgb(216, 43, 43);
        color: $white;
        margin: 10px 0 12px;
        font-size: .9rem;
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
        position: relative;
        width: 100%;
        height: 45px;
        border: 1px solid #aaa;
        border-radius: 5px;
        display: block;
        padding-left: 15px;
        outline: none;
        background: transparent;
        z-index: 10;

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

      .password__toggle {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-45%);
        right: 15px;
        text-transform: capitalize;
        transition: 0.15s ease;
        font-weight: 300;
        cursor: pointer;
        z-index: 15;

        i {
          color: $mode-input;
          cursor: pointer;
        }
      }
    }

    .password__btn {
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
      &:focus {
        box-shadow: none;
        outline: 2px dashed $mode-text;
        outline-offset: 5px;
      }

      &:hover {
        box-shadow: none;
        outline: 2px dashed $mode-text;
        outline-offset: 5px;
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

// Loading animation
@keyframes loading {
  0% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(20px);
  }
}
</style>