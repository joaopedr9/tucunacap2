import{initializeApp} from"firebase/app" ;
import{getAnalytics} from"firebase/analytics";
import{getFirestore} from"firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnChzLiXfoelp17zkYbg-_7sLsaWBKHIc",
  authDomain: "tucunacap.firebaseapp.com",
  projectId: "tucunacap",
  storageBucket: "tucunacap.appspot.com",
  messagingSenderId: "160518804559",
  appId: "1:160518804559:web:188f281ea1f55d1444863a"
};

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth= getAuth(app)
  const db = getFirestore(app);
  export {auth,db};