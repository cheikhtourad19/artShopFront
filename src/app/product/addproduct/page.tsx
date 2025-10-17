"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  X,
  Image,
  Loader2,
  Check,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { getToken } from "@/lib/auth";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [enhancedImages, setEnhancedImages] = useState([]);
  const [enhancedPreviews, setEnhancedPreviews] = useState([]);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [currentEnhancingIndex, setCurrentEnhancingIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const token = getToken();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
  }, [token]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setImages((prev) => [...prev, ...files]);
    setEnhancedImages([]);
    setEnhancedPreviews([]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (enhancedImages.length > 0) {
      setEnhancedImages((prev) => prev.filter((_, i) => i !== index));
      if (enhancedPreviews[index]) {
        URL.revokeObjectURL(enhancedPreviews[index]);
      }
      setEnhancedPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const enhanceImagesWithAI = async () => {
    if (images.length === 0) {
      setMessage({
        type: "error",
        text: "Please upload images first",
      });
      return;
    }

    setShowEnhanceModal(true);
    setEnhancing(true);
    setCurrentEnhancingIndex(0);
    setEnhancedImages([]);
    setEnhancedPreviews([]);

    try {
      const newEnhancedImages = [];
      const newEnhancedPreviews = [];

      for (let i = 0; i < images.length; i++) {
        setCurrentEnhancingIndex(i);

        const formData = new FormData();
        formData.append("image", images[i]);
        formData.append(
          "prompt",
          "Make this product image look professional and marketing-friendly. Enhance lighting, remove background distractions, improve colors and contrast to make it suitable for e-commerce. Keep the product as the main focus."
        );

        const response = await fetch(
          "http://localhost:9000/api/ai/enhance-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to enhance image ${i + 1}`);
        }

        const blob = await response.blob();
        const enhancedFile = new File([blob], images[i].name, {
          type: blob.type,
        });
        const previewUrl = URL.createObjectURL(blob);

        newEnhancedImages.push(enhancedFile);
        newEnhancedPreviews.push(previewUrl);
      }

      setEnhancedImages(newEnhancedImages);
      setEnhancedPreviews(newEnhancedPreviews);
      setEnhancing(false);
    } catch (error) {
      console.error("Error enhancing images:", error);
      setMessage({
        type: "error",
        text: "Failed to enhance images. Please try again.",
      });
      setEnhancing(false);
      setShowEnhanceModal(false);
    }
  };

  const confirmEnhancedImages = () => {
    setImages(enhancedImages);
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setImagePreviews(enhancedPreviews);
    setEnhancedImages([]);
    setEnhancedPreviews([]);
    setShowEnhanceModal(false);
    setMessage({
      type: "success",
      text: "Enhanced images applied successfully!",
    });
  };

  const retryEnhancement = () => {
    enhancedPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setEnhancedImages([]);
    setEnhancedPreviews([]);
    enhanceImagesWithAI();
  };

  const cancelEnhancement = () => {
    enhancedPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setEnhancedImages([]);
    setEnhancedPreviews([]);
    setShowEnhanceModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setMessage({
        type: "error",
        text: "Price must be a valid positive number",
      });
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("price", formData.price);

      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await fetch(
        "http://localhost:9000/api/products/addproduct",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({
          type: "success",
          text: data.message || "Produit Ajouté!",
        });

        setFormData({ title: "", description: "", price: "" });
        setImages([]);
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setImagePreviews([]);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to add product",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({
        type: "error",
        text: "An error occurred while adding the product",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Upload className="w-6 h-6" />
              </div>
              Ajouter un nouveau produit
            </h2>
            <p className="text-blue-100 mt-2">Remplir le formulaire</p>
          </div>

          <div className="p-8">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-2 border-rose-200"
                }`}
              >
                {message.type === "success" ? (
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  titre du produit <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="e.g., Premium Wireless Headphones"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                  placeholder="Describe your product in detail..."
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Prix <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-lg font-medium"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Produit Images
                </label>
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer block">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Image className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="mt-4 text-base font-medium text-gray-700">
                      Click pour choisir ou glissez des images
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG, JPG, GIF max 10MB
                    </p>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-rose-600 hover:scale-110 shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={enhanceImagesWithAI}
                      className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Sparkles className="w-5 h-5" />
                      Ameliorer avec l'IA
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Ajout Produit...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Ajouter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEnhanceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Amelioration Avec l'IA
              </h3>
              {!enhancing && (
                <button
                  onClick={cancelEnhancement}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="p-6">
              {enhancing ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    Ameliorations ...
                  </h4>
                  <p className="text-gray-600">
                    Processing image {currentEnhancingIndex + 1} of{" "}
                    {images.length}
                  </p>
                  <div className="mt-6 max-w-md mx-auto">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${
                            ((currentEnhancingIndex + 1) / images.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Comparer Original avec Les Ameliorations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                              Original
                            </p>
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                              <img
                                src={preview}
                                alt={`Original ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-600 mb-2 flex items-center gap-1">
                              <Sparkles className="w-4 h-4" />
                              Amelioré
                            </p>
                            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
                              <img
                                src={enhancedPreviews[index]}
                                alt={`Enhanced ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={retryEnhancement}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reessayer
                    </button>
                    <button
                      onClick={confirmEnhancedImages}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Choisir Ces ameliorations
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
