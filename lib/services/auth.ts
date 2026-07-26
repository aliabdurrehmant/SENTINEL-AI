import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  socRole: string;
  isGmailConnected: boolean;
}

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<UserProfile> {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  return {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || undefined,
    socRole: "Tier 1 Monitor",
    isGmailConnected: true,
  };
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}
