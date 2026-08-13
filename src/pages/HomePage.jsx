import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-indigo-500 font-semibold mb-3">Hi, I'm</p>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Iftikhar Ali — Full-Stack Developer
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          I build full-stack web applications with React, Node.js, Express, and MongoDB.
          Welcome to my portfolio and blog, where I share what I'm learning along the way.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/projects"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            View My Projects
          </Link>
          <Link
            to="/contact"
            className="border border-slate-300 hover:border-indigo-400 px-6 py-3 rounded-lg font-medium transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;