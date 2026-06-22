import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function getTimestampMillis(value) {
  if (!value) {
    return 0;
  }

  if (typeof value.toMillis === "function") {
    return value.toMillis();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  return 0;
}

export function formatPrice(value) {
  const numberValue = Number(String(value).replace(",", "."));

  if (Number.isNaN(numberValue)) {
    return String(value);
  }

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDateTime(value) {
  if (!value) {
    return "";
  }

  const millis = getTimestampMillis(value);
  if (!millis) {
    return "";
  }

  return new Date(millis).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export async function createAnnouncement({ title, description, price, user }) {
  return addDoc(collection(db, "announcements"), {
    title: title.trim(),
    description: description.trim(),
    price: price.trim(),
    userId: user.uid,
    userName: user.displayName || user.email?.split("@")[0] || "Usuário",
    userEmail: user.email || "",
    createdAt: Timestamp.now(),
  });
}
