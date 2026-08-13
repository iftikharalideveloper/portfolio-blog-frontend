import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { API_URL } from "../config/api";

function ProjectsPage() {
  //fetch projects state
  const [projects, setProjects] = useState([]);
  //fetch hone me time lagega use duran loading state agar error ho to error state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        // console.log("Error fetching projects:", error);
        setError("Project could't load. check the database please!",error)
      } finally{
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

//loading
if (isLoading){
  return <p>Please Wait, Project is Loading...</p>
}

//error
if (error){
  return <p>{error}</p>
}
  return (
    <div>
      <h2>My Projects</h2>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          title={project.title}
          description={project.description}
          githubLink={project.githubLink}
          skills={project.techStack}
        />
      ))}
    </div>
  );
}

export default ProjectsPage;
