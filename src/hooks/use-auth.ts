// File: hooks/use-auth.ts
'use client';

import { useState, useEffect } from 'react';

// This is a mock authentication hook.
// In a real app, you would replace this with your actual auth logic (e.g., Firebase, Supabase, Auth0).
export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  // Change this to `true` to test the "logged in" state
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setUser({ email: 'user@example.com' });
      } else {
        setUser(null);
      }
      setLoading(false);
    }, 1500); // 1.5 second loading simulation

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const signOut = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate sign-out delay
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  return { isAuthenticated, loading, user, signOut };
};