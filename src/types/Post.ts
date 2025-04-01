export interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  dateAdded: string;
  likes: string[]; // Array of user IDs who liked the post
  dislikes: string[]; // Array of user IDs who disliked the post
  reposts: string[]; // Array of user IDs who reposted
  originalPostId?: string; // If this is a repost, reference to the original post
  originalPost?: Post; // The original post data if this is a repost
} 