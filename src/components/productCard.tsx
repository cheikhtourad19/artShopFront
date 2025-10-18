"use client";

import { Card } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  // Get first image or use placeholder
  const mainImage = product.images[0]?.url || "/placeholder-image.jpg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      className="max-w-sm"
      imgAlt={product.title}
      imgSrc={imageError ? "/placeholder-image.jpg" : mainImage}
      renderImage={() => (
        <div className="relative overflow-hidden">
          <img
            src={imageError ? "/placeholder-image.jpg" : mainImage}
            alt={product.title}
            onError={handleImageError}
            className="w-full h-64 object-cover"
          />
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg px-3 py-1.5 shadow-lg">
            <span className="font-bold text-white text-sm">
              {parseFloat(product.price).toFixed(2)} TND
            </span>
          </div>
        </div>
      )}
    >
      <Link href={`/product/${product._id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {product.title}
        </h5>
      </Link>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mt-2">
        {product.description}
      </p>

      {/* Date Badge */}
      <div className="mt-3 mb-4 flex items-center">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs font-medium">
            {new Date(product.createdAt || Date.now()).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {parseFloat(product.price).toFixed(2)} TND
        </span>
        <Link
          href={`/product/${product._id}`}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Voir détails
        </Link>
      </div>
    </Card>
  );
}
