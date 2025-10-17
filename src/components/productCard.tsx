"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "../types/product";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  // Get first image or use placeholder
  const mainImage = product.images[0]?.url || "/placeholder-image.jpg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100/50">
      {/* Subtle gradient overlay on card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative aspect-[4/3]">
          <img
            src={imageError ? "/placeholder-image.jpg" : mainImage}
            alt={product.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl px-4 py-2 shadow-xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
          <span className="font-bold text-white text-base tracking-tight">
            {parseFloat(product.price).toFixed(2)} TND
          </span>
        </div>

        {/* Animated corner accent */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-3">
        {/* Title with gradient on hover */}
        <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 leading-snug transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Additional Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 rounded-full px-3 py-1.5 transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
            <svg
              className="w-3.5 h-3.5"
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
                }
              )}
            </span>
          </div>

          {/* Decorative dots */}
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60 group-hover:opacity-100 transition-opacity delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 opacity-60 group-hover:opacity-100 transition-opacity delay-150" />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative px-6 pb-6">
        <Link
          href={`/product/${product._id}`}
          className="group/btn relative w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white py-3.5 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl flex items-center justify-center space-x-3 overflow-hidden"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

          <svg
            className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform duration-300"
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
          <span className="relative">Voir détails</span>
          <svg
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
