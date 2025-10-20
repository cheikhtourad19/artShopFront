"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getToken } from "@/lib/auth";
import { UserTable } from "@/components/userTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const handleUserDeleted = () => {
    fetchUsers(); // Refresh the user list
  };
  const fetchUsers = useCallback(async () => {
    const token = getToken();
    if (!token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`http://localhost:9000/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        } else {
          setError("No users found");
        }
      } else {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        setError(`Failed to fetch users: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Network error: Unable to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      setLoading(false);
      setError("Vous n'avez pas l'acces a cet Espace");
      return;
    }
    fetchUsers();
  }, [user, fetchUsers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{error}</h3>

          <button
            onClick={fetchUsers}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Reessayez
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            les Utilisateur
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            gerer vos Users
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {users.length} {users.length === 1 ? "user" : "users"}
          </div>
        </div>

        {users.length > 0 ? (
          <UserTable users={users} onUserDeleted={handleUserDeleted} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Pas de users
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Pensez en ajouter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
