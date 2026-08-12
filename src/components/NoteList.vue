<template>
  <div class="note-list">
    <div class="note-list__empty-state" v-if="NOTES.length < 1">
      <img class="note-list__empty-img" :src="require('../assets/empty.png')" alt="Порожній список нотаток" />
      <p>Ой, схоже, тут порожньо. Створи нову нотатку (плюс унизу)</p>
    </div>
    <note-item v-for="note in NOTES" :key="note.id" :note="note" />
    <router-link class="note-list__add" :to="{name: 'AddNotes'}">
      <icon-base class="note-list__add-icon">
        <icon-add-circle />
      </icon-base>
    </router-link>
  </div>
</template>

<script>
import NoteItem from "./NoteItem";

// vuex
import { mapGetters, mapActions } from "vuex";

// icon
import IconBase from "./icons/IconBase.vue";
import IconAddCircle from "./icons/IconAddCircle.vue";

export default {
  name: "NoteList",
  components: {
    NoteItem,
    IconBase,
    IconAddCircle
  },
  computed: {
    ...mapGetters(["NOTES"])
  },
  beforeMount() {
    this.UPDATE_STORE();
  },
  methods: {
    ...mapActions(["UPDATE_STORE"])
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.note-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &__empty-state {
    width: 100%;
    margin: 8% auto 0;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
  }

  &__empty-img {
    width: 100%;
    max-width: 400px;
  }

  &__add {
    color: $main-color;
    position: fixed;
    bottom: 30px;
    right: 30px;
    user-select: none;

    &:hover {
      transform: rotate(360deg);
      transition: $transition-long;
    }

    &-icon {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
