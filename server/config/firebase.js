
const { initializeApp, cert, getApps } = require("firebase-admin/app");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else if (process.env.NODE_ENV !== "production") {
    serviceAccount = require("./serviceAccountKey.json");
} else {
    throw new Error("Firebase service account is missing");
}

const firebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount)
    });

module.exports = firebaseApp;
