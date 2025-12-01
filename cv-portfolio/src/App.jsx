import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Award,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useCV } from "./hooks/useCV";
import { useCVData } from "./hooks/useCVData";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  const { cvRef, downloadCV } = useCV();
  const {
    personalInfo,
    about,
    experience,
    education,
    projects,
    certifications,
  } = useCVData();
  const { theme, toggle } = useTheme();

  return (
    <div
      data-theme={theme}
      className="min-h-screen app-bg bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div ref={cvRef} className="w-full">
        {/* Header - Enhanced Design */}
        <header className="header-bg backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
          <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                AJ
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {personalInfo.name}
                </h1>
                <p className="text-xs text-muted">{personalInfo.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
                title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => downloadCV()}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section - Enhanced */}
          <section className="mb-20 text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              AJ
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              {personalInfo.name}
            </h1>
            <p className="text-2xl font-semibold text-indigo-600 mb-6">
              {personalInfo.title}
            </p>
            <p className="text-muted max-w-3xl mx-auto text-lg leading-relaxed">
              {about.summary}
            </p>
          </section>

          {/* Contact Info - Card Style */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Quick Links
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card-bg p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                  <Mail className="text-white" size={24} />
                </div>
                <p className="text-xs text-muted font-medium mb-1">Email</p>
                <p className="text-sm font-semibold text-primary truncate">
                  {personalInfo.email}
                </p>
              </div>
              <div className="card-bg p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-3">
                  <MapPin className="text-white" size={24} />
                </div>
                <p className="text-xs text-muted font-medium mb-1">Location</p>
                <p className="text-sm font-semibold text-primary truncate">
                  {personalInfo.location}
                </p>
              </div>
              <div className="card-bg p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center mb-3">
                  <Linkedin className="text-white" size={24} />
                </div>
                <p className="text-xs text-muted font-medium mb-1">LinkedIn</p>
                <p className="text-sm font-semibold text-primary truncate">
                  {personalInfo.linkedin}
                </p>
              </div>
              <div className="card-bg p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-800">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mb-3">
                  <Github className="text-white" size={24} />
                </div>
                <p className="text-xs text-muted font-medium mb-1">GitHub</p>
                <p className="text-sm font-semibold text-primary truncate">
                  {personalInfo.github}
                </p>
              </div>
            </div>
          </section>

          {/* Skills Section - Enhanced */}
          <section className="card-bg rounded-2xl shadow-md p-8 mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-primary mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 border border-indigo-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience Section - Enhanced */}
          <section className="card-bg rounded-2xl shadow-md p-8 mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-primary mb-8">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="border-l-4 border-indigo-300 pl-6 ml-2 pb-6 last:pb-0 hover:border-indigo-600 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {job.position}
                      </h3>
                      <p className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex items-center text-indigo-600 mt-2 md:mt-0 text-sm font-medium">
                      <Calendar size={16} className="mr-2" />
                      <span>{job.period}</span>
                    </div>
                  </div>
                  <p className="text-muted mb-4">{job.description}</p>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <Zap
                          className="text-green-500 mt-0.5 mr-3 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-muted">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section - Enhanced */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-8">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="card-bg rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications - Enhanced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Education */}
            <section className="card-bg rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Education
                </span>
              </h2>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-4 border-green-300 pl-6 ml-2"
                >
                  <h3 className="text-lg font-bold text-primary">
                    {edu.degree}
                  </h3>
                  <p className="text-green-600 font-semibold">
                    {edu.institution}
                  </p>
                  <p className="text-muted text-sm mb-2">{edu.period}</p>
                  <p className="text-muted text-sm">{edu.details}</p>
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section className="card-bg rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h2>
              <div className="space-y-5">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 rounded-lg border border-yellow-200 card-bg"
                  >
                    <Award
                      className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <h3 className="font-bold text-primary">{cert.name}</h3>
                      <p className="text-muted text-sm">{cert.issuer}</p>
                      <p className="text-muted text-xs mt-1">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Contact Section - Enhanced */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-10 text-white mb-12">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Let's Connect</h3>
                <p className="text-white/90 leading-relaxed">
                  I'm always interested in new opportunities and exciting
                  projects. Feel free to reach out if you'd like to collaborate
                  or just say hello!
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer - Enhanced */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 mt-16 border-t border-gray-700">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-muted">
              © 2025 {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-muted text-sm mt-2">
              Crafted with <span className="text-red-500">❤</span> by{" "}
              {personalInfo.name}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
