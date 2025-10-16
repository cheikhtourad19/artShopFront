"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Product() {
  const { id } = useParams();

  type Product = {
    _id: string;
    artisan: string;
    title: string;
    description: string;
    price: string;
    images: Array<{ url: string; public_id: string; _id: number }>;
    createdAt?: string;
    updatedAt?: string;
  };

  type Artisan = {
    _id: string;
    nom: string;
    email?: string;
    prenom?: string;
    phone?: string;
  };

  type ProductResponse = {
    success: boolean;
    product: Product;
    artisan: Artisan;
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const contactArtisanOnWhatsApp = () => {
    const message = `Hello ${artisan?.nom}! I'm interested in your product: ${product?.title} ($${product?.price})`;
    const encodedMessage = encodeURIComponent(message);

    if (artisan?.phone) {
      window.open(
        `https://wa.me/${artisan.phone}?text=${encodedMessage}`,
        "_blank"
      );
    } else {
      shareOnWhatsApp();
    }
  };
  const shareOnWhatsApp = () => {
    const message = `Check out this amazing product: ${product?.title} - $${product?.price}\n\n${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };
  const getProductData = useCallback(async () => {
    console.log("ID:", id);
    if (!id) {
      setError("Missing product id");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:9000/api/products/getproduct/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} ${text}`);
      }

      const data: ProductResponse = await response.json();

      if (data.success && data.product) {
        // Ensure images is always an array
        const processedProduct = {
          ...data.product,
          images: Array.isArray(data.product.images) ? data.product.images : [],
        };
        setProduct(processedProduct);
        setArtisan(data.artisan || null);
      } else {
        setError("No product data returned from server");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getProductData();
  }, [getProductData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <div className="text-red-500 text-4xl mb-3">⚠️</div>
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Error Loading Product
            </h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
            <div className="text-yellow-500 text-4xl mb-3">🔍</div>
            <h3 className="text-yellow-800 font-semibold text-lg">
              Product Not Found
            </h3>
            <p className="text-yellow-600 mt-2">
              This product is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fallbackImage = "https://via.placeholder.com/1200x800?text=No+Image";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Product Gallery */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            {/* Image Carousel */}
            <div className="aspect-w-4 aspect-h-3">
              <div className="h-96 sm:h-[500px] lg:h-full rounded-lg overflow-hidden">
                <Carousel
                  slideInterval={5000}
                  indicators={true}
                  className="h-full"
                >
                  {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => (
                      <div key={index} className="w-full h-full relative">
                        <img
                          src={image.url}
                          alt={product.title || `product-${index}`}
                          className="w-full h-full object-cover"
                          width={800}
                          height={600}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src={fallbackImage}
                        alt="no-image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </Carousel>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              {/* Artisan Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {artisan?.nom?.charAt(0) || "A"}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Par</p>
                    <p className="font-semibold text-gray-900">
                      {artisan?.nom || "Unknown Artisan"}
                    </p>
                  </div>
                </div>
                {artisan?.phone && (
                  <p className="text-sm text-gray-600 mt-2">{artisan.phone}</p>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  {artisan?.phone && (
                    <button
                      onClick={contactArtisanOnWhatsApp}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444" />
                      </svg>
                      Contacter Artisan
                    </button>
                  )}

                  <button
                    onClick={shareOnWhatsApp}
                    className={`${
                      artisan?.phone ? "flex-1" : "w-full"
                    } bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                    </svg>
                    Partager
                  </button>
                </div>
              </div>
              {(product.createdAt || product.updatedAt) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400">
                    {product.createdAt && (
                      <p>
                        ajoute:{" "}
                        {new Date(product.createdAt).toLocaleDateString()}
                      </p>
                    )}
                    {product.updatedAt &&
                      product.updatedAt !== product.createdAt && (
                        <p>
                          Updated on:{" "}
                          {new Date(product.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
