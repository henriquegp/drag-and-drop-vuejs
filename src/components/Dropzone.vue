<template>
  <div
    class="dropzone"
    @dragover.stop.prevent="handleDragOver"
    @dragleave.stop.prevent="handleDragLeave"
    @drop="handleDrop"
  >
    <div :style="dropzoneCardStyle"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { CardState } from '@/store/state';
import { MoveCardProps } from '@/store/actions';

interface DroppedCard {
  listId: number;
  card: CardState;
}

@Component
export default class Dropzone extends Vue {
  @Prop({ required: true })
  readonly listId!: number;

  @Prop({ default: 0 })
  readonly index!: number;

  @State
  draggingCardHeight!: string;

  @Action
  moveCard!: (props: MoveCardProps) => void;

  isDraggingOver = false;

  get dropzoneCardStyle() {
    const height = this.isDraggingOver ? `${this.draggingCardHeight}px` : '';
    return {
      height,
      'max-height': height,
    };
  }

  handleDragOver() {
    this.isDraggingOver = true;
  }

  handleDragLeave() {
    this.isDraggingOver = false;
  }

  handleDrop(e: { dataTransfer: DataTransfer }) {
    this.isDraggingOver = false;
    const data = e.dataTransfer.getData('card');
    const droppedCard: DroppedCard = JSON.parse(data);

    if (droppedCard?.listId) {
      this.moveCard({
        fromListId: droppedCard.listId,
        toListId: this.listId,
        toListIndex: this.index,
        card: droppedCard.card,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dropzone {
  width: 100%;
  padding: 10px 0px;

  > div {
    background: #eeeeee;
    pointer-events: none;
    border-radius: 6px;
    transition: max-height 0.3s;
    max-height: 0;
    overflow: hidden;
  }
}
</style>
