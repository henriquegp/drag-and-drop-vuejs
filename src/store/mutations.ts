import { MutationTree } from 'vuex';

import changeList from '@/utils/changeList';
import createCard from '@/utils/createCard';
import nextTag from '@/utils/nextTag';
import { ApplicationState, Tag } from './state';

export interface EditListTitleProps {
  listId: number;
  newTitle: string;
}

export interface AddCardProps {
  listId: number;
  text: string;
}

export interface AddCardByIndexProps extends AddCardProps {
  index: number;
  tag: Tag;
}

export interface FindCardProps {
  listId: number;
  cardId: string;
}

const mutations: MutationTree<ApplicationState> = {
  addList(state, title: string) {
    state.lists.push({
      id: state.lists.length + 1,
      title,
      cards: [],
    });
  },

  editListTitle(state, { listId, newTitle }: EditListTitleProps) {
    state.lists = changeList(state.lists, listId, (list) => ({
      ...list,
      title: newTitle,
    }));
  },

  removeList(state, listId: number) {
    state.lists = state.lists.filter((list) => list.id !== listId);
  },

  addCard(state, { listId, text }: AddCardProps) {
    const newCard = createCard(text);

    state.lists = changeList(state.lists, listId, (list) => ({
      ...list,
      cards: [
        ...list.cards,
        { ...newCard },
      ],
    }));
  },

  addCardByIndex(state, payload: AddCardByIndexProps) {
    const {
      listId, text, index, tag,
    } = payload;
    const newCard = createCard(text, tag);

    state.lists = changeList(state.lists, listId, (list) => {
      const { cards } = list;
      cards.splice(index, 0, newCard);

      return {
        ...list,
        cards,
      };
    });
  },

  removeCard(state, { listId, cardId }: FindCardProps) {
    state.lists = changeList(state.lists, listId, (list) => ({
      ...list,
      cards: list.cards.filter((card) => card.id !== cardId),
    }));
  },

  toggleCardTag(state, { listId, cardId }: FindCardProps) {
    state.lists = changeList(state.lists, listId, (list) => ({
      ...list,
      cards: list.cards.map((card) => (
        card.id === cardId ? { ...card, tag: nextTag(card.tag) } : card
      )),
    }));
  },

  setDraggingCardHeight(state, height: number) {
    state.draggingCardHeight = height;
  },
};

export default mutations;
