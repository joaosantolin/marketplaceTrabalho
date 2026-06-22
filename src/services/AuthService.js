
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from "../firebaseConfig";

export async function cadastrar({ name, email, senha }) {
    const credentials = await createUserWithEmailAndPassword(auth, email, senha);

    await updateProfile(credentials.user, {
        displayName: name,
    });

    await setDoc(doc(db, "users", credentials.user.uid), {
        name,
        email,
        uid: credentials.user.uid,
        createdAt: new Date().toISOString(),
    });

    return credentials;
}

export async function ensureUserProfile(user) {
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        await setDoc(userRef, {
            name: user.displayName || user.email?.split("@")[0] || "Usuário",
            email: user.email || "",
            uid: user.uid,
            createdAt: new Date().toISOString(),
        });
    }
}

export async function login(email, senha) {
    return signInWithEmailAndPassword(auth, email, senha);
}

export async function logout() {
    return signOut(auth);
}