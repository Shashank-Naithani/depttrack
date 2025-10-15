import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../libs/firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const authCheckOnAppMount = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user doc
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) throw new Error("Unexpected error.");

          let userData = userDocSnap.data();

          if (!userData.department) throw new Error("Missing department.");

          // Fetch department data
          const userDepartmentSnap = await getDoc(userData.department);
          if (!userDepartmentSnap.exists())
            throw new Error("Missing department data.");

          userData.department = userDepartmentSnap.data();
          resolve(userData); // ✅ valid user
        } catch (error) {
          toast.error("Session expired. Please login again.");
          await signOut(auth); // 🚀 sign out immediately here
          resolve(null);
        }
      } else {
        resolve(null); // no user
      }

      unsubscribe();
    });
  });
};

export default authCheckOnAppMount;
