import { CardState, Tag } from '@/store/state';

const createCard = (text: string, tag: Tag = Tag.YELLOW): CardState => ({
  id: Date.now().toString(),
  text,
  tag,
});

export default createCard;
