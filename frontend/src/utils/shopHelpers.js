import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Creates or updates a shop document with proper slug
 * @param {Object} shopData - Shop data including name, location, etc.
 * @param {string} [shopData.id] - Optional existing ID (for updates)
 * @returns {Promise<string>} The generated slug
 */
export async function createOrUpdateShop(shopData) {
  // Generate ID if new shop
  const shopId = shopData.id || generateId(); // Implement your ID generation
  
  const slug = generateShopSlug(shopData.name, shopData.location, shopId);
  
  await setDoc(doc(db, 'shops', shopId), {
    ...shopData,
    id: shopId,
    slug,
    originalId: shopId,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  return slug;
}

/**
 * Generates a URL-friendly slug
 */
function generateShopSlug(name, location, id) {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${
    location.toLowerCase().replace(/\s+/g, '-').substring(0, 15)}-${
    id.substring(0, 6)}`.replace(/[^\w-]+/g, '');
}

// Helper for ID generation (replace with your actual method)
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}