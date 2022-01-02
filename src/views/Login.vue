<template>
  <main class="login">
    <section class="login__image">
      <img src="@/assets/world.png" alt="world map" />
    </section>
    <section class="login__form">
      <h1>Exploring the world starts here. Login to begin</h1>

      <div class="message" v-if="message">
        {{ message }}
      </div>
      
      <form @submit.prevent="loginUser">
        <div class="errorMessage" v-show="errorMessage">{{ errorMessage }}</div>
        <BaseInputField class="input-box">
          <input
            type="email"
            id="email"
            v-model="loginDetails.email"
            autocomplete="email"
            required
          />
          <label for="email">Email</label>
        </BaseInputField>
        <router-link :to="{ name: 'ForgotPassword' }" class="forgot-password"
          >Forgot Password?</router-link
        >
        <BaseInputField class="input-box">
          <input
            type="password"
            id="password"
            v-model="loginDetails.password"
            required
            autocomplete="password"
          />
          <label for="password">Password</label>
          <span class="password__toggle" @click="togglePassword"
            ><i class="bx bx-hide"></i
          ></span>
        </BaseInputField>
        <BaseButton :class="['login__btn', isLoading ? 'loading' : '']">
          Login
        </BaseButton>

        <p class="login__alt-text">
          Don't have an account?
          <router-link :to="{ name: 'Signup' }" class="login-link"
            >Signup</router-link
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

export default {
  name: "Login",
  props: {
    message: String,
  },
  components: {
    BaseInputField,
    BaseButton,
  },
  data() {
    return {
      isLoading: false,
      loginDetails: {
        email: "",
        password: "",
      },
      errorMessage: null,
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
    loginUser() {
      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/login",
        header: {
          "Content-Type": "application/json",
        },
        data: this.loginDetails,
      };

      axios(config)
        .then((response) => {
          this.isLoading = false;

          if(response.data.status === 200 || response.data.success === true){
            sessionStorage.setItem('api_token', response.data.data.api_token)
            this.$router.push({
              name: 'CountryListing'
            })
          }
        })
        .catch((err) => {
          this.isLoading = false;

          if(err.response.data.status === 422 && err.response.data.error.fields.email != null ){
            this.errorMessage = "Your email is incorrect"
          }else if(err.response.data.status === 422 && err.response.data.error.fields.password[0] != null ){
            this.errorMessage = "The password must be at least 8 characters"
          }else if(err.response.data.status === 401){
            this.errorMessage = 'Your password is wrong'
          }else{
            this.errorMessage = 'Incorrect details'
          }

          setTimeout(() =>{
            this.errorMessage = null;
          }, 4000)
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;

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
      padding: 0;
      width: 90%;
      margin: 20px auto;
    }
    @include tablet {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 20px auto;
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
      text-align: left;
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

    .message {
      width: 100%;
      padding: 7px;
      border-radius: 5px;
      background-color: #418341;
      color: $white;
      text-align: center;
      font-size: 0.85rem;
      margin-bottom: 15px;
    }

    form {
      position: relative;
      width: 100%;

      .errorMessage{
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
            //   background: transparent;
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

      .forgot-password {
        text-decoration: none;
        display: block;
        text-align: right;
        color: $mode-text;
        margin: 5px 0;

        @include mobile {
          font-size: 0.75rem;
        }
        @include mobile {
          font-size: 0.83rem;
        }
        @include laptop {
          font-size: 0.88rem;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      // The login button style
      .login__btn {
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
        &:active {
          box-shadow: none;
          outline: 2px dashed $mode-text;
          outline-offset: 4px;
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

      .login__alt-text {
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
</style>