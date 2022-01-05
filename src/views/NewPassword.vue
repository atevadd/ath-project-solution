<template>
  <main class="new-password">
    <h1>Enter your new password</h1>

    <form class="new-password__form" @submit.prevent="setPassword">
      <div class="errorMessage" v-show="errorMessage">{{ errorMessage }}</div>
      <BaseInputField class="input-box">
        <input
          type="email"
          v-model="userDetails.email"
          id="email"
          required
          inputmode="email"
        />
        <label for="email">Email</label>
      </BaseInputField>
      <BaseInputField class="input-box">
        <input
          type="text"
          v-model="userDetails.code"
          id="code"
          required
          inputmode="numeric"
        />
        <label for="code">Reset code</label>
      </BaseInputField>
      <BaseInputField class="input-box">
        <input
          type="password"
          v-model="userDetails.password"
          id="password"
          autocomplete="new-password"
          inputmode="text"
          required
        />
        <label for="password">New password</label>
      </BaseInputField>
      <BaseButton
        :class="['new-password__btn', isLoading ? 'loading' : '']"
        type="submit"
        >Submit</BaseButton
      >
    </form>
  </main>
</template>

<script>
import BaseInputField from "@/components/BaseInputField.vue";
import BaseButton from "@/components/BaseButton.vue";
import axios from "axios";

export default {
  name: "NewPassword",
  components: {
    BaseInputField,
    BaseButton,
  },
  data() {
    return {
      isLoading: false,
      userDetails: {
        email: "",
        code: "",
        password: "",
      },
      errorMessage: null,
    };
  },
  methods: {
    setPassword() {
      // console.log(this.userDetails);

      this.isLoading = true;

      let config = {
        method: "POST",
        url: "https://dev.pay4me.app/api/v2/auth/reset-password",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(this.userDetails),
      };

      axios(config)
        .then((response) => {
          this.isLoading = false;

          if (response.data.status === 200 || response.data.success === true) {
            this.$router.push({
              name: "Login",
              params: {
                message: response.data.data.message,
              },
            });
          }
        })
        .catch((err) => {
          this.isLoading = false;

          if(err.response.data.status === 422) {
            this.errorMessage = err.response.data.error.fields.password[0];
          }else{
              this.errorMessage = err.response.data.message;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-password {
  width: 100%;
  position: relative;

  h1 {
    text-align: center;
    margin: 15px 0;
    color: $mode-text;

    @include mobile {
      font-size: 1.3rem;
    }
    @include tablet {
      font-size: 1.6rem;
    }
    @include laptop {
      font-size: 1.8rem;
    }
  }

  &__form {
    position: relative;

    @include mobile {
      width: 90%;
      margin: 20px auto;
    }
    @include tablet {
      width: 90%;
      margin: 20px auto;
    }
    @include laptop {
      width: 35%;
      margin: 20px auto;
    }

    .errorMessage {
      text-align: center;
      padding: 7px;
      border-radius: 5px;
      background-color: rgb(216, 43, 43);
      color: $white;
      margin: 10px 0 12px;
      font-size: 0.9rem;
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

    .new-password__btn {
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
</style>