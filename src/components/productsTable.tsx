import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { getToken } from "@/lib/auth";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { Product } from "@/types/product";

export function ProductTable({
  products,
  onProductDeleted,
}: {
  products: Product[];
  onProductDeleted?: () => void;
}) {
  const [error, setError] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const token = getToken();

  async function deleteProduct(id: string) {
    setIsDeleting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:9000/api/products/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete Product`);
      }

      setMessage("Produit supprimé avec succès");

      // Call the callback to refresh the product list
      if (onProductDeleted) {
        onProductDeleted();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Erreur du Serveur");
    } finally {
      setIsDeleting(false);
    }
  }

  async function updateProduct() {
    if (!selectedProduct) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9000/api/products/editproduct/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update Product`);
      }

      // Parse response (even if empty)
      const data = await response.json().catch(() => ({}));

      setError("");
      setMessage("Produit modifié avec succès");
      setOpenUpdateModal(false);
      setSelectedProduct(null);

      // Refresh the product list
      if (onProductDeleted) {
        onProductDeleted();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Erreur du Serveur");
    } finally {
      setIsDeleting(false);
      setOpenUpdateModal(false);
    }
  }

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      deleteProduct(selectedProductId);
    }
    setOpenModal(false);
    setSelectedProductId(null);
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-100">
      {/* Success/Error Messages */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Table hoverable>
        <TableHead className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <TableRow>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Titre
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Description
            </TableHeadCell>
            <TableHeadCell className="text-gray-700 font-bold text-sm uppercase tracking-wide">
              Prix
            </TableHeadCell>
            <TableHeadCell className="text-right">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">
                Actions
              </span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y divide-gray-100">
          {products.map((product) => (
            <TableRow
              key={product._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-transparent hover:to-purple-50/30 transition-all duration-300 group"
            >
              <TableCell className="whitespace-nowrap font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span>{product.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-300 max-w-md">
                <span className="line-clamp-2">{product.description}</span>
              </TableCell>
              <TableCell className="font-semibold">
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1.5 rounded-xl text-sm font-bold">
                  {parseFloat(product.price.toString()).toFixed(2)} TND
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-end space-x-2">
                  {/* Voir Button */}
                  <a
                    href={`/product/${product._id}`}
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Voir</span>
                  </a>

                  {/* Modifier Button */}
                  <button
                    onClick={() => handleUpdateClick(product)}
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Modifier</span>
                  </button>

                  {/* Supprimer Button */}
                  <button
                    onClick={() => handleDeleteClick(product._id)}
                    className="group/btn inline-flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
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

      {/* Delete Confirmation Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Confirmer la suppression</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer ce Produit ? Cette action est
              irréversible.
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

      {/* Update Modal */}
      <Modal
        show={openUpdateModal}
        onClose={() => !isDeleting && setOpenUpdateModal(false)}
        size="lg"
      >
        <ModalHeader className="border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Modifier le produit
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Mettez à jour les informations du produit
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="py-6">
          {selectedProduct && (
            <form className="space-y-6">
              {/* Title Input */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg
                    className="w-4 h-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span>Titre</span>
                </label>
                <input
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none font-medium"
                  placeholder="Entrez le titre du produit"
                />
              </div>

              {/* Description Textarea */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg
                    className="w-4 h-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  <span>Description</span>
                </label>
                <textarea
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none resize-none font-medium"
                  rows={4}
                  placeholder="Décrivez votre produit..."
                ></textarea>
              </div>

              {/* Price Input */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <svg
                    className="w-4 h-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Prix (TND)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none font-bold text-lg"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                    TND
                  </span>
                </div>
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter className="border-t border-gray-100 pt-4 flex justify-end space-x-3">
          <Button
            color="light"
            onClick={() => setOpenUpdateModal(false)}
            disabled={isDeleting}
            className="px-6 py-2.5 font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Annuler
          </Button>
          <button
            onClick={updateProduct}
            disabled={isDeleting}
            className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Enregistrer</span>
              </>
            )}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
