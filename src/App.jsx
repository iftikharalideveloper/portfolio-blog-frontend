import Footer from "./components/Footer";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";

function App() {
  return (
    <div>
      <Header />
      <h1>Welcome to Iftikhar Ali's Portfolio</h1>

      <ProjectCard title = "Portfolio Blog Backend"
      description = "A full-stack backend with auth, blog, and comments"
      githubLink = "https://github.com/iftikharalideveloper/portfolio-blog-backend"
       />

       <ProjectCard title = "Iftikhar-Ali-webtech"
       description = "Iftikhar Ali Webtech Website for learning purpose only on React frontend project"
       githubLink = "https://github.com/iftikharalideveloper/Iftikhar-Ali-webtech"
        />
       <ProjectCard title = "student-management-system"
       description = "Ecommerce website on MERN Stack, php, and Laravel"
       githubLink = "https://github.com/iftikharalideveloper/student-management-system"
        />
      <Footer />
    </div>
  );
}

export default App;
