export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: Post;
};
