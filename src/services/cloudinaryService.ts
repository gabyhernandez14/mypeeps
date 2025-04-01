const CLOUDINARY_UPLOAD_PRESET = 'mypeeps';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/mypeeps-8bd58/image/upload';

export const cloudinaryService = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}; 