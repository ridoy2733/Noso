export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
  user_id: string;
  category: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
  user_handle: string;
}
