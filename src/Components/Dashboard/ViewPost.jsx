import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);

  // Fetch the post based on the ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5100/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>; // Show loading until post data is fetched
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{post.category}</p>
      <p className="text-sm text-gray-500 mb-6">{new Date(post.date).toLocaleDateString()}</p>
      <div className="text-lg text-gray-800">{post.details}</div>

      {post.images && post.images.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Images:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {post.images.map((image, index) => (
              <div key={index} className="border rounded-lg p-2">
                <img src={image} alt={`Image ${index + 1}`} className="w-full h-auto object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
