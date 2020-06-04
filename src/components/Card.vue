<template>
  <div
    :class="{ 'card': true, 'dragging': isDragging }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="header">
      <div :class="`tag ${classTag}`" @click="handleTag" />
      <div class="close" @click="handleRemove" />
    </div>

    <p>{{card.text}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { CardState, Tag } from '@/store/state';
import { FindCardProps } from '@/store/mutations';

@Component
export default class Card extends Vue {
  @Prop({ required: true })
  readonly listId!: number;

  @Prop({ required: true })
  readonly card!: CardState;

  isDragging = false;

  @Mutation
  setDraggingCardHeight!: (height: number) => void;

  @Mutation
  removeCard!: (props: FindCardProps) => void;

  @Mutation
  toggleCardTag!: (props: FindCardProps) => void;

  get classTag() {
    return Tag[this.card.tag].toLowerCase();
  }

  handleDragStart(e: { dataTransfer: DataTransfer; target: EventTarget }) {
    const data = JSON.stringify({
      listId: this.listId,
      card: this.card,
    });

    e.dataTransfer.setData('card', data);
    const cardHeight = (e.target as HTMLDivElement).offsetHeight;

    this.isDragging = true;
    this.setDraggingCardHeight(cardHeight);
  }

  handleDragEnd() {
    this.isDragging = false;
    this.setDraggingCardHeight(0);
  }

  handleTag() {
    this.toggleCardTag({
      listId: this.listId,
      cardId: this.card.id,
    });
  }

  handleRemove() {
    this.removeCard({
      listId: this.listId,
      cardId: this.card.id,
    });
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  padding: 7px 15px;
  box-shadow: 0px 0px 3px rgb(0, 0, 10, 0.1);
  transition: opacity 0.3s;

  &:hover .close {
    opacity: 1;
  }

  p {
    font-size: 16px;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;

  .close {
    opacity: 0;
    transition: opacity 0.4s;
  }
}

.tag {
  width: 30px;
  height: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.yellow {
  background: #fdd835;
}

.blue {
  background: #2196f3;
}

.red {
  background: #f44336;
}

.green {
  background: #4caf50;
}

.dragging {
  opacity: 0.3;
}
</style>
