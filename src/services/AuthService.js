
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut
} from 'firebase/auth';
import { auth } from "../firebaseConfig";

export async function cadastrar(email, senha) {
    return createUserWithEmailAndPassword(
        auth, email, senha
    );
}

export async function login(email, senha) {
    return signInWithEmailAndPassword(
        auth, email, senha
    );
}

export async function logout() {
    return signOut(auth);
}