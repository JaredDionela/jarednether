// content.js - keeping content separate from markup
// simply drop a new object into the projects array to add a project
// did this so I don't have to wade through HTML when updating my portfolio

const siteContent = {

  meta: {
    name: "Jared Nether D. Dionela",
    shortName: "JD",
    email: "jrdnether@gmail.com",
    phone: "+63 931 154 7171",
    github: "https://github.com/JaredDionela",
    linkedin: "https://www.linkedin.com/in/jared-nether-2209ab2bb/",
    resumePath: "Resume-Jared Nether D. Dionela.pdf",
  },

  hero: {
    roles: [
      "Enterprise Database Developer",
      "Full-Stack Web Developer",
      "SAP B1 Specialist",
      "SQL & Backend Systems",
    ],
  },

  // --- projects array ---
  // when I finish a new backend project I can just add it here
  projects: [
    {
      id: "enterprise-backend",
      title: "Enterprise Backend Deep-Dive",
      description: "A comprehensive backend and API project exploring order processing, internal reporting, and database migration patterns. This flagship piece demonstrates end-to-end enterprise system design from initial schema planning to final deployment.",
      tags: ["Backend", "API", "SQL", "Oracle", "PostgreSQL"],
      github: "#",
      live: null,
      status: "In Progress",
      featured: false,
      layout: "flagship",
    },
    {
      id: "sap-crystal-reports",
      title: "SAP Crystal Reports Dashboard",
      description: "I built over 10 automated Crystal Reports integrated with SAP Business One to handle billing, collections, and financial tracking for the Operations and Accounting departments at RCD Land Inc.",
      tags: ["SAP B1", "Crystal Reports", "SQL", "ERP"],
      github: "#",
      live: null,
      status: "Completed",
      featured: false,
      layout: "tall",
    },
    {
      id: "sql-workflow-automation",
      title: "SQL Workflow Automation",
      description: "I designed and optimized SQL queries against the SAP B1 database to automate manual workflows. This reduced the company's reliance on fragile spreadsheets and improved overall reporting accuracy.",
      tags: ["SQL", "SAP B1", "Backend", "Automation"],
      github: "#",
      live: null,
      status: "Completed",
      featured: false,
      layout: "terminal",
    },
    {
      id: "inventory-management",
      title: "Inventory Management System",
      description: "I built a full-stack inventory tracking application using React and Supabase. It features real-time stock updates, role-based access control, and reliable data persistence backed by PostgreSQL.",
      tags: ["React", "Supabase", "TypeScript", "PostgreSQL"],
      github: "#",
      live: "#",
      status: "Completed",
      featured: false,
      layout: "ai",
    },
    {
      id: "backend-project-5",
      title: "New Backend Project",
      description: "Details coming soon. This slot is reserved for an upcoming enterprise or backend project.",
      tags: ["Backend", "SQL"],
      github: null,
      live: null,
      status: "Coming Soon",
      featured: false,
      comingSoon: true,
      layout: "square",
    },
    {
      id: "backend-project-6",
      title: "New Backend Project",
      description: "Details coming soon. This slot is reserved for an upcoming enterprise or backend project.",
      tags: ["Backend", "API"],
      github: null,
      live: null,
      status: "Coming Soon",
      featured: false,
      comingSoon: true,
      layout: "square",
    },
  ],
};
