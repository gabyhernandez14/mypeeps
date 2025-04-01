import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase';
import { Group } from '../types/Group';

export const groupService = {
  async addGroup(userId: string, group: Omit<Group, 'id' | 'dateAdded' | 'personIds'>) {
    const groupWithMetadata = {
      ...group,
      userId,
      dateAdded: new Date().toISOString(),
      personIds: []
    };
    
    const docRef = await addDoc(collection(db, 'groups'), groupWithMetadata);
    return { id: docRef.id, ...groupWithMetadata };
  },

  async getGroups(userId: string) {
    const q = query(collection(db, 'groups'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Group[];
  },

  async deleteGroup(groupId: string) {
    await deleteDoc(doc(db, 'groups', groupId));
  },

  async updateGroup(groupId: string, updates: Partial<Group>) {
    await updateDoc(doc(db, 'groups', groupId), updates);
  },

  async addPersonToGroup(groupId: string, personId: string) {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      personIds: arrayUnion(personId)
    });
  },

  async removePersonFromGroup(groupId: string, personId: string) {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      personIds: arrayRemove(personId)
    });
  }
}; 