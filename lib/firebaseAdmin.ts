import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccountJson = process.env.FIREBASE_ENCODED_ACCOUNT;

  if (!serviceAccountJson) {
    throw new Error("Missing FIREBASE_ENCODED_ACCOUNT in environment variables");
  }

  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountJson, 'base64').toString('utf8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };