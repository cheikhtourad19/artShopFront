"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Vous ne posseder pas acces a cet espace
        </h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
