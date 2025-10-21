import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { User } from "@/types/auth";
import { useState } from "react";
import { getToken } from "@/lib/auth";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

export function UserTable({
  users,
  onUserDeleted,
}: {
  users: User[];
  onUserDeleted?: () => void;
}) {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const token = getToken();

  async function deleteUser(id) {
    setIsDeleting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:9000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete User`);
      }

      setMessage("Utilisateur supprimé avec succès");

      // Call the callback to refresh the user list
      if (onUserDeleted) {
        setTimeout(() => {
          onUserDeleted();
        }, 1000);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Erreur du Serveur");
    } finally {
      setIsDeleting(false);
    }
  }

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId);
    }
    setOpenModal(false);
    setSelectedUserId(null);
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
      {/* Fixed position messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2 w-96">
        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-lg animate-slide-in-right">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-lg animate-slide-in-right">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
      </div>

      <Table hoverable>
        <TableHead className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <TableRow>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Nom
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              prenom
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              email
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              numéro
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Actif depuis
            </TableHeadCell>
            <TableHeadCell className="text-right">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                Actions
              </span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y divide-gray-100">
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-transparent hover:to-purple-50/30 transition-all duration-300 group"
            >
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{user.nom}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{user.prenom}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{user.email}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{user.phone}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>{" "}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleDeleteClick(user._id)}
                    disabled={isDeleting}
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Supprimer</span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Confirmer la suppression</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
              est irréversible.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Oui"}
          </Button>
          <Button
            color="alternative"
            onClick={() => setOpenModal(false)}
            disabled={isDeleting}
          >
            Non
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
