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
        setError("Project could't load. check the database please!", error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  //loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Please Wait, Project is Loading...</p>
      </div>
    );
  }

  //error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">My Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );
}

export default ProjectsPage;