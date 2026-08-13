import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/posts`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [navigate]);

  // Handle Create/Update Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const url = editingPost 
        ? `${API_URL}/api/posts/${editingPost._id}`
        : `${API_URL}/api/posts`;
      
      const method = editingPost ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(editingPost ? "✅ Post updated successfully!" : "✅ Post created successfully!");
        setMessageType("success");
        setTitle("");
        setContent("");
        setCategory("");
        setEditingPost(null);
        
        // Refresh posts list
        const refreshResponse = await fetch(`${API_URL}/api/posts`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const refreshData = await refreshResponse.json();
        if (refreshData.posts) {
          setPosts(refreshData.posts);
        }
      } else {
        setMessage("❌ " + (data.message || "Failed to create post"));
        setMessageType("error");
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post? 🗑️")) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setPosts(posts.filter(post => post._id !== postId));
        setMessage("✅ Post deleted successfully!");
        setMessageType("success");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Failed to delete post");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("❌ Something went wrong");
      setMessageType("error");
    }
  };

  // Handle Edit Post (Load into form)
  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
    setCategory("");
    setMessage("");
    setMessageType("");
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-lg font-medium text-slate-600 animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-200/50 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-700">Admin Panel</span>
          </div>
          
          <h2 className="text-4xl font-extrabold text-slate-900">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {editingPost ? "Edit" : "Create New"} Post
            </span>
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto mt-2">
            {editingPost 
              ? "Update your existing blog post" 
              : "Share your knowledge with the world! Write a new blog post."}
          </p>
        </div>

        {/* Create/Edit Post Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 sm:p-8 mb-12 transition-all duration-300 hover:shadow-2xl">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Post Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">📝</span>
                <input
                  type="text"
                  placeholder="Enter an amazing title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                {title.length} / 200 characters
              </p>
            </div>

            {/* Category Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">📂</span>
                <input
                  type="text"
                  placeholder="e.g., MERN Stack, JavaScript, Laravel"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Content Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Post Content <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">📄</span>
                <textarea
                  placeholder="Write your amazing content here... (Markdown supported)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all resize-none text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5 text-right">
                {content.length} characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    {editingPost ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {editingPost ? "✏️ Update Post" : "🚀 Publish Post"}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
              
              {editingPost && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* Status Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 animate-fade-in ${
              messageType === 'success' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : messageType === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-slate-50 border border-slate-200 text-slate-700'
            }`}>
              <span className="text-lg flex-shrink-0 mt-0.5">
                {messageType === 'success' ? '✅' : messageType === 'error' ? '⚠️' : 'ℹ️'}
              </span>
              <p className="text-sm">{message}</p>
              <button 
                onClick={() => setMessage("")}
                className="ml-auto text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* All Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              📋 My Posts
              <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {posts.length}
              </span>
            </h3>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50">
              <div className="text-6xl mb-4">📭</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">No Posts Yet</h4>
              <p className="text-slate-500">Create your first post using the form above! 🚀</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div 
                  key={post._id}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h4 className="text-lg font-bold text-slate-900 truncate">
                        {post.title}
                      </h4>
                      {post.category && (
                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {post.content?.slice(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                      <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>📝 {post.content?.length || 0} chars</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium rounded-lg transition-all duration-300 hover:scale-105 text-sm flex items-center gap-1"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-all duration-300 hover:scale-105 text-sm flex items-center gap-1"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;