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
      description: "A comprehensive backend/API project exploring order processing, internal reporting, or database migration patterns. This is the flagship piece — demonstrating end-to-end enterprise system design, from schema to deployment.",
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
      description: "Built 10+ automated Crystal Reports integrated with SAP Business One for billing, collections, and financial tracking across Operations and Accounting departments at RCD Land Inc.",
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
      description: "Designed and optimized SQL queries against the SAP B1 database to automate previously manual departmental workflows, reducing reliance on spreadsheets and improving reporting accuracy.",
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
      description: "Full-stack inventory tracking application built with React and Supabase, featuring real-time stock updates, role-based access control, and PostgreSQL-backed data persistence.",
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
