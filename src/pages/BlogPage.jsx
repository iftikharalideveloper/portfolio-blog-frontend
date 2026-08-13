import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';

// Fallback blog posts in case API fails
const fallbackPosts = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack Development',
    category: 'MERN Stack',
    excerpt: 'Learn how to build full-stack applications with MongoDB, Express.js, React, and Node.js. A complete guide for beginners.',
    date: 'Dec 15, 2024',
    readTime: '5 min read',
    image: '🚀',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    _id: '2',
    title: 'Why Laravel + PostgreSQL is a Great Choice for Enterprise Apps',
    category: 'Laravel',
    excerpt: 'Discover why Laravel with PostgreSQL is becoming the preferred choice for enterprise-level applications and large-scale projects.',
    date: 'Dec 10, 2024',
    readTime: '7 min read',
    image: '🔥',
    color: 'from-red-500 to-orange-500'
  },
  {
    _id: '3',
    title: 'Mastering TailwindCSS: Tips and Tricks',
    category: 'CSS',
    excerpt: 'Level up your TailwindCSS skills with these advanced techniques, custom configurations, and performance optimization tips.',
    date: 'Dec 5, 2024',
    readTime: '4 min read',
    image: '🎨',
    color: 'from-purple-500 to-pink-500'
  },
  {
    _id: '4',
    title: 'Building Real-time Applications with WebSockets',
    category: 'JavaScript',
    excerpt: 'Learn how to implement real-time features like chat, notifications, and live updates using WebSockets with Node.js and React.',
    date: 'Nov 28, 2024',
    readTime: '6 min read',
    image: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    _id: '5',
    title: 'Database Design Best Practices',
    category: 'Database',
    excerpt: 'Essential database design principles for MongoDB and PostgreSQL. Learn about indexing, normalization, and performance optimization.',
    date: 'Nov 20, 2024',
    readTime: '8 min read',
    image: '💾',
    color: 'from-green-500 to-emerald-500'
  },
  {
    _id: '6',
    title: 'Deploying MERN Applications to Production',
    category: 'DevOps',
    excerpt: 'Step-by-step guide to deploying your MERN stack applications to production using Vercel, Render, and MongoDB Atlas.',
    date: 'Nov 15, 2024',
    readTime: '9 min read',
    image: '🌐',
    color: 'from-indigo-500 to-purple-500'
  }
];

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts`);
        
        if (!response.ok) {
          throw new Error('API returned error');
        }
        
        const data = await response.json();
        
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (error) {
        console.log('Error fetching posts:', error);
        setPosts(fallbackPosts);
        setError("Couldn't connect to database. Showing sample posts instead.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Enhanced Loading State
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
          Loading Blog Posts...
        </p>
        <p className="text-sm text-slate-400">Please wait while we fetch the latest articles</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-200/50 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-700">Blog</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            My <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Blog</span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sharing my thoughts, experiences, and knowledge about web development, 
            programming, and technology.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">📝</span>
              <span className="font-semibold text-slate-900">{posts.length}</span>
              <span className="text-slate-500 text-sm">Total Posts</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">📂</span>
              <span className="font-semibold text-slate-900">{categories.length - 1}</span>
              <span className="text-slate-500 text-sm">Categories</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-2xl mx-auto">
              <p className="text-sm text-yellow-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </p>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Posts Found</h3>
            <p className="text-slate-500">No posts available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={post._id}
                className="animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/blog/${post._id}`} className="block h-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 h-full flex flex-col">
                    
                    {/* Post Image / Emoji */}
                    <div className={`relative h-48 bg-gradient-to-br ${post.color || 'from-indigo-500 to-purple-500'} overflow-hidden`}>
                      <div className="w-full h-full flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                        {post.image || '📄'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      {/* Read Time */}
                      {post.readTime && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-slate-600 rounded-full shadow-sm flex items-center gap-1">
                            <span>📖</span> {post.readTime}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        {post.date && (
                          <span className="flex items-center gap-1">
                            <span>📅</span> {post.date}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
                        {post.excerpt || post.content || 'Read more about this topic...'}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                        <span className="text-indigo-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <span className="text-xs text-slate-400">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Want to Read More?
            </h3>
            <p className="text-slate-600 mb-6">
              Subscribe to my newsletter and never miss an update!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Subscribe 📬
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;