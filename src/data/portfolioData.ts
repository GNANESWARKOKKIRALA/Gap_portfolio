export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  overview: string;
  architecture: {
    steps: { title: string; desc: string }[];
    summary: string;
  };
  metrics: { label: string; value: string }[];
  challenges: { problem: string; solution: string }[];
  impact: string[];
  lessonsLearned: string[];
  futureScope: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; relation: string[] }[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface PortfolioData {
  name: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
  objective: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Gnaneswar Kokkirala",
  fullName: "Kokkirala Gnaneswara Anjani Prasad",
  title: "AI Engineer & Software Creator",
  email: "gnaneswarkokkirala@gmail.com",
  phone: "+91 6309764875",
  location: "Chilakaluripet, Andhra Pradesh, India",
  socials: {
    github: "https://github.com/GNANESWARKOKKIRALA",
    linkedin: "https://www.linkedin.com/in/gnaneswar-kokkirala-9562a2315/",
    portfolio: "https://gnaneswar-portfolio91.netlify.app/",
  },
  objective:
    "Aspiring Software Engineer with knowledge of Python, SQL, and Generative AI, and hands-on experience building RAG-powered LLM applications, seeking to contribute to innovative and scalable solutions.",
  skills: [
    {
      category: "Programming Languages & Databases",
      skills: [
        { name: "Python", relation: ["NumPy", "Pandas", "Scikit-learn", "Plotly", "Generative AI", "LLMs", "RAG"] },
        { name: "SQL (SQL Server)", relation: ["Python", "AI RAG Chatbot", "FitAI"] },
      ],
    },
    {
      category: "Python Libraries",
      skills: [
        { name: "NumPy", relation: ["Python", "Pandas", "Scikit-learn"] },
        { name: "Pandas", relation: ["Python", "NumPy", "Plotly"] },
        { name: "Plotly", relation: ["Python", "Pandas", "FitAI"] },
        { name: "Scikit-learn", relation: ["Python", "NumPy", "Machine Learning"] },
      ],
    },
    {
      category: "Generative AI",
      skills: [
        { name: "LLMs", relation: ["RAG", "Prompt Engineering", "Groq API"] },
        { name: "RAG", relation: ["LLMs", "Vector Databases", "ChromaDB"] },
        { name: "Prompt Engineering", relation: ["LLMs", "RAG"] },
        { name: "Vector Databases", relation: ["RAG", "ChromaDB"] },
        { name: "API Integration", relation: ["Python", "Groq API"] },
      ],
    },
    {
      category: "AI/ML Fundamentals",
      skills: [
        { name: "Artificial Intelligence", relation: ["Machine Learning", "Deep Learning"] },
        { name: "Machine Learning", relation: ["Artificial Intelligence", "Deep Learning", "Scikit-learn"] },
        { name: "Deep Learning", relation: ["Artificial Intelligence", "Machine Learning"] },
      ],
    },
    {
      category: "Frontend Basics",
      skills: [
        { name: "HTML", relation: ["CSS"] },
        { name: "CSS", relation: ["HTML"] },
      ],
    },
    {
      category: "Tools & IDEs",
      skills: [
        { name: "Visual Studio Code", relation: ["GitHub"] },
        { name: "GitHub", relation: ["Visual Studio Code"] },
      ],
    },
  ],
  experience: [
    {
      role: "Artificial Intelligence Intern",
      company: "IBM SkillsBuild (AICTE)",
      duration: "Sep – Oct 2025",
      highlights: [
        "Completed 4-week intensive AI internship gaining hands-on experience in core Artificial Intelligence concepts.",
        "Deepened proficiency in Python programming applied to predictive AI models and real-world AI applications.",
        "Developed final projects demonstrating LLM capabilities and basic cognitive service integrations.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology (B.Tech) – Computer Science and Engineering",
      institution: "Tirumala Engineering College, Narasaraopet",
      duration: "2022 - 2026",
      grade: "71% CGPA",
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College, Chilakaluripet",
      duration: "2020 - 2022",
      grade: "76%",
    },
    {
      degree: "Secondary School Education (SSC)",
      institution: "Chaitanya High School, Chilakaluripet",
      duration: "2019 - 2020",
      grade: "95%",
    },
  ],
  certifications: [
    "Certified in Python by Cisco Networking Academy.",
    "Python for Data Science by Cognitive Class (IBM)."
  ],
  projects: [
    {
      id: "ai-rag-chatbot",
      title: "AI RAG Chatbot",
      tagline: "Hybrid intelligent agent supporting local context-aware document Q&A and direct LLM inferences.",
      description:
        "A secure, hybrid AI chat system that retrieves context from vector stores to answer queries using LLaMA 3.3 70B, with complete SQLite-based user authentication.",
      liveUrl: "https://ai-rag-chatbot-kqut4cmcnzjvrftxxwmtpk.streamlit.app/",
      githubUrl: "https://github.com/GNANESWARKOKKIRALA/Ai-RAG-Chatbot",
      techStack: [
        "Python",
        "Streamlit",
        "ChromaDB",
        "Groq API",
        "LLaMA 3.3 70B",
        "SQLite",
        "sentence-transformers",
        "bcrypt",
      ],
      overview:
        "The AI RAG Chatbot provides a robust platform for document intelligence. Users can upload documents, which are parsed, split, embedded, and stored in a vector database. When queries are received, the system extracts relevant document snippets and constructs an augmented prompt, sent to LLaMA 3.3 via Groq for high-throughput responses. It also contains SQLite-based user authentication to protect conversations.",
      architecture: {
        steps: [
          {
            title: "Document Ingestion & Parsing",
            desc: "Incoming text or PDF documents are processed and split into optimal overlapping chunks of 500-1000 characters to retain contextual semantic value.",
          },
          {
            title: "Embedding Generation",
            desc: "Sentence-transformers models convert chunks into dense 384-dimensional vector representations.",
          },
          {
            title: "Vector Retrieval & Indexing",
            desc: "Vectors are indexed inside ChromaDB. Similarity searches retrieve the top-K chunks that align semantically with the user's inquiry.",
          },
          {
            title: "LLM Augmentation & Inference",
            desc: "ChromaDB results are combined with the user query into a system-prompt framework, which is processed by LLaMA 3.3 (70B) via Groq API within milliseconds.",
          },
          {
            title: "Secure Session Layer",
            desc: "User registration, bcrypt-hashed passwords, and secure multi-tenant sessions are managed via a local SQLite database.",
          },
        ],
        summary:
          "The combination of sentence-transformers for fast embeddings, ChromaDB for similarity searching, and Groq API for LLaMA 3.3 70B inference enables sub-second latency for document-grounded question answering.",
      },
      metrics: [
        { label: "LLM Speed", value: "70+ Tokens/sec (Groq)" },
        { label: "Vector Search Time", value: "<15ms (ChromaDB)" },
        { label: "Context Window", value: "8,192 Tokens" },
        { label: "Security Encryption", value: "Bcrypt (Blowfish)" },
      ],
      challenges: [
        {
          problem: "Handling high-concurrency requests in Streamlit.",
          solution:
            "Implemented Streamlit session states combined with safe SQLite write locks and thread-safe DB connections to ensure stable, isolated user sessions.",
        },
        {
          problem: "Balancing retrieval precision with token usage.",
          solution:
            "Adopted recursive text splitting with 150-token overlap, retrieving top-3 chunk contexts, maintaining a high cosine-similarity cut-off to prevent junk contexts from degrading LLM output.",
        },
      ],
      impact: [
        "Enabled instantaneous, hallucination-free querying of internal training manuals and textbooks.",
        "Demonstrated a fully functional multi-user RAG system built entirely with open-source models.",
        "Minimized API operating costs by substituting local embeddings for OpenAI API equivalents.",
      ],
      lessonsLearned: [
        "Embedding chunk sizes must match the nature of documents; technical guides require smaller chunks, while narratives prefer larger paragraphs.",
        "Groq's LLaMA 3.3-70B API provides near-instant responses, highlighting the viability of edge-inferencing for interactive chat systems.",
      ],
      futureScope: [
        "Integrate semantic caching to bypass LLM calls for repeated/duplicate questions.",
        "Implement hybrid search (combining sparse BM25 keyword matching with dense ChromaDB vectors) for better keyword retrieval.",
      ],
    },
    {
      id: "fitai",
      title: "FitAI – Fitness & Diet Assistant",
      tagline: "A personalized AI-powered fitness, diet recommendations, and progress tracking dashboard.",
      description:
        "An AI-driven health platform utilizing Flask and LLaMA 3.3 to construct custom meal plans and exercise regimens, complete with dynamic Plotly tracking charts.",
      liveUrl: "https://kgap.pythonanywhere.com/auth/login",
      githubUrl: "https://github.com/GNANESWARKOKKIRALA/Fit-AI",
      techStack: [
        "Python",
        "Flask",
        "SQLite",
        "Groq API (LLaMA 3.3)",
        "Pandas",
        "NumPy",
        "Plotly",
        "Bcrypt",
        "HTML",
        "CSS",
      ],
      overview:
        "FitAI targets health tracking by combining conversational AI with analytical tools. Users submit their physical metrics (weight, height, age, goals) and the backend computes metabolic rates and calories. It invokes LLaMA 3.3 to formulate hyper-personalized workouts and meal plans. Fitness logs are stored in SQLite and plotted dynamically using Plotly, allowing users to watch their parameters evolve over time.",
      architecture: {
        steps: [
          {
            title: "Metric Input & BMR Calculations",
            desc: "Computes Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) based on user metrics using standard formula coefficients.",
          },
          {
            title: "AI Recommendation Engine",
            desc: "Feeds TDEE, fitness objectives, dietary restrictions, and weight history to LLaMA 3.3 to compile structured, custom workout tables and recipes.",
          },
          {
            title: "Relational Persistence Layer",
            desc: "Saves daily logs, calorie goals, sleep data, and workouts in SQLite tables under secure user accounts.",
          },
          {
            title: "Interactive Analytics & Plotting",
            desc: "Reads user logs from SQLite into Pandas DataFrames, performing trend analysis, and exports interactive JS plots via Plotly for visual updates.",
          },
        ],
        summary:
          "FitAI translates raw calorie inputs and workouts into graphical charts. Flask routes serve dynamic visual scripts alongside tailored markdown responses generated by LLaMA 3.3.",
      },
      metrics: [
        { label: "Data Import Rate", value: "Pandas-optimized (<5ms)" },
        { label: "Custom Chart Rendition", value: "Plotly Interactive JS" },
        { label: "Security Level", value: "PBKDF2 SHA-256 Hashing" },
        { label: "Recommendation Latency", value: "<800ms" },
      ],
      challenges: [
        {
          problem: "Generating highly structured output from the LLM that parsing scripts can consistently display.",
          solution:
            "Employed strict system role instructions and JSON/Markdown structural anchors, forcing LLaMA to return clean markdown tables that compile directly into the HTML viewport.",
        },
        {
          problem: "Deploying Python/Flask applications on a resource-constrained server (PythonAnywhere).",
          solution:
            "Optimized memory usage by lazy-loading Plotly/Pandas and keeping the SQLite database vacuumed, ensuring page loading stays under 1.5 seconds.",
        },
      ],
      impact: [
        "Provides a free, localized alternative to expensive health tracking applications.",
        "Shows an intuitive visual design bridging structured backend calculations with text recommendations.",
        "Demonstrates complete full-stack web integration using Python micro-frameworks.",
      ],
      lessonsLearned: [
        "Data visualization is most effective when users can hover and isolate variables; static charts are far less engaging.",
        "A lightweight Python Flask app coupled with SQLite is a solid architecture for simple MVP deployments.",
      ],
      futureScope: [
        "Integrate mobile device integrations (e.g. Google Fit API) to automatically synchronize step counts.",
        "Incorporate computer-vision-based exercise posture checking using device camera feeds.",
      ],
    },
  ],
};
