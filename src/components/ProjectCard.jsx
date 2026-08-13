import { Link } from "react-router-dom";

function ProjectCard({ 
  title, 
  description, 
  githubLink, 
  skills = [], 
  image, 
  liveLink,
  color = 'from-indigo-500 to-purple-500',
  isReal = false
}) {
  const isEmoji = image && image.length <= 2;
  
  return (
    <div className={`group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border ${isReal ? 'border-emerald-300/50' : 'border-white/50'} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${isReal ? 'hover:border-emerald-400' : 'hover:border-indigo-200'} h-full flex flex-col relative`}>
      
      {/* Real Project Badge */}
      {isReal && (
        <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          Real Project
        </div>
      )}
      
      {/* Project Image / Emoji */}
      <div className={`relative h-48 bg-gradient-to-br ${color} overflow-hidden`}>
        {image ? (
          isEmoji ? (
            <div className="w-full h-full flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
              {image}
            </div>
          ) : (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            📁
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Tech Stack Badges */}
        {skills && skills.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((skill, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-slate-700 rounded-full shadow-sm hover:scale-105 transition-transform"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-slate-700 rounded-full shadow-sm">
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200/50">
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-indigo-500/25"
            >
              🌐 Live Demo
            </a>
          )}
          
          {!githubLink && !liveLink && (
            <span className="flex-1 text-center text-xs text-slate-400 bg-slate-50 px-3 py-2.5 rounded-xl">
              🔒 Private Project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;