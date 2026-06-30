import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/core/config/firebase';
import { normalizeAccountName } from '../types/helpers';

// comprobar si existe username
export async function isUsernameTaken(accountName: string): Promise<boolean> {
  const ref = doc(db, 'usernames', accountName);
  const snap = await getDoc(ref);
  return snap.exists();
}

// obtener UID desde username
export async function getUidFromAccountName(accountName: string): Promise<string | null> {
  const ref = doc(db, 'usernames', normalizeAccountName(accountName));
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data().uid;
}