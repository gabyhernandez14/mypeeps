import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { Person } from '../types/Person';

export const personService = {
  async addPerson(userId: string, person: Omit<Person, 'id' | 'dateAdded'>) {
    const personWithMetadata = {
      ...person,
      userId,
      dateAdded: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'persons'), personWithMetadata);
    return { id: docRef.id, ...personWithMetadata };
  },

  async getPersons(userId: string) {
    const q = query(collection(db, 'persons'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Person[];
  },

  async deletePerson(personId: string) {
    await deleteDoc(doc(db, 'persons', personId));
  },

  async updatePerson(personId: string, updates: Partial<Person>) {
    await updateDoc(doc(db, 'persons', personId), updates);
  }
}; 