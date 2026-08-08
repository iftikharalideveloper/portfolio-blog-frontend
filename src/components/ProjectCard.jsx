import React from 'react'

function ProjectCard({title,description,githubLink,skills}) {
  return (
    <div className='project-card'>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={githubLink}> View on GitHub</a>
        <p>{skills}</p>
    </div>
  )
}

export default ProjectCard;
