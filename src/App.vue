<template>
  <div id="container">
    <template v-for="list in lists">
      <List :key="list.id" :list="list" />
    </template>

    <div>
      <form @submit.prevent="handleSubmit">
        <div id="new-list">
          <input type="text" placeholder="Add List" v-model="newList" />
          <button type="submit" class="add"></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import './styles/global.scss';

import { ListState } from '@/store/state';
import List from './components/List.vue';

@Component({
  components: {
    List,
  },
})
export default class App extends Vue {
  @State
  lists!: ListState;

  @Mutation
  addList!: (title: string) => void;

  newList = '';

  handleSubmit() {
    if (!this.newList) {
      return;
    }

    this.addList(this.newList);
    this.newList = '';
  }
}
</script>

<style lang="scss">
#container {
  width: 100%;
  height: 100vh;
  overflow-x: auto;
  padding: 40px 50px;
  display: flex;
  align-items: flex-start;
}

#new-list {
  $newListColor: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #7986cb;
  border-radius: 6px;
  width: 300px;
  color: $newListColor;

  &:hover {
    background: #9fa8da;
  }

  input {
    max-width: 300px;
    width: 100%;
    font-size: 16px;
    border: none;
    background: transparent;
    outline: none;
    color: inherit;

    &::placeholder {
      color: inherit;
    }
  }

  & .add:before,
  & .add:after {
    background: $newListColor;
  }
}
</style>
