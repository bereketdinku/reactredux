import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDmGRB3dPs6dNcbheAkknQItQkvEm8B_9Y",
  authDomain: "aiapp-b455c.firebaseapp.com",
  projectId: "aiapp-b455c",
  storageBucket: "aiapp-b455c.appspot.com",
  messagingSenderId: "323335527610",
  appId: "1:323335527610:web:d36b41a693b43b0ecd3683",
  measurementId: "G-ZYQKES0TD3",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);
export { db, auth, storage, app };
