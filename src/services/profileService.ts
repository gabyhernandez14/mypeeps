import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const profileService = {
  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    try {
      // Create a unique filename using userId and timestamp
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `profile_${userId}_${timestamp}.${fileExtension}`;
      
      // Create a reference to the file location
      const storageRef = ref(storage, `profile-photos/${fileName}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }
}; 