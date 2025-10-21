"use client";

import { useAuth } from "@/contexts/AuthContext";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import {
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/admin/stat`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchStats();
    }
  }, [user]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Accès restreint
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Vous n'avez pas les permissions nécessaires pour accéder à cet
            espace administrateur. Contactez un administrateur pour obtenir les
            droits d'accès.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Chargement des statistiques...
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Préparation de votre tableau de bord
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    total,
    newThisMonth,
    lastMonth,
    growth,
    icon: Icon,
    color,
  }) => {
    const isPositive = parseFloat(growth) >= 0;
    const growthValue = parseFloat(growth);

    return (
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {title}
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {total.toLocaleString()}
            </p>
          </div>
          <div
            className={`p-3 rounded-xl ${color} transition-transform group-hover:scale-110`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {newThisMonth.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-medium">Ce mois</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">
                {lastMonth.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-medium">Mois dernier</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-full ${
                  isPositive ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
              <span
                className={`text-sm font-semibold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {growth}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              vs mois dernier
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Tableau de bord
              </h1>
              <p className="mt-3 text-lg text-gray-600">
                Bon retour,{" "}
                <span className="font-semibold text-gray-800">
                  {user.name || user.email}
                </span>
              </p>
            </div>

            {stats?.date && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 font-medium">
                  {new Date(stats.date).toLocaleString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats?.users && (
            <StatCard
              title="Utilisateurs"
              total={stats.users.total}
              newThisMonth={stats.users.newThisMonth}
              lastMonth={stats.users.lastMonth}
              growth={stats.users.growth}
              icon={Users}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
            />
          )}

          {stats?.products && (
            <StatCard
              title="Produits"
              total={stats.products.total}
              newThisMonth={stats.products.newThisMonth}
              lastMonth={stats.products.lastMonth}
              growth={stats.products.growth}
              icon={Package}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
            />
          )}

          <div className="group bg-white/50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Nouvelle métrique</p>
            <p className="text-sm text-gray-400 mt-1">Bientôt disponible</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/admin/users`}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Gérer les utilisateurs
              </h3>
              <p className="text-sm text-gray-500">
                Voir et modifier les comptes
              </p>
            </Link>

            <Link
              href={`/admin/products`}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Gérer les produits
              </h3>
              <p className="text-sm text-gray-500">
                Ajouter ou modifier des produits
              </p>
            </Link>

            <Link
              href={``}
              className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Voir les rapports
              </h3>
              <p className="text-sm text-gray-500">Analyses détaillées</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
