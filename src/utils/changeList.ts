import { ListState } from '@/store/state';

interface ChangedList {
  (list: ListState): ListState;
}

const changeList = (
  lists: ListState[],
  listId: number,
  changedList: ChangedList,
) => lists.map(
  (list) => (list.id === listId ? changedList(list) : list),
);

export default changeList;
