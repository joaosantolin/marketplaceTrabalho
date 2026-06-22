import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { ensureUserProfile } from "../services/AuthService";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await ensureUserProfile(currentUser);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
