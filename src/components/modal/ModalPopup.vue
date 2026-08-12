<template>
  <div class="modal-popup">
    <div @click="hideWindow" class="modal-popup__wrapper">
      <div class="modal-popup__window">
        <icon-base class="modal-popup__icon" :class="['modal-popup__icon--' + typeModal]">
          <icon-error v-if="typeModal == 'delete'" />
          <icon-warning v-else />
        </icon-base>
        <p class="modal-popup__title">{{ type[typeModal].title }}?</p>
        <div class="modal-popup__footer">
          <button
            class="modal-popup__button"
            :class="['modal-popup__button--' + typeModal]"
            @click="confirm()"
          >{{ type[typeModal].buton }}</button>
          <button class="modal-popup__button" @click="hideWindow">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// icons
import IconBase from "../icons/IconBase.vue";
import IconWarning from "../icons/IconWarning.vue";
import IconError from "../icons/IconError.vue";

export default {
  name: "ModalPopup",
  components: {
    IconBase,
    IconWarning,
    IconError
  },
  props: {
    typeModal: {
      type: String,
      default: "delete"
    }
  },
  data: () => ({
    type: {
      delete: {
        title: "Видалити нотатку",
        buton: "Видалити"
      },
      editing: {
        title: "Скасувати редагування",
        buton: "Скасувати"
      }
    }
  }),
  methods: {
    hideWindow() {
      this.$emit("hideWindow");
    },
    confirm() {
      this.$emit("modalConfirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.modal-popup {
  &__wrapper {
    display: block;
    background: #00000055;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  &__window {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    border-radius: $brd;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    min-width: 340px;
    padding: 30px;
    z-index: 2000;
    animation: scale 50ms linear;
    box-shadow: $shadow;
  }

  &__icon {
    width: 50px;
    height: 50px;

    &--editing {
      color: $orange-color;
    }

    &--delete {
      color: $red-color;
    }
  }

  &__title {
    font-size: 24px;
    padding: 20px 0;
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__button {
    font-size: 15px;
    padding: 5px 18px;
    border: 1px solid;
    border-radius: 20px;
    line-height: 18px;

    &:hover {
      background-color: $gray-color;
    }

    &--editing {
      color: $orange-color;

      &:hover {
        background-color: $orange-color;
        color: #fff;
      }
    }

    &--delete {
      color: $red-color;

      &:hover {
        background-color: $red-color;
        color: #fff;
      }
    }
  }
}

@keyframes scale {
  from {
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
