import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams(); // Get the category from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5100/api/posts?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Error fetching posts");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 rounded-lg text-white bg-black px-5 py-1 max-w-fit">
        Posts in Category <span className="text-blue-500 capitalize">{category}</span>
      </h1>

      {loading ? (
        <p className="text-lg font-semibold">Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-md shadow-md p-4">
              <img
                src={post.images[0]}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{post.details}</p>
              <div className="mt-4">
                <button
                  onClick={() => window.location.href = `/post/${post._id}`}
                  className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-500">No posts found for this category.</p>
      )}
    </div>
  );
};

export default Category;
