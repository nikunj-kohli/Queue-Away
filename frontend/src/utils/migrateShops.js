import { db } from '../firebase.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Slug generation helper
function generateSlug(name, location, id) {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${
    location.toLowerCase().substring(0, 3)}-${
    id.substring(0, 6)}`;
}

async function migrateShops() {
  try {
    console.log('Starting shop migration...');
    const shopsRef = collection(db, 'shops');
    const snapshot = await getDocs(shopsRef);
    const promises = [];
    
    snapshot.forEach((shopDoc) => {
      const data = shopDoc.data();
      if (!data.slug) {
        const slug = generateSlug(data.name, data.location, shopDoc.id);
        promises.push(
          updateDoc(doc(db, 'shops', shopDoc.id), {
            slug,
            originalId: shopDoc.id
          })
        );
        console.log(`Migrating shop: ${shopDoc.id} -> ${slug}`);
      }
    });

    await Promise.all(promises);
    console.log(`Migration complete! Updated ${promises.length} shops.`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrateShops();