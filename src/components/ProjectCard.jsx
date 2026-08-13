import React from 'react'

function ProjectCard({ title, description, githubLink, skills }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>

      {skills && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {githubLink && (
          <a href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-700 font-medium text-sm"
        >
          View on GitHub →
        </a>
      )}
    </div>
  )
}

export default ProjectCard;