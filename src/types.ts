export interface UserType {
  id: number;
  username: String;
  email: String;
  password: String;
  posts: PostType[];
  profile: ProfileType;
}

export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
}

export interface ProfileType {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
}
