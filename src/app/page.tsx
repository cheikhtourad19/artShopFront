"use client";
import { Product } from "@/types/product";
import { useState, useEffect, useCallback, useMemo } from "react";
import ProductCard from "@/components/productCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

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
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        setError(`Failed to fetch products: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Network error: Unable to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtrer les produits selon la recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(query);
      const descriptionMatch = product.description
        ?.toLowerCase()
        .includes(query);
      return titleMatch || descriptionMatch;
    });
  }, [products, searchQuery]);

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Nos Produits
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez parmi notre catalogue
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit par titre ou description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-14 py-4 text-lg bg-transparent rounded-xl focus:outline-none transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "produit trouvé"
                  : "produits trouvés"}
              </span>
            </div>
            {searchQuery && products.length > filteredProducts.length && (
              <span className="text-sm text-gray-500">
                sur {products.length} au total
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            {searchQuery ? (
              <>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Aucun produit ne correspond à votre recherche "{searchQuery}".
                  Essayez avec d'autres mots-clés.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Réinitialiser la recherche
                </button>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun produit disponible
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Il n'y a pas encore de produits dans le catalogue. Soyez le
                  premier à ajouter un produit !
                </p>
                <button
                  onClick={() => (window.location.href = "/addproduct")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Ajouter le premier produit
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
