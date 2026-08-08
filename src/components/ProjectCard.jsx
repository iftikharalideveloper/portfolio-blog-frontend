import React from 'react'

function ProjectCard({title,description,githubLink}) {
  return (
    <div className='project-card'>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={githubLink}> View on GitHub</a>
    </div>
  )
}

export default ProjectCard;
