// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// const EditPost = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const post = location.state?.data;
//   const [newPost, setNewPost] = useState(post || { title: "", details: "", category: "", image: "" });

//   useEffect(() => {
//     if (!post) {
//       alert("No post data found!");
//       navigate("/");
//     }
//   }, [post, navigate]);

//   const handleUpdate = async () => {
//   try {
//     const response = await fetch(`http://localhost:5100/api/news/posts/${id}`, { 
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newPost),
//     });

//     if (response.ok) {
//       alert("Post updated successfully!");
//       navigate("/");
//     } else {
//       alert("Error updating post");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPost({ ...newPost, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return newPost ? (
//     <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
//       <h1 className="text-2xl font-bold text-center mb-4">✏️ Edit Post</h1>

//       {/* Title */}
//       <label className="block font-semibold">Title:</label>
//       <input
//         type="text"
//         className="w-full p-2 border rounded mb-3"
//         value={newPost.title}
//         onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//       />

//       {/* Details */}
//       <label className="block font-semibold">Details:</label>
//       <textarea
//         className="w-full p-2 border rounded mb-3"
//         value={newPost.details}
//         onChange={(e) => setNewPost({ ...newPost, details: e.target.value })}
//         rows="4"
//       />

//       {/* Category */}
//       <label className="block font-semibold">Category:</label>
//       <select
//         className="w-full p-2 border rounded mb-3"
//         value={newPost.category}
//         onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
//       >
//         <option value="" disabled>
//               Select a category
//             </option>
//             <option value="खबर पालिका">खबर पालिका</option>
//             <option value="मंत्री संतरी">मंत्री संतरी</option>
//             <option value="कोर्ट कचेरी">कोर्ट कचेरी</option>
//             <option value="अनुकर्णिया">अनुकर्णिया</option>
//             <option value="अपना एमपी">अपना एमपी</option>
//       </select>
      
//       {/* Image Upload */}
//       <label className="block font-semibold">Upload Image:</label>
//       <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />

//       {/* Image Preview (Jo image pehle se hai wo dikhni chahiye) */}
//       {newPost.image && (
//         <div className="mb-3">
//           <p className="text-sm text-gray-500">Current Image:</p>
//           <img src={newPost.image} alt="Preview" className="w-full h-48 object-cover rounded" />
//         </div>
//       )}

//       {/* Save Button */}
//       <button
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         onClick={handleUpdate}
//       >
//         ✅ Save Changes
//       </button>
//     </div>
//   ) : (
//     <p className="text-center mt-10">Loading...</p>
//   );
// };

// export default EditPost;
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState(location.state?.data || null);

  useEffect(() => {
    console.log("Post ID:", id); // ✅ Check if ID is correct

    if (!newPost) {
      fetch(`http://localhost:5100/api/news/posts/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Post not found");
          }
          return res.json();
        })
        .then((data) => setNewPost(data))
        .catch((err) => {
          console.error("Error fetching post:", err);
          alert("Post not found!");
          navigate("/dashboard/manage-post");
        });
    }
  }, [id, newPost, navigate]);

  return newPost ? (
    <div>
      <h1>Edit Post</h1>
      <input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditPost;
