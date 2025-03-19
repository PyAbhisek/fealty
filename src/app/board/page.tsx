"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BoardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.role) {
      router.push(`/board/${user.role.toLowerCase()}`);
    } else {
      router.push('/login'); 
    }
  }, []);

  return <div>Redirecting...</div>;
}
