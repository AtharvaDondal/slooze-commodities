'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

// 1. create
const UserContext = createContext<User | null>(null);

// 2. provide
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => setUser(null));
  }, []);

  // return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// 3. consume
export function useUser() {
  return useContext(UserContext);
}