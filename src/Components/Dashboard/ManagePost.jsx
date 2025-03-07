import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "./DeleteConfirmModal"; // ✅ Import Modal

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5100/api/news/posts");
        if (response.ok) {
          let data = await response.json();
          data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(data);
        } else {
          console.error("Error fetching posts:", response.status);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const openDeleteModal = (postId) => {
    setDeletePostId(postId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeletePostId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5100/api/news/posts/${deletePostId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== deletePostId));
      } else {
        setError("Error deleting post");
      }
    } catch (err) {
      setError(err.message);
    }

    closeModal();
  };

  return (
    <div className="manage-posts p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 rounded-lg text-white bg-black px-5 py-1 max-w-fit">
        Manage Posts
      </h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      {posts.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="border text-2xl font-semibold px-4 py-2">
                  {post.title.length > 50 ? post.title.substring(0, 50) + "..." : post.title}
                </td>
                <td className="border px-4 py-2">{post.category || "N/A"}</td>
                <td className="border px-4 py-2">
                  {post.createdAt ? post.createdAt.split("T")[0] : "Date Not Available"}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mx-1"
                    onClick={() => openDeleteModal(post._id)}
                  >
                    Delete
                  </button>
                  <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mx-1"
                      onClick={() => navigate(`/edit/${post._id}`, { state: { data: post } })}
                    >
                      Edit
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No posts found</p>
      )}

      {/* ✅ Delete Confirmation Modal */}
      <DeleteConfirmModal isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete} />
    </div>
  );
};

export default ManagePosts;
