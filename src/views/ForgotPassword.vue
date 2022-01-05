<template>
  <!-- Response element after code has been sent -->
  <main class="sent" v-if="isSent">
    <h1>Password reset code sent</h1>
  </main>

  <!-- The password reset form -->
  <main class="reset" v-else>
    <h1>Forget password?</h1>
    <p>Enter your email to reset your password</p>

    <form class="reset__form" @submit.prevent="resetPassword">
        <div class="message" v-show="errorMessage">{{ errorMessage }}</div>
      <BaseInputField class="input-box">
        <input
          type="email"
          id="email"
          required
          autocomplete="email"
          inputmode="email"
          v-model="resetDetails.email"
        />
        <label for="email">Email</label>
      </BaseInputField>
      <BaseButton
        :class="['reset__btn', isLoading ? 'loading' : '']"
        type="submit"
        >Reset password</BaseButton
      >
    </form>
  </main>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseInputField from "../components/BaseInputField.vue";
import axios from "axios";

export default {
  name: "ForgotPassword",
  components: { BaseButton, BaseInputField },
  data() {
    return {
      isLoading: false,
      isSent: false,
      errorMessage: null,
      resetDetails: {
        email: "",
      },
    };
  },
  methods: {
    resetPassword() {

      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/forgot-password",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(this.resetDetails),
      };

      axios(config)
        .then((response) => {
          this.isLoading = false;

          if (response.data.status === 200 || response.data.success === true) {
            this.isSent = true;
            setTimeout(() => {
              this.$router.push({
                name: "NewPassword",
              });
            }, 2000);
          }
        })
        .catch((error) => {
          this.errorMessage = 'This email does not exist';
          this.isLoading = false;

          setTimeout(()=>{
              this.errorMessage = null;
          }, 4000)
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.sent {
  position: relative;
  width: 100%;
  animation: reveal 0.2s ease;

  h1 {
    text-align: center;
    margin: 20px 0;
    font-weight: 600;

    @include mobile {
      font-size: 1.3rem;
    }
    @include mobile {
      font-size: 1.5rem;
    }
    @include laptop {
      font-size: 1.8rem;
    }
  }
}

.reset {
  position: relative;
  width: 100%;
  animation: reveal 0.2s ease;

  h1 {
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
    color: $mode-text;

    @include mobile {
      padding: 0 20px;
      font-size: 1.7rem;
    }
  }
  p {
    text-align: center;
    font-weight: 300;

    @include mobile {
      font-size: 0.9rem;
    }
  }

  &__form {
    position: relative;

    @include mobile {
      width: 90%;
      margin: 20px auto;
    }
    @include tablet {
      width: 80%;
      margin: 20px auto;
    }
    @include laptop {
      width: 30%;
      margin: 20px auto;
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
        margin-bottom: 20px;
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
    }

    .reset__btn {
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