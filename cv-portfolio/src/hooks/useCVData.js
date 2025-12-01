export const useCVData = () => {
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
      image: "https://placehold.co/400x250/3b82f6/ffffff?text=E-Commerce",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates and team features.",
      tech: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
      image: "https://placehold.co/400x250/10b981/ffffff?text=Task+App",
    },
    {
      title: "Weather Dashboard",
      description:
        "Real-time weather dashboard with forecasting and location-based services.",
      tech: ["Vue.js", "OpenWeather API", "Chart.js", "Geolocation"],
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

  return {
    personalInfo,
    about,
    experience,
    education,
    projects,
    certifications,
  };
};
