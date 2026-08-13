import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { API_URL } from "../config/api";

// 3 Demo Projects (Same as HomePage) + 1 Real Project
const fallbackProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with payment integration (MERN + Stripe)',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubLink: 'https://github.com/yourusername/ecommerce',
    liveLink: 'https://ecommerce-demo.com',
    image: '🛒',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'Real-time collaboration with team features (Laravel + PostgreSQL)',
    techStack: ['Laravel', 'PostgreSQL', 'React', 'WebSockets'],
    githubLink: 'https://github.com/yourusername/taskmanager',
    liveLink: 'https://taskmanager-demo.com',
    image: '✅',
    color: 'from-purple-500 to-pink-500'
  },
  {
    _id: '3',
    title: 'Blog CMS',
    description: 'Content management system with markdown & API support (MERN + Laravel)',
    techStack: ['Node.js', 'Laravel', 'PostgreSQL', 'Markdown'],
    githubLink: 'https://github.com/yourusername/blogcms',
    liveLink: 'https://blogcms-demo.com',
    image: '📝',
    color: 'from-orange-500 to-red-500'
  },
  // 👇 YOUR REAL PROJECT - Add your actual project details here
  {
    _id: '4',
    title: 'Iftikhar Ali Portfolio & Blog',  // ← Change to your real project name
    description: 'Full-stack portfolio and blog platform built with MERN stack. Features authentication, blog management, and project showcase with TailwindCSS.',  // ← Your real description
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    githubLink: 'https://github.com/yourusername/your-repo-name',  // ← Your GitHub link
    liveLink: 'https://your-live-project.com',  // ← Your live demo link
    image: '🚀',  // ← Can be emoji or image URL
    color: 'from-green-500 to-emerald-500',  // ← Unique color for your project
    isReal: true  // ← Mark as real project
  }
];

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        
        if (!response.ok) {
          throw new Error('API returned error');
        }
        
        const data = await response.json();
        
        if (data.projects && data.projects.length > 0) {
          // Merge API projects with fallback (to ensure all 4 show)
          const allProjects = [...data.projects, ...fallbackProjects];
          setProjects(allProjects);
        } else {
          setProjects(fallbackProjects);
          setUseFallback(true);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
        setProjects(fallbackProjects);
        setUseFallback(true);
        setError("Couldn't connect to database. Showing sample projects instead.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
          Loading Projects...
        </p>
        <p className="text-sm text-slate-400">Please wait while we fetch the latest projects</p>
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
            <span className="text-sm font-medium text-indigo-700">Portfolio</span>
            {useFallback && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full ml-2">
                Sample Data
              </span>
            )}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Some Projects I've <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Built</span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Here are some of the projects I've built. Each one showcases different skills 
            and technologies I work with.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 justify-center mt-8">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">📦</span>
              <span className="font-semibold text-slate-900">{projects.length}</span>
              <span className="text-slate-500 text-sm">Total Projects</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl">🛠️</span>
              <span className="font-semibold text-slate-900">
                {new Set(projects.flatMap(p => p.techStack || [])).size}
              </span>
              <span className="text-slate-500 text-sm">Technologies Used</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-emerald-200">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold text-emerald-700">
                {projects.filter(p => p.isReal).length}
              </span>
              <span className="text-emerald-600 text-sm">Real Projects</span>
            </div>
          </div>

          {/* Error Message (if any) */}
          {error && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-2xl mx-auto">
              <p className="text-sm text-yellow-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </p>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Projects Yet</h3>
            <p className="text-slate-500">Check back soon for exciting new projects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={project._id || index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  githubLink={project.githubLink}
                  skills={project.techStack}
                  image={project.image}
                  liveLink={project.liveLink}
                  color={project.color}
                  isReal={project.isReal}
                />
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Have a Project in Mind?
            </h3>
            <p className="text-slate-600 mb-6">
              Let's collaborate and bring your ideas to life!
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
            >
              💬 Let's Talk
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;