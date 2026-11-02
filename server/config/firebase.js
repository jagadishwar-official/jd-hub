
const { initializeApp, cert, getApps } = require("firebase-admin/app");

const serviceAccount = require("./serviceAccountKey.json");

const firebaseApp = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount)
    });

module.exports = firebaseApp;
