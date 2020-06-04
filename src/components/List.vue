<template>
  <div class="list">
    <div class="header">
      <div>
        <h2 v-show="!isEditing" @click="setEditing">{{ list.title }}</h2>
        <form v-show="isEditing" @submit.prevent="handleSubmit">
          <input
            type="text"
            class="input-edit-title"
            ref="inputEdit"
            v-model="title"
            @blur="handleSubmit"
          />
        </form>
      </div>
      <div class="close" @click="handleRemove" />
    </div>

    <CardsContainer :listId="list.id" :cards="list.cards" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { ListState } from '@/store/state';
import { EditListTitleProps } from '@/store/mutations';
import CardsContainer from './CardsContainer.vue';

@Component({
  components: {
    CardsContainer,
  },
})
export default class List extends Vue {
  @Prop({ required: true })
  readonly list!: ListState;

  @Mutation
  editListTitle!: (props: EditListTitleProps) => void;

  @Mutation
  removeList!: (listId: number) => void;

  $refs!: {
    inputEdit: HTMLInputElement;
  };

  title = '';

  isEditing = false;

  setEditing() {
    this.isEditing = true;
    this.$nextTick(() => {
      this.$refs.inputEdit.focus();
    });
  }

  handleRemove() {
    this.removeList(this.list.id);
  }

  handleSubmit() {
    if (!this.title) {
      return;
    }

    this.isEditing = false;
    this.editListTitle({
      listId: this.list.id,
      newTitle: this.title,
    });
  }

  mounted() {
    this.title = this.list.title;
  }
}
</script>

<style scoped lang="scss">
.list {
  width: 300px;
  border-radius: 6px;
  box-shadow: 0px 0px 100px rgb(0, 0, 0, 0.1);
  padding: 10px 15px;
  margin-right: 30px;
  background: #e8eaf6;
}

.header {
  display: flex;
  align-items: center;

  > div:first-child {
    width: 100%;
  }

  .close {
    margin-left: 10px;
    opacity: 0;
    transition: opacity 0.4s;
    width: 15px;
    width: 15px;
  }

  &:hover .close {
    opacity: 1;
  }
}

h2 {
  cursor: pointer;
}

.input-edit-title {
  width: 100%;
  border: none;
  outline-color: #5c6bc0;
}

h2,
.input-edit-title {
  padding: 3px 5px;
  font-size: 22px;
  font-weight: 700;
}
</style>
