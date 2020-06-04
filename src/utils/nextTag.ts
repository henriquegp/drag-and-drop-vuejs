import { Tag } from '@/store/state';

const nextTag = (tag: Tag): Tag => (Tag[tag + 1] ? tag + 1 : 0);

export default nextTag;
