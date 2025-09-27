"use client";
import { Button, Drawer, DrawerItems } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleClose = () => setIsOpen(false);
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    logout();
    handleClose();
    window.location.href = "/login"; // Redirect to login page after logout
  };

  // Function to handle drawer link clicks
  const handleDrawerLinkClick = () => {
    setIsOpen(false); // Close the drawer when any link is clicked
  };

  // If user is not logged in, show login/signup buttons
  if (!user) {
    return (
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {" "}
            {/* Increased height from h-16 to h-20 */}
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-80 animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                    ArtShop
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                    Galerie d'art
                  </p>
                </div>
              </Link>
            </div>
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="px-5 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-xl transition-all duration-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-800"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Accueil</span>
                </div>
              </Link>

              <Link
                href="/gallery"
                className="px-5 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-xl transition-all duration-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-800"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Galerie</span>
                </div>
              </Link>
            </nav>
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-5 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-800 dark:border-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden sm:inline">Connexion</span>
                </div>
              </Link>

              <Link
                href="/register"
                className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Inscription</span>
                </div>
              </Link>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-3 text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-xl transition-all duration-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-800">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation (hidden by default) */}
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-3 pb-4 space-y-2 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-white rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-700"
              >
                🏠 Accueil
              </Link>
              <Link
                href="/gallery"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-cyan-600 hover:bg-white rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-700"
              >
                🖼️ Galerie
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Authenticated User Navbar */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-40 dark:bg-gray-900/95 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Increased height */}
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-80 animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                    ArtShop
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1">
                    Galerie d'art
                  </p>
                </div>
              </Link>
            </div>
            {/* User Avatar/Menu Button and Action Buttons */}
            <div className="flex items-center gap-4">
              {/* User Menu Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">
                    {user?.prenom?.charAt(0).toUpperCase() || ""}
                    {user?.nom?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.prenom} {user?.nom || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Voir le menu
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer with higher z-index */}
      <div className={`${isOpen ? "z-50" : ""}`}>
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <DrawerItems>
            {/* Add top padding to account for header */}
            <div className="pt-4">
              {/* User Info */}
              <div className="mb-6 p-5 bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-white">
                      {user?.prenom?.charAt(0).toUpperCase() || ""}
                      {user?.nom?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {user?.prenom} {user?.nom || "Utilisateur"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.email || "email@example.com"}
                    </p>
                    <div className="mt-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-xs font-medium inline-block">
                      Membre actif
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <div className="space-y-3">
                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={handleDrawerLinkClick}
                  className="flex items-center gap-4 w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-cyan-700 hover:border-cyan-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Mon Profile</p>
                    <p className="text-xs text-gray-500">
                      Gérer mes informations
                    </p>
                  </div>
                </Link>

                {/* Mes Produits */}
                <Link
                  href="/myProducts"
                  onClick={handleDrawerLinkClick}
                  className="flex items-center gap-4 w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-cyan-700 hover:border-cyan-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Mes Produits</p>
                    <p className="text-xs text-gray-500">Gérer mes œuvres</p>
                  </div>
                </Link>

                {/* Publier */}
                <Link
                  href="/addproduct"
                  onClick={handleDrawerLinkClick}
                  className="flex items-center gap-4 w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-cyan-700 hover:border-cyan-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Publier</p>
                    <p className="text-xs text-gray-500">Ajouter une œuvre</p>
                  </div>
                </Link>

                {/* Accueil */}
                <Link
                  href="/"
                  onClick={handleDrawerLinkClick}
                  className="flex items-center gap-4 w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-cyan-700 hover:border-cyan-200 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Accueil</p>
                    <p className="text-xs text-gray-500">Page principale</p>
                  </div>
                </Link>

                {/* Divider */}
                <hr className="border-gray-200 dark:border-gray-600 my-4" />

                {/* Logout */}
                <button
                  onClick={() => {
                    setOpenModal(true);
                    handleDrawerLinkClick();
                  }}
                  className="flex items-center gap-4 w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-4 text-center text-sm font-medium text-white hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Se Déconnecter</p>
                    <p className="text-xs text-red-100">Quitter la session</p>
                  </div>
                </button>
              </div>

              {/* Optional Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    ArtShop - Galerie d'art
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Version 1.0.0
                  </p>
                </div>
              </div>
            </div>
          </DrawerItems>
        </Drawer>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400">
              <svg
                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Voulez Vous vous déconnecter?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleLogout}>
                Oui
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
