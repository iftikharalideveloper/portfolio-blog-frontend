import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-10 -left-20 w-48 h-48 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 -right-20 w-56 h-56 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-200/10 rounded-full blur-3xl"></div>
        
        {/* Main Content */}
        <div className="relative text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex flex-wrap items-center gap-2 justify-center px-4 py-2 bg-indigo-500/10 border border-indigo-200/50 rounded-full mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-medium text-indigo-700">Available for Freelance</span>
            <span className="w-px h-4 bg-indigo-200"></span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-200/50 px-2 py-0.5 rounded-full">
              MERN + Laravel
            </span>
          </div>

          {/* Greeting */}
          <p className="text-indigo-600 font-semibold text-base mb-2 animate-slide-up">
            👋 Hi, I'm
          </p>

          {/* Main Heading - BARA */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-3 leading-[1.1] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Iftikhar Ali
            <span className="block mt-1">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl">
                Full-Stack Developer
              </span>
            </span>
          </h1>

          {/* Description - BARA */}
          <p className="text-base md:text-lg text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            I build full-stack web applications with{' '}
            <span className="text-indigo-600 font-semibold">React</span>,{' '}
            <span className="text-indigo-600 font-semibold">Node.js</span>,{' '}
            <span className="text-indigo-600 font-semibold">Laravel</span>,{' '}
            <span className="text-indigo-600 font-semibold">MySQL</span>,{' '}
            <span className="text-indigo-600 font-semibold">MongoDB</span>, and{' '}
            <span className="text-indigo-600 font-semibold">PostgreSQL</span>. 
            Welcome to my portfolio and blog, where I share what I'm learning along the way.
          </p>

          {/* CTA Buttons - BARA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/projects"
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                🚀 View My Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/contact"
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-indigo-400 text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:bg-white text-base"
            >
              <span className="flex items-center gap-2">
                💬 Get in Touch
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats Section - BARA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { number: '3+', label: 'Years Experience', icon: '💼' },
              { number: '15+', label: 'Projects Completed', icon: '🎯' },
              { number: '10+', label: 'Happy Clients', icon: '😊' },
              { number: '24/7', label: 'Support Available', icon: '🛡️' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200"
              >
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-extrabold text-slate-900">{stat.number}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags - BARA */}
          <div className="flex flex-wrap gap-2.5 justify-center mt-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <span className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-full text-sm font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              ⚛️ React
            </span>
            <span className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-full text-sm font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🎨 TailwindCSS
            </span>
            <span className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-full text-sm font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              📱 React Native
            </span>
            <span className="px-4 py-2 bg-green-50/80 backdrop-blur-sm border border-green-200/80 rounded-full text-sm font-medium text-green-700 hover:border-green-400 hover:bg-green-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🟢 Node.js
            </span>
            <span className="px-4 py-2 bg-green-50/80 backdrop-blur-sm border border-green-200/80 rounded-full text-sm font-medium text-green-700 hover:border-green-400 hover:bg-green-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🚀 Express
            </span>
            <span className="px-4 py-2 bg-red-50/80 backdrop-blur-sm border border-red-200/80 rounded-full text-sm font-medium text-red-700 hover:border-red-400 hover:bg-red-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🔥 Laravel
            </span>
            <span className="px-4 py-2 bg-red-50/80 backdrop-blur-sm border border-red-200/80 rounded-full text-sm font-medium text-red-700 hover:border-red-400 hover:bg-red-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🐘 PHP
            </span>
            <span className="px-4 py-2 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/80 rounded-full text-sm font-medium text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🍃 MongoDB
            </span>
            <span className="px-4 py-2 bg-blue-50/80 backdrop-blur-sm border border-blue-200/80 rounded-full text-sm font-medium text-blue-700 hover:border-blue-400 hover:bg-blue-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🐬 MySQL
            </span>
            <span className="px-4 py-2 bg-blue-50/80 backdrop-blur-sm border border-blue-200/80 rounded-full text-sm font-medium text-blue-700 hover:border-blue-400 hover:bg-blue-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🐘 PostgreSQL
            </span>
            <span className="px-4 py-2 bg-purple-50/80 backdrop-blur-sm border border-purple-200/80 rounded-full text-sm font-medium text-purple-700 hover:border-purple-400 hover:bg-purple-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              📊 GraphQL
            </span>
            <span className="px-4 py-2 bg-cyan-50/80 backdrop-blur-sm border border-cyan-200/80 rounded-full text-sm font-medium text-cyan-700 hover:border-cyan-400 hover:bg-cyan-100/50 hover:shadow-md transition-all duration-300 hover:scale-105">
              🐳 Docker
            </span>
          </div>

          {/* Tech Stack Categories - BARA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {[
              {
                title: '🎯 Frontend',
                techs: ['React', 'TailwindCSS', 'React Native'],
                color: 'from-indigo-500 to-purple-500'
              },
              {
                title: '⚡ Backend',
                techs: ['Node.js', 'Express', 'Laravel', 'PHP'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: '💾 Database',
                techs: ['MongoDB', 'PostgreSQL', 'MySQL'],
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((category, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200"
              >
                <div className={`text-3xl mb-2`}>{category.title.split(' ')[0]}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{category.title.split(' ').slice(1).join(' ')}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.techs.map((tech) => (
                    <span 
                      key={tech}
                      className={`px-3 py-1.5 bg-gradient-to-r ${category.color} text-white text-sm font-medium rounded-full`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 animate-bounce-slow hidden md:block">
            <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center">
              <div className="w-1.5 h-2.5 bg-indigo-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work / Featured Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Some Projects I've <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Built</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'E-Commerce Platform',
              desc: 'Full-featured online store with payment integration (MERN + Stripe)',
              icon: '🛒',
              color: 'from-blue-500 to-cyan-500',
              tech: ['React', 'Node.js', 'MongoDB']
            },
            {
              title: 'Task Management App',
              desc: 'Real-time collaboration with team features (Laravel + PostgreSQL)',
              icon: '✅',
              color: 'from-purple-500 to-pink-500',
              tech: ['Laravel', 'PostgreSQL', 'React']
            },
            {
              title: 'Blog CMS',
              desc: 'Content management system with markdown & API support (MERN + Laravel)',
              icon: '📝',
              color: 'from-orange-500 to-red-500',
              tech: ['Node.js', 'Laravel', 'PostgreSQL']
            }
          ].map((project, index) => (
            <div 
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 cursor-pointer"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
                Learn More 
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
          >
            View All Projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Tech Stack Comparison */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">Tech Stack</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Which Stack Do I <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Use?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* MERN Stack */}
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🌐</span>
              <h3 className="text-2xl font-bold text-slate-900">MERN Stack</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-indigo-50/50 rounded-xl p-3">
                <span className="text-2xl">🍃</span>
                <div>
                  <p className="font-semibold text-slate-900">MongoDB</p>
                  <p className="text-sm text-slate-500">NoSQL Database</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-emerald-50/50 rounded-xl p-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="font-semibold text-slate-900">Express.js</p>
                  <p className="text-sm text-slate-500">Node.js Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl p-3">
                <span className="text-2xl">⚛️</span>
                <div>
                  <p className="font-semibold text-slate-900">React</p>
                  <p className="text-sm text-slate-500">Frontend Library</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50/50 rounded-xl p-3">
                <span className="text-2xl">🟢</span>
                <div>
                  <p className="font-semibold text-slate-900">Node.js</p>
                  <p className="text-sm text-slate-500">JavaScript Runtime</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
              <p className="text-sm text-slate-700 font-medium">✅ Perfect for: SPAs, Real-time Apps, MVPs</p>
            </div>
          </div>

          {/* Laravel + PostgreSQL Stack */}
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🔥</span>
              <h3 className="text-2xl font-bold text-slate-900">Laravel + MySQL + PostgreSQL</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-red-50/50 rounded-xl p-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-semibold text-slate-900">Laravel</p>
                  <p className="text-sm text-slate-500">PHP Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl">
                <span className="text-2xl"><small>🐘🐬</small></span>
                <div>
                  <p className="font-semibold text-slate-900">MySQL + PostgreSQL</p>
                  <p className="text-sm text-slate-500">Advanced RDBMS</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-purple-50/50 rounded-xl p-3">
                <span className="text-2xl">⚛️</span>
                <div>
                  <p className="font-semibold text-slate-900">React + Inertia</p>
                  <p className="text-sm text-slate-500">Modern Frontend</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-yellow-50/50 rounded-xl p-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <p className="font-semibold text-slate-900">Jetstream + Fortify</p>
                  <p className="text-sm text-slate-500">Authentication & Security</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
              <p className="text-sm text-slate-700 font-medium">✅ Perfect for: Enterprise Apps, CMS, APIs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;