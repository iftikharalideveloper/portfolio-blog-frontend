import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import ProjectCard from "./components/ProjectCard";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
