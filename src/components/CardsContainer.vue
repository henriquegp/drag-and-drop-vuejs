<template>
  <div>
    <div class="container">
      <Dropzone :listId="listId" />

      <div v-for="(card, index) in cards" :key="card.id">
        <Card :card="card" :listId="listId" />
        <Dropzone :listId="listId" :index="index + 1" />
      </div>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="new-card">
        <input type="text" placeholder="Add Card" v-model="text" />
        <button type="submit" class="add"></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { CardState } from '@/store/state';
import { AddCardProps } from '@/store/mutations';
import Card from './Card.vue';
import Dropzone from './Dropzone.vue';

@Component({
  components: {
    Card,
    Dropzone,
  },
})
export default class CardsContainer extends Vue {
  @Prop({ required: true })
  readonly listId!: number;

  @Prop({ required: true })
  readonly cards!: CardState[];

  @Mutation
  addCard!: (props: AddCardProps) => void;

  text = '';

  handleSubmit() {
    if (!this.text) {
      return;
    }

    this.addCard({
      listId: this.listId,
      text: this.text,
    });
    this.text = '';
  }
}
</script>

<style scoped lang="scss">
.container {
  overflow: auto;
  max-height: 80vh;
}

.new-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #bdbdbd;
  padding: 8px 10px;

  input {
    font-size: 16px;
    border: none;
    background: transparent;
    outline: none;
  }
}
</style>
