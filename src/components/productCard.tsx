"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "../types/product";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  // Get first image or use placeholder
  const mainImage = product.images[0]?.url || "/placeholder-image.jpg";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={imageError ? "/placeholder-image.jpg" : mainImage}
          alt={product.title}
          onError={handleImageError}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <span className="font-bold text-green-600 text-sm">
            ${parseFloat(product.price).toFixed(2)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Additional Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-gray-500">
            <span className="text-xs">🕒</span>
            <span className="text-xs">
              {new Date(product.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Available</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
          <span>👀</span>
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}
