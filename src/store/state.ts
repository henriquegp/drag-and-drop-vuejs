export enum Tag {
  YELLOW,
  BLUE,
  RED,
  GREEN,
}

export interface CardState {
  id: string;
  text: string;
  tag: Tag;
}

export interface ListState {
  id: number;
  title: string;
  cards: CardState[];
}

export interface ApplicationState {
  lists: ListState[];
  draggingCardHeight: number;
}

const state: ApplicationState = {
  lists: [
    {
      id: 1,
      title: 'To do',
      cards: [
        {
          id: Date.now().toString(),
          text: 'Welcome',
          tag: Tag.YELLOW,
        },
      ],
    },
  ],
  draggingCardHeight: 0,
};

export default state;
