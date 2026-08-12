import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import ProjectCard from "./components/ProjectCard";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog/:id" element={<SinglePostPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
