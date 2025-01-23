// Your web app's Firebase configuration

const apiKey = process.env.apiKey;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
module.exports = firebaseConfig;
