export type BookDTO = {
  id: number;
  name: string;
  author?: string;
  ISBN?: string;
  publisher?: string;
  year?: number;
  skills: string[];
  coverURL?: string;
};