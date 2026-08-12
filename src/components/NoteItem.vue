<template>
  <section class="note-item">
    <router-link
      class="note-item__link"
      :to="{
			name: 'NoteAction',
			params: { notesId: note.id }
		}"
    >
      <h2 :style="{ color: `#${note.id}bb`}" class="note-item__title">{{ note.title }}</h2>
      <ul class="note-item__todo">
        <li class="note-item__todo-item" v-for="(todo, index) in note.todo" :key="index">
          <span class="note-item__checkbox" :class="{'note-item__checkbox--checked': todo[0]}" />
          <span :class="{'note-item__todo-text--checked': todo[0]}">{{ todo[1] }}</span>
        </li>
      </ul>
    </router-link>
    <button class="note-item__delete" @click="showModal('delete')">
      <icon-base>
        <icon-delete-bin />
      </icon-base>
      <span>Видалити</span>
    </button>
    <modal-popup
      v-if="isShowModal"
      :typeModal="typeModal"
      @hideWindow="hideWindow"
      @modalConfirm="modalConfirm"
    />
  </section>
</template>

<script>
import ModalPopup from "./modal/ModalPopup";

// mixins
import modal from "../mixins/modal";

// vuex
import { mapActions } from "vuex";

// icon
import IconBase from "./icons/IconBase.vue";
import IconDeleteBin from "./icons/IconDeleteBin.vue";

export default {
  name: "NoteItem",
  components: {
    ModalPopup,
    IconBase,
    IconDeleteBin
  },
  mixins: [modal],
  props: {
    note: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    ...mapActions(["DELETE_ITEM"]),
    modalConfirm() {
      this.DELETE_ITEM(this.note.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "~@/styles/mixins.scss";

.note-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid $gray-color;
  border-radius: $brd;
  padding: 15px;
  margin: 15px;
  overflow: hidden;
  transition: $transition;

  &:hover {
    box-shadow: $shadow;
  }

  &__link {
    text-decoration: none;
    color: $text-color;
    height: 100%;
  }

  &__title {
    font-size: 24px;
    word-break: break-word;
    margin-bottom: 10px;
  }

  &__todo {
    list-style: none;
    max-height: 390px;
    overflow: hidden;
  }

  &__todo-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 7px 0;
  }

  &__checkbox {
    display: block;
    position: relative;
    min-width: 25px;
    width: 25px;
    height: 25px;
    background: $gray-color;
    border-radius: 50%;
    margin-right: 5px;

    &--checked {
      background: $main-color;

      &::after {
        content: "";
        position: absolute;
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }
  }

  &__todo-text {
    &--checked {
      text-decoration: line-through;
    }
  }

  &__delete {
    opacity: 1;
    margin-top: auto;
    margin-left: auto;
    padding-top: 5px;
    transition: $transition;

    &:hover {
      color: $red-color;
    }
  }

  @include xs-and-up {
    width: 44%;

    .note-item__delete {
      opacity: 0;
    }

    &:hover .note-item__delete {
      opacity: 1;
    }
  }

  @include sm-and-up {
    width: 29%;
  }

  @include md-and-up {
    width: 26%;
  }

  @include lg-and-up {
		min-width: 300px;
    width: 22%;
  }
}
</style>
