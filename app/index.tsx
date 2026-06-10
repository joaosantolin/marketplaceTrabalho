import { auth } from '@/src/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AuthStack } from '../src/navigation/AuthStack';
import { Tabs } from '../src/navigation/Tabs';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const inscricao =
      onAuthStateChanged(auth,
        (usuario) => { setUser(usuario); }
      );
    return inscricao;
  })

  return (
    user ? <Tabs /> : <AuthStack />
  );
}
