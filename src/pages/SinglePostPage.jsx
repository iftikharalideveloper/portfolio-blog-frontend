import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config/api";

function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`${API_URL}/api/posts/${id}`);
        const postData = await postResponse.json();
        setPost(postData.post);

        const commentsResponse = await fetch(`${API_URL}/api/comments/${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData.comments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to comment");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await response.json();

      if (data.success) {
        setComments([...comments, data.newComment]);
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-6 text-lg font-medium text-slate-600 animate-pulse ml-4">
        Loading...
      </p>
    </div>
  );

  if (!post) return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50/30 px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Post not found</h3>
        <p className="text-slate-600 mb-6">The post you're looking for doesn't exist.</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        {/* Post Card */}
        <article className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          
          {/* Post Header */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap gap-3 items-center mb-4">
              {post.category && (
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h2>
          </div>

          {/* Post Content */}
          <div className="px-6 sm:px-8 md:px-10 pb-6">
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-6 sm:p-8">
            
            {/* Comments Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Comments
                <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {comments.length}
                </span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  Post Comment
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                ⚡ Login required to comment
              </p>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💭</div>
                <p className="text-slate-500">No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div 
                    key={comment._id} 
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-100 hover:border-indigo-200 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {comment.author ? comment.author.charAt(0) : 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="font-semibold text-slate-900 text-sm">
                            {comment.author || 'Anonymous'}
                          </p>
                        </div>
                        <p className="text-slate-700 mt-1 text-sm leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SinglePostPage;