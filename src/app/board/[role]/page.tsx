"use client";

import { useParams } from 'next/navigation';
import Board from '@/app/Components/Board';

export default function RoleBoard() {
  const params = useParams();
  const role = params?.role;

  if (!['developer', 'manager'].includes(role as string)) {
    return <div>404 - Role Not Found</div>;
  }

  return (
    <Board role={role as string} />
  );
}
