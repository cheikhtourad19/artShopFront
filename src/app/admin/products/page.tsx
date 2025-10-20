"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/product";
import { ProductTable } from "@/components/productsTable";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const handleProductDeleted = () => {
    fetchProducts(); // Refresh the user list
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!user) {
        setError("No user logged in");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `http://localhost:9000/api/products/getproducts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.products) {
          setProducts(data.products);
        } else {
          setError("No products found");
        }
      } else {
        setError(`Failed to fetch products: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Network error: Unable to fetch products");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to Load Products
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
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
            Produits
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            gerer vos produits
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {products.length} {products.length === 1 ? "produit" : "produits"}{" "}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <ProductTable
            products={products}
            onProductDeleted={handleProductDeleted}
          />
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              There are no products in the catalog yet. Be the first to add a
              product!
            </p>
            <button
              onClick={() => (window.location.href = "/addproduct")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
