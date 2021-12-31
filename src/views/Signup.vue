<template>
  <main class="signup">
    <section class="signup__image">
      <img src="@/assets/world.png" alt="world map" />
    </section>
    <section class="signup__form">
      <h1>Exploring the world starts here. Signup to continue</h1>
      <form action="" autocomplete="off">
        <BaseInputField class="input-box">
          <input
            type="email"
            id="email"
            required
            min="0"
            autocomplete="email"
          />
          <label for="email">Email</label>
        </BaseInputField>
        <BaseInputField class="input-box">
          <input type="text" id="country" required />
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

export default {
  name: "Signup",
  components: {
    BaseInputField,
    BaseButton,
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.signup {
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
    width: 100%;
    height: 100%;
    padding: 40px;

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
    }

    h1 {
      color: $mode-text;

      @include mobile {
        font-size: 1.5rem;
        margin-bottom: 25px;
      }
      @include tablet {
        font-size: 1.3rem;
        margin-bottom: 25px;
      }
      @include laptop {
        font-size: 2rem;
        margin-bottom: 35px;
      }
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
</style>