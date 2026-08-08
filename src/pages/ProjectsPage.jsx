import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/projects");
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div>
      <h2>My Projects</h2>
      {
        projects.map( (project)=>( 
            <ProjectCard
            key={project._id}
            title={project.title}
            description={project.description}
            githubLink={project.githubLink}
            skills={project.techStack}
             />
        ))
      }
    </div>
  );
}

export default ProjectsPage;
