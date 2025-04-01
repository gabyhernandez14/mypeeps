import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { Post } from '../types/Post';

export const postService = {
  async addPost(userId: string, userName: string, content: string) {
    const post = {
      userId,
      userName,
      content,
      dateAdded: new Date().toISOString(),
      likes: [],
      dislikes: [],
      reposts: []
    };
    
    const docRef = await addDoc(collection(db, 'posts'), post);
    return { id: docRef.id, ...post };
  },

  async getPosts(userId: string) {
    const q = query(
      collection(db, 'posts'),
      orderBy('dateAdded', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const post = { id: doc.id, ...doc.data() } as Post;
        if (post.originalPostId) {
          const originalPostDoc = await getDoc(doc(db, 'posts', post.originalPostId));
          if (originalPostDoc.exists()) {
            post.originalPost = { id: originalPostDoc.id, ...originalPostDoc.data() } as Post;
          }
        }
        return post;
      })
    );
    return posts;
  },

  async deletePost(postId: string) {
    await deleteDoc(doc(db, 'posts', postId));
  },

  async toggleLike(postId: string, userId: string) {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) return;

    const post = postDoc.data() as Post;
    const likes = post.likes || [];
    const dislikes = post.dislikes || [];
    
    const hasLiked = likes.includes(userId);
    const hasDisliked = dislikes.includes(userId);

    const updates: any = {};
    
    if (hasLiked) {
      updates.likes = likes.filter(id => id !== userId);
    } else {
      updates.likes = [...likes, userId];
      if (hasDisliked) {
        updates.dislikes = dislikes.filter(id => id !== userId);
      }
    }

    await updateDoc(postRef, updates);
  },

  async toggleDislike(postId: string, userId: string) {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) return;

    const post = postDoc.data() as Post;
    const likes = post.likes || [];
    const dislikes = post.dislikes || [];
    
    const hasLiked = likes.includes(userId);
    const hasDisliked = dislikes.includes(userId);

    const updates: any = {};
    
    if (hasDisliked) {
      updates.dislikes = dislikes.filter(id => id !== userId);
    } else {
      updates.dislikes = [...dislikes, userId];
      if (hasLiked) {
        updates.likes = likes.filter(id => id !== userId);
      }
    }

    await updateDoc(postRef, updates);
  },

  async repost(postId: string, userId: string, userName: string) {
    const originalPostDoc = await getDoc(doc(db, 'posts', postId));
    if (!originalPostDoc.exists()) return;

    const originalPost = originalPostDoc.data() as Post;
    const repost = {
      userId,
      userName,
      content: originalPost.content,
      dateAdded: new Date().toISOString(),
      likes: [],
      dislikes: [],
      reposts: [],
      originalPostId: postId
    };
    
    const docRef = await addDoc(collection(db, 'posts'), repost);
    
    // Update original post's reposts array
    await updateDoc(doc(db, 'posts', postId), {
      reposts: [...(originalPost.reposts || []), userId]
    });

    return { id: docRef.id, ...repost };
  }
}; 