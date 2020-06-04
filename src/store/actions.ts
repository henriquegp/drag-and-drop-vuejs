import { ActionTree } from 'vuex';
import { ApplicationState, CardState } from './state';

export interface MoveCardProps {
  fromListId: number;
  toListId: number;
  toListIndex: number;
  card: CardState;
}

const actions: ActionTree<ApplicationState, ApplicationState> = {
  moveCard({ commit }, payload: MoveCardProps) {
    const {
      fromListId, toListId, toListIndex, card,
    } = payload;

    commit('removeCard', {
      listId: fromListId,
      cardId: card.id,
    });

    commit('addCardByIndex', {
      listId: toListId,
      text: card.text,
      index: toListIndex,
      tag: card.tag,
    });
  },
};

export default actions;
