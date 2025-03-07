import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadPost = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle image change
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  // Cleanup previews
  useEffect(() => {
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview));
  }, [previews]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!category) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("details", details);
    formData.append("category", category);
    
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5100/api/news/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setShowModal(true);
        resetForm();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Failed to upload news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDetails("");
    setCategory("");
    setImages([]);
    setPreviews([]);
  };

  return (
    <div className="w-full min-h-full bg-white p-6">
      <h1 className="text-2xl font-bold mb-4 rounded-lg text-white bg-black px-5 py-1 max-w-fit">
        Upload Post
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium">News Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="खबर पालिका">खबर पालिका</option>
            <option value="मंत्री संतरी">मंत्री संतरी</option>
            <option value="कोर्ट कचेरी">कोर्ट कचेरी</option>
            <option value="अनुकर्णिया">अनुकर्णिया</option>
            <option value="अपना एमपी">अपना एमपी</option>
            <option value="यह भी पढिये">यह भी पढिये</option>
          </select>
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">News Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter news title"
            className="w-full border text-xl border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Details Input */}
        <div>
          <label htmlFor="details" className="block text-lg font-medium">News Details</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter news details"
            className="w-full border border-gray-300 rounded-md p-2"
            rows="5"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="images" className="block text-lg font-medium">Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} className="w-full border border-gray-300 rounded-md p-2" />
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {previews.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index + 1}`} className="border border-gray-300 rounded-md" />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit News"}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">News Uploaded Successfully!</h2>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPost;
