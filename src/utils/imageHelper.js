import { API_URL } from './api'

const BACKEND_URL = API_URL || 'http://localhost:5000'

export const normalizeImage = (image) => {
  if (!image) return '';
  if (typeof image !== 'string') return image;
  
  // If image already starts with http/https or is a base64 string, leave it unchanged
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  
  // If it starts with /uploads/ or uploads/, prepend the backend host
  if (image.startsWith('/uploads/')) {
    return `${BACKEND_URL}${image}`;
  }
  if (image.startsWith('uploads/')) {
    return `${BACKEND_URL}/${image}`;
  }
  
  // If it's a local import path (starts with /src/ or contains /assets/), leave it unchanged
  if (image.includes('/') || image.includes('\\')) {
    return image;
  }
  
  // Otherwise, it's just the filename stored in the backend (e.g. "stairs-1.jpeg")
  return `${BACKEND_URL}/uploads/${image}`;
};
