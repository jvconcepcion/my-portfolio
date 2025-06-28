import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const serviceAccountClient = process.env.NEXT_PUBLIC_FIREBASE_ENCRYPTED_KEY;

if (!serviceAccountClient) {
  throw new Error("Missing FIREBASE ENCRYPTED KEY in environment variables");
}

const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountClient, 'base64').toString('utf8')
);

const { apiKey, authDomain, projectId } = serviceAccount;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
};

const app = initializeApp(firebaseConfig);
export const clientDb = getFirestore(app);