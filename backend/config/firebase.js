const admin = require('firebase-admin');

let firebaseApp = null;

const initializeFirebase = () => {
  if (!firebaseApp && process.env.FIREBASE_PROJECT_ID) {
    try {
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
      };

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID
      });

      console.log('🔥 Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error.message);
    }
  }
  return firebaseApp;
};

const getFirestore = () => {
  const app = initializeFirebase();
  return app ? admin.firestore() : null;
};

const getMessaging = () => {
  const app = initializeFirebase();
  return app ? admin.messaging() : null;
};

module.exports = {
  initializeFirebase,
  getFirestore,
  getMessaging,
  admin
};