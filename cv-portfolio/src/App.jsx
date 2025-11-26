import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Award,
  Zap,
} from "lucide-react";

const App = () => {
  const cvRef = useRef(null);

  const handleDownloadCV = () => {
    const element = cvRef.current;
    if (!element) return;

    const opt = {
      margin: 10,
      filename: "Alex_Johnson_CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const personalInfo = {
    name: "Alex Johnson",
    title: "Senior Software Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
  };

  const about = {
    summary:
      "Passionate software developer with 6+ years of experience building scalable web applications and leading development teams. Specialized in full-stack development with expertise in React, Node.js, and cloud technologies. Committed to writing clean, efficient code and delivering exceptional user experiences.",
    skills: [
      "JavaScript/TypeScript",
      "React/Next.js",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "REST APIs",
      "CI/CD",
      "Agile Methodologies",
    ],
  };

  const experience = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      period: "Jan 2022 - Present",
      description:
        "Lead development of customer-facing applications serving 100k+ users. Implemented microservices architecture reducing response times by 40%.",
      achievements: [
        "Architected and deployed scalable backend services using Node.js and AWS",
        "Mentored junior developers and conducted code reviews",
        "Improved application performance by 40% through optimization techniques",
      ],
    },
    {
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      period: "Mar 2020 - Dec 2021",
      description:
        "Developed and maintained multiple client projects using modern web technologies. Collaborated with cross-functional teams to deliver high-quality products.",
      achievements: [
        "Built responsive web applications using React and Redux",
        "Implemented RESTful APIs and database solutions",
        "Collaborated with UX/UI designers to create intuitive interfaces",
      ],
    },
    {
      company: "StartUp Ventures",
      position: "Frontend Developer",
      period: "Jun 2018 - Feb 2020",
      description:
        "Created user interfaces for early-stage startup products. Focused on creating engaging user experiences and rapid prototyping.",
      achievements: [
        "Developed responsive UI components using React and CSS frameworks",
        "Integrated third-party APIs and payment gateways",
        "Participated in agile development processes and sprint planning",
      ],
    },
  ];

  const education = [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      period: "2014 - 2018",
      details:
        "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration and inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "#",
      image: "https://placehold.co/400x250/3b82f6/ffffff?text=E-Commerce",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates and team features.",
      tech: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      link: "#",
      image: "https://placehold.co/400x250/10b981/ffffff?text=Task+App",
    },
    {
      title: "Weather Dashboard",
      description:
        "Real-time weather dashboard with forecasting and location-based services.",
      tech: ["Vue.js", "OpenWeather API", "Chart.js", "Geolocation"],
      link: "#",
      image: "https://placehold.co/400x250/8b5cf6/ffffff?text=Weather+App",
    },
  ];

  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
    },
    { name: "React Advanced Concepts", issuer: "Meta", date: "2021" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div ref={cvRef} className="w-full">
        {/* Header - Simplified without navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {personalInfo.name}
              </h1>
              <p className="text-sm text-gray-600">{personalInfo.title}</p>
            </div>
            <button 
              onClick={handleDownloadCV}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              <span>Resume</span>
            </button>
          </div>
        </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            AJ
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{personalInfo.title}</p>
          <p className="text-gray-700 max-w-2xl mx-auto">{about.summary}</p>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-600" size={20} />
              <span className="text-gray-700">{personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-blue-600" size={20} />
              <span className="text-gray-700">{personalInfo.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin className="text-blue-600" size={20} />
              <span className="text-gray-700">{personalInfo.linkedin}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Github className="text-blue-600" size={20} />
              <span className="text-gray-700">{personalInfo.github}</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Work Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-6 ml-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {job.position}
                    </h3>
                    <p className="text-lg text-blue-600">{job.company}</p>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1 md:mt-0">
                    <Calendar size={16} className="mr-1" />
                    <span>{job.period}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{job.description}</p>
                <ul className="space-y-1">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <Zap
                        className="text-green-500 mt-1 mr-2 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Project <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Education */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            {education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 border-green-200 pl-6 ml-2 mb-6 last:mb-0"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {edu.degree}
                </h3>
                <p className="text-green-600 font-medium">{edu.institution}</p>
                <p className="text-gray-600 text-sm mb-2">{edu.period}</p>
                <p className="text-gray-700 text-sm">{edu.details}</p>
              </div>
            ))}
          </section>

          {/* Certifications */}
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start">
                  <Award
                    className="text-yellow-500 mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={20} />
                  <span className="text-gray-700">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" size={20} />
                  <span className="text-gray-700">{personalInfo.location}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-700 mb-4">
                I'm always interested in new opportunities and exciting
                projects. Feel free to reach out if you'd like to collaborate or
                just say hello!
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default App;
