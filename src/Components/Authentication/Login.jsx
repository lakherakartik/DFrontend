import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5100/api/auth/login", 
        { username, password }, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        const authCheck = await axios.get("http://localhost:5100/api/auth/check-auth", { withCredentials: true });

        if (authCheck.data.authenticated) {
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError("Invalid credentials!"); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[url(https://i.pinimg.com/736x/6e/be/21/6ebe21d7fabfe55dff10a932b03050bb.jpg)]">
      <div className="w-1/2 bg-cyan-100"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to जनहित मिशन डॉट कॉम</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter username" 
            />
          </div>
          
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input 
              type={showPassword ? "text" : "password"} // Toggle password visibility
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              placeholder="Enter password" 
            />
            {/* Eye icon for show/hide password */}
            <button 
              type="button" 
              className="absolute top-11 right-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
