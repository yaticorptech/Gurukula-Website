import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: "/images/gallery1.jpg",  caption: "Computer Lab",         tall: false },
  { src: "/images/gallery2.jpg",  caption: "Hands-on Training",    tall: true  },
  { src: "/images/gallery3.jpg",  caption: "Graphic Design Class", tall: false },
  { src: "/images/gallery4.jpg",  caption: "Student Batch",        tall: true  },
  { src: "/images/gallery5.jpg",  caption: "Certificate Ceremony", tall: false },
  { src: "/images/gallery6.jpg",  caption: "AI Workshop",          tall: true  },
  { src: "/images/gallery7.jpg",  caption: "Accounting Training",  tall: false },
  { src: "/images/gallery8.jpg",  caption: "Video Editing Lab",    tall: true  },
  { src: "/images/gallery9.jpg",  caption: "DTP & Design",         tall: false },
  { src: "/images/gallery10.jpg", caption: "Student Projects",     tall: false },
  { src: "/images/gallery11.jpg", caption: "Campus View",          tall: true  },
  { src: "/images/gallery12.jpg", caption: "Graduation Day",       tall: false },
];

const COURSES = [
  {
    id: 1, title: "Diploma in Computer Application (DCA) + AI",
    category: "Diploma Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/dca.jpg", 
    popular: true,
    description: "DCA is a foundational computer course designed for beginners who want to build strong computer skills. Students learn computer fundamentals, MS Office applications, internet usage, and typing skills along with basic AI tools to improve productivity.",
    learn: ["Computer Fundamentals & Windows", "MS Word, Excel, PowerPoint", "MS Access", "Internet & Email usage", "English Typing", "Introduction to AI tools"],
    careers: ["Data Entry Operator", "Computer Operator", "Office Assistant", "Back Office Executive", "Documentation Assistant"],
  },
  {
    id: 2, title: "Advance Diploma in Computer Application (ADCA) + AI",
    category: "Diploma Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/adca.jpg",
    description: "ADCA is an advanced computer course that covers office applications, basic programming, accounting software, and web fundamentals.",
    learn: ["Computer Fundamentals", "MS Office (Word, Excel, PowerPoint, Access)", "HTML (Basic Web Development)", "C Programming (Basics)", "Tally with GST", "Internet Applications", "AI Tools for productivity"],
    careers: ["Computer Operator", "Office Administrator", "Junior Web Assistant", "Accounts Assistant", "MIS Executive"],
  },
  {
    id: 3, title: "Diploma in Office Management & Accounting (DOMA) + AI",
    category: "Diploma Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/doma.png",
    description: "This course focuses on office management and financial accounting.",
    learn: ["Computer Fundamentals", "MS Office Applications", "Business Documentation", "Financial Accounting Basics", "Tally Accounting Software", "AI tools for business productivity"],
    careers: ["Accounts Assistant", "Office Administrator", "Billing Executive", "Back Office Executive", "Junior Accountant"],
  },
  {
    id: 4, title: "Desktop Publishing (DTP) + AI",
    category: "Diploma Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/dtp.jpg",
    description: "DTP is designed for students interested in graphic design and publishing.",
    learn: ["Adobe InDesign", "CorelDraw", "Photoshop", "English Typing", "Kannada Typing", "AI tools for design"],
    careers: ["Graphic Designer", "DTP Operator", "Printing Press Designer", "Publishing Assistant", "Social Media Designer"],
  },
  {
    id: 5, title: "Advanced Excel + Tally ERP9",
    category: "Diploma Courses", 
    duration: "2 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/aet.jpg",
    description: "This course focuses on advanced spreadsheet skills and accounting software.",
    learn: ["Advanced Excel Functions", "Data Analysis", "Financial Reports", "Tally ERP9 Accounting", "GST Entries"],
    careers: ["Accounts Assistant", "MIS Executive", "Billing Executive", "Data Analyst (Entry Level)", "Office Accountant"],
  },
  {
    id: 6, title: "Certificate in Office Automation (COA) + AI",
    category: "Certificate Courses", 
    duration: "3 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/coa.jpg",
    description: "COA is a beginner-friendly course designed to teach essential computer and office skills.",
    learn: ["Computer Basics", "Windows Operating System", "MS Word", "MS Excel", "MS PowerPoint", "AI productivity tools"],
    careers: ["Office Assistant", "Computer Operator", "Data Entry Operator", "Receptionist"],
  },
  {
    id: 7, title: "Certificate in Financial Accounting (CFA) + AI",
    category: "Certificate Courses", 
    duration: "3 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cfa.jpg",
    description: "This course introduces students to financial accounting concepts and Tally software.",
    learn: ["Accounting Basics", "Business Transactions", "Tally Software", "GST Basics", "AI tools for accounting"],
    careers: ["Accounts Assistant", "Billing Executive", "Tally Operator", "Junior Accountant"],
  },
  {
    id: 8, title: "Certificate in Information Technology (CIT) + AI",
    category: "Certificate Courses", 
    duration: "3 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cit.jpg",
    description: "CIT provides basic IT knowledge including computer operations and office software.",
    learn: ["Computer Fundamentals", "MS Office Applications", "Internet & Email", "AI tools for productivity"],
    careers: ["Computer Operator", "Data Entry Operator", "Office Staff"],
  },
  {
    id: 9, title: "Certificate in Photo & Video Editing + AI",
    category: "Graphic Design Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cpve.jpg",
    description: "This course trains students in professional photo and video editing tools.",
    learn: ["Photoshop", "Premiere Pro", "After Effects", "Video Editing Techniques", "AI tools for editing"],
    careers: ["Video Editor", "Photo Editor", "YouTube Editor", "Social Media Content Editor"],
  },
  {
    id: 10, title: "Diploma in VFX & Post Production + AI",
    category: "Graphic Design Courses", 
    duration: "12 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/vfxp.jpg",
    description: "A professional course focused on visual effects and post-production for films and digital media.",
    learn: ["Photoshop", "Illustrator", "Audition", "Premiere Pro", "After Effects", "DaVinci Resolve", "AI video tools"],
    careers: ["VFX Artist", "Video Editor", "Post Production Editor", "Motion Graphics Artist"],
  },
  {
    id: 11, title: "Certificate in Motion Graphics + AI",
    category: "Graphic Design Courses", 
    duration: "4 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cmg.jpg",
    description: "This course teaches animation and motion design for advertisements and digital marketing.",
    learn: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro Basics", "AI animation tools"],
    careers: ["Motion Graphics Designer", "Video Editor", "Animation Assistant"],
  },
  {
    id: 12, title: "Certificate in Film Making + AI",
    category: "Graphic Design Courses", 
    duration: "2 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cfm.jpg",
    description: "Students learn the fundamentals of filmmaking including editing and storytelling.",
    learn: ["Photoshop Basics", "Video Editing", "Premiere Pro", "Film Editing Techniques"],
    careers: ["Video Editor", "Content Creator", "Assistant Editor"],
  },
  {
    id: 13, title: "Certificate in Graphic Design + AI",
    category: "Graphic Design Courses", 
    duration: "6 Months", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/cgd.jpg",
    description: "Professional graphic design skills for advertising, branding, and print media.",
    learn: ["Photoshop", "Illustrator", "InDesign", "CorelDraw", "AI design tools"],
    careers: ["Graphic Designer", "Branding Designer", "Social Media Designer", "Advertising Designer"],
  },
  {
    id: 14, title: "Foundations of Artificial Intelligence",
    category: "Artificial Intelligence Courses", 
    duration: "30 Days", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/fai.jpg",
    description: "An introductory course to understand AI concepts, tools, and applications.",
    learn: ["Introduction to AI", "AI Applications", "AI Tools Overview"],
    careers: ["AI Assistant", "AI Content Creator", "AI Tool Specialist"],
  },
  {
    id: 15, title: "Applied Artificial Intelligence with 50+ AI Tools",
    category: "Artificial Intelligence Courses", 
    duration: "80 Days", 
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/aai.jpg",
    description: "Students learn practical applications of AI tools for content creation and automation.",
    learn: ["AI Content Creation", "Automation Tools", "AI Marketing Tools", "Productivity AI Tools"],
    careers: ["AI Specialist", "Digital Marketer", "AI Content Creator", "Automation Specialist"],
  },
  {
    id: 16, title: "Power BI",
    category: "Artificial Intelligence Courses", 
    duration: "90 Days",
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/powerbi.jpg",
    description: "Data visualization and business intelligence using Power BI dashboards and reports.",
    learn: ["Data Visualization", "Power BI Dashboards", "Business Reports"],
    careers: ["Data Analyst", "Business Analyst", "MIS Executive"],
  },
  {
    id: 17, title: "Tableau",
    category: "Artificial Intelligence Courses", 
    duration: "60 Days",
    price: "₹18,000", 
    rating: "4.5",
    image: "/images/tableau.jpg",
    description: "Interactive data visualizations and dashboards for business decision-making.",
    learn: ["Tableau Dashboards", "Interactive Reports", "Business Data Visualization"],
    careers: ["Data Analyst", "Business Intelligence Analyst"],
  },
];

const INDIVIDUAL_COURSES = [
  "MS Excel", "MS Word", "Kannada Typing", "English Typing",
  "Tally / Tally Prime / Tally with GST", "Photoshop",
  "Illustrator", "CorelDraw", "After Effects", "Premiere Pro",
];

const INDIVIDUAL_CAREERS = [
  "Data Entry Operator", "Graphic Designer", "Video Editor", "Accounts Assistant",
];

const FAQS = [
  { q: "Do you provide practical training?",   a: "Yes. All major courses include practical hands-on sessions with real software tools." },
  { q: "Will I receive a certificate?",         a: "Yes. Students receive a recognized course completion certificate after successfully completing the program." },
  { q: "Do you provide career guidance?",       a: "Yes. We support students with career guidance and job-oriented training support." },
  { q: "Can beginners join your courses?",      a: "Yes. Many programs are designed for beginners and start from fundamentals." },
];

const TESTIMONIALS = [
  { name: "Sowjanya",   course: "Photoshop",           rating: 5, location: "Belthangady", text: "I have successfully completed my photoshop course in this institution. I'm so happy with the training and the trainers. the teaching way is so polite. I highly recommend this institution to anyone who looking forward to improve their computer skills." },
  { name: "Rinwaz",    course: "Advance excel + Tally ERP", rating: 5, location: "Belthangady",   text: "I have completed my Advance excel + Tally ERP 9.I am truly grateful to sir and staff for excellent teaching and experience is very good. It is the best training centre. The faculty is knowledgeable and explains concept in simple and understanding. faculty are very friendly. This course was very helpful for my future. The classroom is comfortable with faculty. Honestly Gurukula education is usefull to everyone's. So I suggest everyone who's reading this to join Gurukula computer education class.Thank you for your support and guidance" },
  { name: "Mohammed Irfan", course: "Tally with GST",      rating: 5, location: "Ujire",       text: "The Tally course was very detailed and practical. I learned everything about GST entries and accounting. The certificate helped me get an accounts assistant job quickly." },
  { name: "Divya Poojary",  course: "ADCA + AI",           rating: 5, location: "Belthangady", text: "Very good institute with experienced teachers. I joined knowing nothing about computers and completed ADCA in 6 months. The AI tools training was a great bonus — very useful for office work." },
  { name: "Suresh Kumar",   course: "Video Editing + AI",  rating: 5, location: "Dharmasthala",text: "Learned Premiere Pro and After Effects professionally here. The trainer is very knowledgeable. I now do freelance video editing and YouTube content for local businesses." },
  { name: "Kavitha Rao",    course: "COA + AI",            rating: 5, location: "Belthangady", text: "Perfect course for beginners. I joined after 12th and learned MS Office, internet skills and AI tools in 3 months. The government certificate gave me an edge in job interviews." },
];

const WHY_ITEMS = [
  { icon: "🧑‍🏫", title: "Experienced Trainers",         desc: "Learn from skilled professionals with real-world industry experience in every subject."        },
  { icon: "💻",    title: "Practical Hands-on Training",  desc: "Every class is built around real software tools — not just theory and slides."                  },
  { icon: "📊",    title: "Industry-Relevant Courses",    desc: "Curriculum designed to match what employers and the market actually need today."                  },
  { icon: "🖥️",   title: "Modern Learning Environment",  desc: "Well-equipped computer lab with the latest software and modern learning tools."                   },
  { icon: "🎯",    title: "Job-Oriented Programs",        desc: "Every course is structured to give you real, employable skills from day one."                     },
  { icon: "📜",    title: "Govt. Authorized Certificate", desc: "Receive an officially recognized certificate trusted by employers across all industries."          },
  { icon: "🤝",    title: "Personalized Attention",       desc: "Small batches ensure every student gets individual focus, guidance and support."                   },
  { icon: "💰",    title: "Affordable Course Fees",       desc: "Quality digital education at fees that are accessible to every student in the region."            },
  { icon: "🚀",    title: "Skill Development Focus",      desc: "We build skills that translate directly to real workplace performance and career outcomes."        },
];

// const MARQUEE_TOOLS = [
//   "MS Office","Tally Prime","Adobe Photoshop","Illustrator",
//   "CorelDraw","After Effects","Premiere Pro","Power BI",
//   "Tableau","AutoCAD","Python","HTML & CSS",
// ];

// ── HOOKS ──────────────────────────────────────────────────────────────────
function useReduceMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const fn = () => setRm(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return rm;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useMousePos() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => setPos({
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return pos;
}

function useReveal(deps = []) {
  const [visible, setVisible] = useState({});
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible((p) => ({ ...p, [entry.target.dataset.reveal]: true }));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, ...deps]);

  const revealed = (key, delay = "0ms") => ({
    "data-reveal": key,
    style: reduceMotion ? {} : {
      opacity:    visible[key] ? 1 : 0,
      transform:  visible[key] ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.65s ease ${delay}, transform 0.65s ease ${delay}`,
    },
  });

  return { visible, revealed };
}

// ── TILT HELPER ────────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 18,
      y: ((e.clientY - r.top)  / r.height - 0.5) * -18,
    });
  }, []);
  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);
  return { ref, tilt, onMove, onLeave };
}

// ── STAR RATING ────────────────────────────────────────────────────────────
function Stars({ n = 5, size = 14, color = "#F97316" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 16 16" fill={color}>
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z"/>
        </svg>
      ))}
    </div>
  );
}

// ── CARD TILT HANDLERS ─────────────────────────────────────────────────────
const cardTiltProps = {
  onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 8;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -8;
    e.currentTarget.style.transform = `translateY(-8px) rotateY(${x}deg) rotateX(${y}deg)`;
  },
  onMouseLeave(e) {
    e.currentTarget.style.transform = "translateY(0) rotateY(0deg) rotateX(0deg)";
  },
};

// ── GLOBAL STYLES ──────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

  .font-display { font-family: 'DM Serif Display', Georgia, serif; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px) translateZ(40px); }
    50%      { transform: translateY(-10px) translateZ(40px); }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 220; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pingLoop {
    75%,100% { transform: scale(2); opacity: 0; }
  }
  @keyframes spinSlow {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; }
    50%      { opacity:.5; }
  }

  .anim-fadeInUp    { animation: fadeInUp    0.7s ease both; }
  .anim-fadeInUp-1  { animation: fadeInUp    0.7s ease 0.1s both; }
  .anim-fadeInUp-2  { animation: fadeInUp    0.7s ease 0.2s both; }
  .anim-fadeInUp-3  { animation: fadeInUp    0.7s ease 0.3s both; }
  .anim-fadeInUp-4  { animation: fadeInUp    0.7s ease 0.4s both; }
  .anim-fadeInUp-5  { animation: fadeInUp    0.7s ease 0.5s both; }
  .anim-fadeInUp-6  { animation: fadeInUp    0.7s ease 0.6s both; }
  .anim-fadeInUp-75 { animation: fadeInUp    0.7s ease 0.75s both; }
  .anim-fadeInRight { animation: fadeInRight 0.9s ease 0.3s both; }
  .anim-float       { animation: floatY      4s ease-in-out infinite; }
  .anim-float-2     { animation: floatY      5s ease-in-out 1s infinite; }
  .anim-marquee     { animation: marqueeScroll 28s linear infinite; }
  .anim-ping        { animation: pingLoop    1.5s cubic-bezier(0,0,0.2,1) infinite; }
  .anim-pulse       { animation: pulse       2s ease-in-out infinite; }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Smooth expand for FAQ */
  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.4s ease, opacity 0.35s ease;
  }
  .faq-body.open {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .faq-inner { overflow: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  /* Perspective on tilt containers */
  .perspective { perspective: 1000px; }

  /* Mobile touch improvements */
  @media (max-width: 768px) {
    .tilt-card:hover { transform: none !important; }
  }

  /* Course card image zoom */
  .course-img { transition: transform 0.5s ease; }
  .course-card:hover .course-img { transform: scale(1.08); }
`;

// ── SECTION HEADER ─────────────────────────────────────────────────────────
function SectionHeader({ badge, title, highlight, subtitle, center = true, accent = "orange" }) {
  return (
    <div className={center ? "text-center" : ""}>
      <div className={`inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest`}>
        {badge}
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
        {title}{" "}
        {highlight && <span className="text-blue-700">{highlight}</span>}
      </h2>
      <div className={`w-12 h-1 ${accent === "orange" ? "bg-orange-500" : "bg-blue-700"} rounded-full ${center ? "mx-auto" : ""} mt-4 mb-5`} />
      {subtitle && (
        <p className={`text-lg text-slate-500 leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── COURSE MODAL ───────────────────────────────────────────────────────────
function CourseModal({ course, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:rounded-3xl sm:max-w-2xl overflow-hidden shadow-2xl max-h-[95dvh] flex flex-col"
        style={{ animation: "fadeInUp 0.3s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE HEADER */}
        <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0">
          <img
            src={course.image || "/images/hero.jpg"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
            aria-label="Close"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">{course.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">⏱ {course.duration}</span>
              {course.price && <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{course.price}</span>}
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">⭐ {course.rating || "4.5"}</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          <p className="text-slate-600 text-sm leading-relaxed">{course.description}</p>

          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 text-xs">📚</span>
              What You Will Learn
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {course.learn.map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                  <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-xs text-blue-900 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {course.careers && (
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 text-xs">💼</span>
                Career Opportunities
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.careers.map((item) => (
                  <span key={item} className="bg-orange-50 border border-orange-100 text-orange-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER CTA */}
        <div className="flex-shrink-0 border-t border-slate-100 p-4 flex gap-3 bg-white">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Close
          </button>
          <a
            href="https://wa.me/916366564639"
            target="_blank"
            rel="noreferrer"
            className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 transition-all hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Apply via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── LIGHTBOX ───────────────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={onClose} aria-label="Close">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.caption} className="w-full max-h-[80dvh] object-contain rounded-2xl shadow-2xl" style={{ animation: "fadeInUp 0.2s ease both" }}/>
        <div className="mt-3 text-center">
          <p className="text-white font-semibold text-sm sm:text-base">{photo.caption}</p>
          <p className="text-white/40 text-xs sm:text-sm mt-1">{photo.index + 1} / {PHOTOS.length}</p>
        </div>
      </div>
      <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all hover:scale-110" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// HOME COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [openFaq, setOpenFaq]           = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lightbox, setLightbox]         = useState(null);
  const [counted, setCounted]           = useState(false);
  const [counts, setCounts]             = useState({ courses: 0, students: 0, years: 0 });

  const reduceMotion = useReduceMotion();
  const scrollY      = useScrollY();
  const mousePos     = useMousePos();
  const heroTilt     = useTilt();
  const { visible, revealed } = useReveal([activeCategory]);

  // ── COUNT-UP ──────────────────────────────────────────────────────────
  const statsRef = useRef(null);
  useEffect(() => {
    if (counted) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setCounted(true);
      const targets = { courses: 15, students: 100, years: 1 };
      const steps = 60;
      let step = 0;
      const id = setInterval(() => {
        step++;
        const ease = 1 - Math.pow(1 - step / steps, 3);
        setCounts({
          courses:  Math.round(targets.courses  * ease),
          students: Math.round(targets.students * ease),
          years:    Math.round(targets.years    * ease),
        });
        if (step >= steps) clearInterval(id);
      }, 1800 / steps);
    }, { threshold: 0.3 });
    if (statsRef.current) io.observe(statsRef.current);
    return () => io.disconnect();
  }, [counted]);

  // ── COURSE FILTERING ──────────────────────────────────────────────────
  const courseCategories = ["All", ...new Set(COURSES.map(c => c.category)), "Individual Courses"];
  const visibleCategories = useMemo(() => {
    if (activeCategory === "All") return [...new Set(COURSES.map(c => c.category))];
    if (activeCategory === "Individual Courses") return [];
    return [activeCategory];
  }, [activeCategory]);

  // ── LIGHTBOX NAVIGATION ───────────────────────────────────────────────
  const lbNext  = useCallback(() => { if (!lightbox) return; const n = (lightbox.index + 1) % PHOTOS.length; setLightbox({ ...PHOTOS[n], index: n }); }, [lightbox]);
  const lbPrev  = useCallback(() => { if (!lightbox) return; const n = (lightbox.index - 1 + PHOTOS.length) % PHOTOS.length; setLightbox({ ...PHOTOS[n], index: n }); }, [lightbox]);
  const lbClose = useCallback(() => setLightbox(null), []);

  // ── SCROLL PROGRESS ───────────────────────────────────────────────────
  const progress = scrollY / Math.max((typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1), 1) * 100;

  return (
    <div className="bg-slate-50 text-slate-900">
      <style>{GLOBAL_CSS}</style>
      <Navbar />

      {/* ── PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 z-[100] h-[3px] w-full pointer-events-none">
        <div className="h-full bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 transition-none" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section 
        id="home" 
        className="scroll-mt-24 relative overflow-hidden bg-slate-50 px-4 pt-20 pb-24 md:px-8"
      >

          {/* BACKGROUND BLOBS */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-100 opacity-50 blur-3xl transition-transform duration-700"
            style={{ transform: reduceMotion ? "none" : `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-40 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-orange-100 opacity-40 blur-3xl transition-transform duration-700"
            style={{ transform: reduceMotion ? "none" : `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-violet-100 opacity-25 blur-3xl transition-transform duration-700"
            style={{ transform: reduceMotion ? "translate(-50%,-50%)" : `translate(calc(-50% + ${mousePos.x * 10}px), calc(-50% + ${mousePos.y * 10}px))` }}
          />

          {/* FLOATING PARTICLES — hidden on mobile */}
          {!reduceMotion && [
            { s: 6, t: "15%", l: "8%",  d: "0s",   c: "bg-blue-400"   },
            { s: 4, t: "70%", l: "5%",  d: "0.8s", c: "bg-orange-400" },
            { s: 5, t: "25%", l: "88%", d: "0.4s", c: "bg-violet-400" },
            { s: 3, t: "80%", l: "85%", d: "1.2s", c: "bg-blue-300"   },
            { s: 4, t: "45%", l: "90%", d: "0.6s", c: "bg-orange-300" },
            { s: 6, t: "10%", l: "55%", d: "1s",   c: "bg-green-300"  },
          ].map((p, i) => (
            <div
              key={i}
              className={`pointer-events-none absolute rounded-full ${p.c} opacity-40 hidden sm:block`}
              style={{
                width: p.s * 4,
                height: p.s * 4,
                top: p.t,
                left: p.l,
                animation: `pulse 3s ease-in-out ${p.d} infinite`,
              }}
            />
          ))}

          {/* MAIN GRID */}
          <div
            className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            style={reduceMotion ? {} : {
              transform: typeof window !== "undefined" && window.innerWidth >= 1024
                ? `translateY(${scrollY * 0.1}px)`
                : "none",
              transition: "transform 0.1s linear",
            }}
          >

            {/* LEFT */}
            <div className="w-full min-w-0">

              {/* TOP BADGE */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 sm:px-4 py-1.5 text-xs font-semibold text-blue-700 anim-fadeInUp">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-orange-500 anim-pulse" />
                <span>Belthangady's Leading Computer Institute</span>
              </div>

              {/* HEADING */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 anim-fadeInUp-1">
                Build Your Career With{" "}
                <span className="text-blue-700 relative inline-block">
                  Digital Skills
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 3 Q100 0 200 3"
                      stroke="#f97316"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 220,
                        strokeDashoffset: 0,
                        animation: "drawLine 1s ease 0.9s both",
                      }}
                    />
                  </svg>
                </span>
              </h1>

              {/* SUBTITLE */}
              <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed anim-fadeInUp-3">
                Professional computer training in Belthangady — Computer Applications,
                Graphic Design, Accounting, Data Analytics and Artificial Intelligence.
              </p>

              {/* TRUST PILLS */}
              <div className="mt-6 flex flex-wrap gap-2 anim-fadeInUp-4">
                {[
                  { text: "✔ Practical Training",    cls: "border-blue-200   bg-blue-50   text-blue-800"   },
                  { text: "✔ Industry Courses",      cls: "border-green-200  bg-green-50  text-green-800"  },
                  { text: "✔ Job Oriented",          cls: "border-orange-200 bg-orange-50 text-orange-800" },
                  { text: "✔ E-Max India Certified", cls: "border-violet-200 bg-violet-50 text-violet-800" },
                ].map((pill) => (
                  <span
                    key={pill.text}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold cursor-default ${pill.cls}`}
                  >
                    {pill.text}
                  </span>
                ))}
              </div>

              {/* ══════════════════════════════════════════
                  WORLD'S FIRST AI CARD — BIG BANNER
              ══════════════════════════════════════════ */}
              <div className="mt-7 anim-fadeInUp-5">
                <a
                  href="https://www.yaticorp.com/ai-card"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-stretch rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-orange-200"
                  style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fff3e0 50%, #fef9f0 100%)" }}
                >
                  {/* shimmer sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />

                  {/* LEFT accent column */}
                  <div
                    className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 px-4 sm:px-5 py-5"
                    style={{ background: "linear-gradient(180deg, #f59e0b 0%, #ea580c 100%)" }}
                  >
                    {/* globe icon */}
                    <span className="text-3xl sm:text-4xl drop-shadow-sm">🌍</span>
                    {/* vertical text label */}
                    <div className="flex flex-col items-center gap-0.5 mt-1">
                      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/90">World's</span>
                      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/90">First</span>
                    </div>
                  </div>

                  {/* MAIN content */}
                  <div className="flex-1 min-w-0 px-4 sm:px-5 py-4 flex flex-col justify-center gap-2">

                    {/* badge row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap tracking-wide">
                        ✨ Exclusive
                      </span>
                      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap tracking-wide">
                        🆕 New Launch
                      </span>
                    </div>

                    {/* headline */}
                    <div>
                      <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                        AI Card
                      </p>
                      <p className="text-sm sm:text-base font-bold text-orange-600 leading-tight">
                        Now Available at Gurukula
                      </p>
                    </div>

                    {/* description */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Unlock <span className="font-bold text-slate-700">50+ AI tools</span>, exclusive benefits &amp; digital resources with every course enrollment.
                    </p>

                    {/* CTA link */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-orange-600 group-hover:underline underline-offset-2">
                        Learn More
                      </span>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        className="text-orange-500 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                      <span className="text-xs text-slate-300 mx-1">|</span>
                      <span className="text-xs font-semibold text-slate-500">Activate Today</span>
                    </div>
                  </div>

                  {/* RIGHT arrow column */}
                  <div
                    className="flex-shrink-0 w-9 sm:w-10 flex items-center justify-center"
                    style={{ background: "linear-gradient(180deg, #f59e0b 0%, #ea580c 100%)" }}
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5"
                      className="group-hover:translate-x-0.5 transition-transform duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>

                </a>
              </div>

              {/* CTA BUTTONS */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 anim-fadeInUp-6">
                <a
                  href="https://wa.me/916366564639"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-sm text-center transition-all duration-300 hover:shadow-orange-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="relative z-10">WhatsApp Enquiry</span>
                  <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <a
                  href="#courses"
                  className="group rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-bold text-slate-800 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300 text-center hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore Courses
                  <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* STAT COUNTER */}
              <div
                ref={statsRef}
                className="mt-8 grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm anim-fadeInUp-75"
              >
                {[
                  { num: counts.courses,  suffix: "+", label: "Courses"    },
                  { num: counts.students, suffix: "+", label: "Students"   },
                  { num: counts.years,    suffix: "+", label: "Years Exp." },
                ].map((s) => (
                  <div key={s.label} className="py-4 text-center hover:bg-blue-50 transition-colors duration-300">
                    <p className="text-2xl sm:text-3xl font-black text-blue-900 tabular-nums">{s.num}{s.suffix}</p>
                    <p className="mt-1 text-xs text-slate-500 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — 3D TILT IMAGE */}
            <div
              ref={heroTilt.ref}
              className="relative mt-10 lg:mt-0 cursor-default perspective anim-fadeInRight"
              onMouseMove={heroTilt.onMove}
              onMouseLeave={heroTilt.onLeave}
            >
              <div
                style={{
                  transform: reduceMotion
                    ? "none"
                    : `rotateY(${heroTilt.tilt.x}deg) rotateX(${heroTilt.tilt.y}deg) scale(${(heroTilt.tilt.x || heroTilt.tilt.y) ? 1.02 : 1})`,
                  transition: "transform 0.15s ease",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="mt-4 ml-4 lg:mt-0 lg:ml-0">
                  <img
                    src="/images/hero.jpg"
                    alt="Computer Training at Gurukula"
                    className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]"
                    style={{ transform: "translateZ(20px)" }}
                    loading="eager"
                  />
                </div>

                {/* floating badge — bottom left */}
                <div
                  className="absolute bottom-0 left-0 sm:-left-4 translate-y-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xl anim-float"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <p className="text-xs sm:text-sm font-bold text-slate-900">AI • Design • Accounting • IT</p>
                  <div className="mt-2 flex gap-1.5">
                    {["bg-blue-600", "bg-orange-500", "bg-green-600", "bg-violet-600"].map((c) => (
                      <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
                    ))}
                  </div>
                </div>

                {/* floating badge — top left */}
                <div
                  className="absolute top-0 left-0 sm:-left-4 -translate-y-3 rounded-xl border border-slate-100 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-lg text-xs font-bold text-slate-700 anim-float-2"
                  style={{ transform: "translateZ(50px)" }}
                >
                  🎓 100+ Students Trained
                </div>

                {/* floating badge — top right: AI Card */}
                <div
                  className="absolute top-0 right-0 sm:-right-4 -translate-y-3 rounded-xl overflow-hidden shadow-xl anim-float"
                  style={{
                    transform: "translateZ(55px)",
                    animationDelay: "0.7s",
                    background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                  }}
                >
                  <div className="px-3 sm:px-4 py-2 sm:py-3 text-white">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">World's First</p>
                    <p className="text-sm sm:text-base font-black leading-tight">🌍 AI Card</p>
                    <p className="text-[9px] sm:text-[10px] text-white/75 font-semibold mt-0.5 leading-tight">Activate Now →</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      {/* ── MARQUEE ── */}
      {/* <div className="relative overflow-hidden bg-blue-700 py-3.5 border-y border-blue-800">
        <div className="flex anim-marquee whitespace-nowrap gap-0 will-change-transform">
          {[...MARQUEE_TOOLS, ...MARQUEE_TOOLS, ...MARQUEE_TOOLS].map((tool, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 sm:px-8 text-sm font-semibold text-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              {tool}
            </span>
          ))}
        </div>
      </div> */}

      {/* ════════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════════ */}
      <section id="about" className="bg-white py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <div className="anim-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                🏫 Est. Belthangady
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                About <span className="text-blue-700">Gurukula</span>
              </h2>
              <div className="mt-4 w-12 h-1 bg-orange-500 rounded-full" />
              <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed">
                Gurukula Computer Training Centre is a professional computer education institute dedicated to delivering quality training in computer technology, digital skills, and modern software tools — empowering students for the digital age.
              </p>
              <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                We combine theoretical knowledge with practical hands-on learning across Computer Applications, Office Automation, Tally, Graphic Design, Video Editing, AI and Data Analytics.
              </p>

              {/* quick stats row */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: "🎓", val: "100+", lab: "Students" },
                  { icon: "📚", val: "15+",   lab: "Courses"  },
                  { icon: "⭐", val: "4.9",   lab: "Rating"   },
                ].map((s) => (
                  <div key={s.lab} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <p className="text-xl font-black text-slate-900">{s.val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.lab}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — 3D image */}
            <div className="relative perspective anim-fadeInRight"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
                const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
                e.currentTarget.querySelector(".tilt-inner").style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector(".tilt-inner").style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
              }}
            >
              <div className="tilt-inner" style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}>
                <img src="/images/about.jpg" alt="Gurukula Computer Training Centre"
                  className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]" style={{ transform: "translateZ(10px)" }} loading="lazy" />
                <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl anim-float" style={{ transform: "translateZ(40px)" }}>
                  <p className="text-xs text-slate-500 font-semibold">✅ Certified Institute</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-orange-500 rounded-2xl px-4 py-3 shadow-lg anim-float-2" style={{ transform: "translateZ(50px)" }}>
                  <p className="text-sm font-bold text-white">⭐ 4.8 Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          VISION & MISSION
      ════════════════════════════════════════════════════════════════ */}
      <section id="vision-mission" className="scroll-mt-24 py-20 sm:py-24 px-4 sm:px-8 bg-slate-50 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14 anim-fadeInUp">
            <SectionHeader badge="🌟 Our Purpose" title="Vision &" highlight="Mission"
              subtitle="Empowering students with digital skills, practical knowledge and career-oriented training for the modern world." />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* VISION */}
            <div className="group relative overflow-hidden rounded-3xl p-8 sm:p-11 text-white cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}
              {...cardTiltProps}>
              <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-2xl mb-5 border border-white/10">🎯</div>
                <h3 className="text-2xl sm:text-3xl font-black mb-2">Our Vision</h3>
                <div className="w-10 h-1 bg-orange-400 rounded-full mb-5" />
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                  To become a trusted and leading computer training institute that empowers students with digital knowledge, technical skills, and innovative thinking — creating skilled professionals ready for the modern technology-driven world.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-semibold text-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Leading Digital Education
                </div>
              </div>
            </div>

            {/* MISSION */}
            <div className="group relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 sm:p-11 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200"
              {...cardTiltProps}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl mb-5">🚀</div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Our Mission</h3>
                <div className="w-10 h-1 bg-blue-700 rounded-full mb-5" />
                <ul className="space-y-3">
                  {[
                    "Provide high-quality computer education with practical training.",
                    "Help students develop industry-relevant digital skills.",
                    "Introduce modern technologies such as Artificial Intelligence and Data Analytics.",
                    "Support students with career guidance and job-oriented training.",
                    "Create opportunities for students to build successful careers.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CORE VALUES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "💡", title: "Innovation",  desc: "Embracing new technologies every day"        },
              { icon: "🤝", title: "Integrity",   desc: "Honest and transparent education always"     },
              { icon: "🏆", title: "Excellence",  desc: "Striving for the highest quality training"   },
            ].map((v) => (
              <div key={v.title} className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 sm:px-6 py-5 hover:border-blue-200 hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-3xl flex-shrink-0">{v.icon}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{v.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════════════════════════════════ */}
      <section id="why-choose-us" className="scroll-mt-24 py-20 sm:py-24 px-4 sm:px-8 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-35" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14" {...revealed("why-hdr")}>
            <SectionHeader badge="⭐ Why Choose Us" title="Why Students Choose" highlight="Gurukula"
              subtitle="Practical training, industry-relevant courses and career-oriented learning to help students succeed in the digital world." />
          </div>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ITEMS.map((item, i) => (
              <div key={item.title}
                {...revealed(`why-${i}`, `${i * 50}ms`)}
                className="group relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200"
                {...cardTiltProps}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="absolute top-5 right-5 w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-700 flex items-center justify-center transition-colors duration-300">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors duration-300">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-700 flex items-center justify-center text-2xl mb-4 transition-colors duration-300">{item.icon}</div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 pr-8">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA BANNER */}
          <div className="mt-8 relative overflow-hidden rounded-2xl px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-lg sm:text-xl font-black text-white">Ready to start your digital career?</p>
              <p className="text-sm text-blue-200 mt-1">Join 100+ students already trained at Gurukula</p>
            </div>
            <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
              className="relative z-10 flex-shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base whitespace-nowrap">
              WhatsApp Enquiry →
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50" />

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="text-center mb-10 sm:mb-14" {...revealed("test-hdr")}>
            <SectionHeader
              badge="⭐ Student Reviews"
              title="What Our"
              highlight="Students Say"
              subtitle="Hear from students who trained at Gurukula and built successful careers in the digital world."
            />
          </div>

          {/* CARDS — single column on mobile, grid on sm+ */}
          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                {...revealed(`test-${i}`, `${i * 80}ms`)}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-xl transition-all duration-300 cursor-default w-full"
                {...cardTiltProps}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="relative z-10">

                  {/* STARS */}
                  <Stars n={t.rating} />

                  {/* REVIEW TEXT */}
                  <div className="mt-4 mb-5">
                    <p className="text-slate-600 text-sm leading-relaxed">{t.text}</p>
                  </div>

                  {/* AUTHOR ROW */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {/* avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>

                    {/* name + course */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">{t.name}</p>
                      <p className="text-xs text-slate-500 truncate">{t.course} · {t.location}</p>
                    </div>

                    {/* verified badge — shrinks gracefully */}
                    <span className="flex-shrink-0 text-xs font-semibold bg-green-50 text-green-700 border border-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                      ✓ Verified
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* RATING SUMMARY */}
          <div
            {...revealed("test-summary", "200ms")}
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white border border-slate-200 rounded-2xl px-4 sm:px-8 py-6"
          >
            {[
              { val: "4.9",  label: "Overall Rating",    extra: <Stars size={12} /> },
              { val: "100+", label: "Students Trained"   },
              { val: "98%",  label: "Satisfaction Rate"  },
              { val: "1+",   label: "Years of Excellence"},
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-4xl font-black text-slate-900">{s.val}</p>
                {s.extra && <div className="flex justify-center mt-1">{s.extra}</div>}
                <p className="text-xs text-slate-500 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          GALLERY
      ════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="scroll-mt-24 bg-white py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-35" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14" {...revealed("gallery-hdr")}>
            <SectionHeader badge="📸 Our Campus" title="Life at" highlight="Gurukula"
              subtitle="A glimpse into our modern labs, hands-on training sessions and student life at Gurukula Computer Training Centre." />
          </div>

          {/* MASONRY */}
          <div {...revealed("gallery-grid")} className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {PHOTOS.map((photo, i) => (
              <div key={i}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-slate-200 cursor-zoom-in"
                onClick={() => setLightbox({ ...photo, index: i })}>
                <img src={photo.src} alt={photo.caption} loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${photo.tall ? "h-72" : "h-48"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-between p-4">
                  <span className="text-white text-xs sm:text-sm font-semibold">{photo.caption}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                      <path strokeLinecap="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          COURSES
      ════════════════════════════════════════════════════════════════ */}
      <section id="courses" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -z-10 bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12" {...revealed("courses-hdr")}>
            <SectionHeader badge="📚 Our Programs" title="Explore Our" highlight="Professional Courses"
              subtitle="Diploma, certificate, design, AI and software training programs built for real career growth." />
          </div>

          {/* AI CARD BANNER */}
          <div className="mb-10 relative overflow-hidden rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            style={{ background: "linear-gradient(135deg,#042C53 0%,#185FA5 60%,#378ADD 100%)" }}>
            <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 mb-3 rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-orange-950">✨ New</span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">Get Your AI Card</h3>
              <p className="mt-2 text-xs sm:text-sm text-blue-200 max-w-sm leading-relaxed">
                Unlock exclusive AI learning benefits, tools and resources. Activate today and power up your digital journey.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3 flex-shrink-0">
              <a href="https://www.yaticorp.com/activate-ai-card" target="_blank" rel="noreferrer"
                className="rounded-xl bg-orange-400 px-5 py-2.5 font-bold text-orange-950 text-sm whitespace-nowrap transition-all hover:bg-orange-300 hover:-translate-y-0.5">
                Activate AI Card
              </a>
              <a href="https://www.yaticorp.com/AI-Card" target="_blank" rel="noreferrer"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 font-bold text-white text-sm whitespace-nowrap transition-all hover:bg-white/20 hover:-translate-y-0.5">
                Know More →
              </a>
            </div>
          </div>

          {/* CATEGORY FILTER — horizontally scrollable on mobile */}
          <div className="mb-10 -mx-4 sm:mx-0 overflow-x-auto pb-2">
            <div className="flex min-w-max gap-2.5 px-4 sm:px-0">
              {courseCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* COURSE CATEGORIES */}
          {visibleCategories.map((category) => {
            const catCourses = COURSES.filter(c => c.category?.toLowerCase().trim() === category.toLowerCase().trim());
            return (
              <div key={category} className="mb-14">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 whitespace-nowrap">{category}</h3>
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                    {catCourses.length} course{catCourses.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {catCourses.map((course, i) => (
                    <article key={course.id}
                      className="course-card group relative rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200"
                      style={{ animation: `fadeInUp 0.4s ease ${i * 0.06}s both` }}
                      {...cardTiltProps}>
                      {/* IMAGE */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={course.image || "/images/hero.jpg"} 
                          alt={course.title} 
                          loading="lazy"
                          className="course-img w-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                          ⭐ {course.rating || "4.5"}
                        </div>
                        {course.popular && (
                          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">🔥 Popular</div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Flexible Learning
                        </div>
                      </div>

                      {/* BODY */}
                      <div className="p-4 sm:p-5">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug mb-3 line-clamp-2">{course.title}</h4>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">⏱ {course.duration}</span>
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-md font-medium">🎓 Certificate</span>
                          {course.price && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md font-semibold border border-green-100">{course.price}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
                            className="rounded-xl bg-orange-500 py-2.5 text-xs font-bold text-white text-center hover:bg-orange-600 transition-all hover:shadow-md hover:shadow-orange-100 active:scale-95">
                            Apply Now
                          </a>
                          <button onClick={() => setSelectedCourse(course)}
                            className="rounded-xl border border-blue-600 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-700 hover:text-white transition-all active:scale-95">
                            Know More
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          {/* INDIVIDUAL COURSES */}
          {(activeCategory === "All" || activeCategory === "Individual Courses") && (
            <div {...revealed("individual")}
              className="relative overflow-hidden rounded-2xl border border-slate-200 p-6 sm:p-10"
              style={{ background: "linear-gradient(135deg,#F8FAFC 0%,#EFF6FF 100%)" }}>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🛠️</div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Individual Courses</h3>
                </div>
                <p className="text-slate-500 text-sm mb-8 ml-13">Learn specific software quickly — flexible, focused and affordable.</p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">Courses Available</p>
                    <div className="grid grid-cols-1 gap-2">
                      {INDIVIDUAL_COURSES.map((c) => (
                        <div key={c} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700 font-medium">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Career Opportunities</p>
                    <div className="grid grid-cols-1 gap-2">
                      {INDIVIDUAL_CAREERS.map((c) => (
                        <div key={c} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-default">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700 font-medium">{c}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
                      className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-green-600 py-3 font-bold text-white text-sm hover:bg-green-700 transition-all hover:-translate-y-0.5">
                      💬 Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-24 px-4 py-20 sm:py-24 sm:px-8 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50" />

        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start mb-12">
            {/* LEFT */}
            <div {...revealed("faq-hdr")}>
              <SectionHeader badge="❓ FAQ" title="Frequently Asked" highlight="Questions"
                subtitle="Everything you need to know about our courses, certificates and training. Can't find an answer? Chat with us directly."
                center={false} />
            </div>

            {/* RIGHT — contact card */}
            <div className="rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-3">Still have questions?</p>
                <h3 className="text-lg sm:text-xl font-black text-white mb-2">Talk to our team</h3>
                <p className="text-xs sm:text-sm text-blue-200 leading-relaxed mb-6">We're happy to answer any questions about admissions, courses, fees and schedules.</p>
                <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* FAQ ITEMS */}
          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q}
                  {...revealed(`faq-${i}`, `${i * 60}ms`)}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-blue-200 shadow-lg shadow-blue-50 bg-white" : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-md"
                  }`}>
                  <button
                    className="flex w-full items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${isOpen ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="flex-1 font-bold text-slate-900 text-sm sm:text-base leading-snug">{item.q}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xl font-light transition-all duration-300 ${isOpen ? "bg-blue-50 text-blue-700 rotate-45" : "bg-slate-100 text-slate-400"}`}>+</div>
                  </button>
                  <div className={`faq-body ${isOpen ? "open" : ""}`}>
                    <div className="faq-inner">
                      <div className="px-4 sm:px-6 pb-5 pl-16 sm:pl-[4.5rem]">
                        <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="scroll-mt-24 bg-slate-50 px-4 py-20 sm:py-24 sm:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute -z-10 -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="pointer-events-none absolute -z-10 -bottom-20 -right-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-12" {...revealed("contact-hdr")}>
            <SectionHeader badge="📍 Find Us" title="Contact" highlight="Us"
              subtitle="Visit us at our Belthangady campus or reach out via WhatsApp — we're always happy to help with admissions and course queries."
              center={false} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT — info */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "🏫", label: "Institute", value: "Gurukula Computer Training Centre" },
                { icon: "📞", label: "Phone",     value: "6366564639" },
                { icon: "📍", label: "Address",   value: "Shri Gurusanidhya Building, Near Bharat Petrol Pump, Belthangady – 574214" },
              ].map((info) => (
                <div key={info.label}
                  className="group flex items-start gap-4 bg-white border border-slate-200 rounded-2xl px-4 sm:px-5 py-4 hover:border-blue-200 hover:bg-blue-50 hover:translate-x-1 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-700 flex items-center justify-center text-lg flex-shrink-0 transition-colors duration-300">{info.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-sm font-bold text-slate-900 leading-snug break-words">{info.value}</p>
                  </div>
                </div>
              ))}

              {/* HOURS */}
              <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white"
                style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#1D4ED8 100%)" }}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">🕐 Working Hours</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-200">Monday – Saturday</span>
                      <span className="text-sm font-bold text-white">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-200">Sunday</span>
                      <span className="text-sm font-bold text-red-300">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK CTA */}
              <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-200">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* RIGHT — MAP */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[380px] sm:min-h-[420px]">
              <iframe
                className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
                title="Gurukula Computer Training Centre location"
                src="https://maps.google.com/maps?q=belthangady&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-md flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="absolute inset-0 rounded-full bg-red-400 anim-ping opacity-75" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">Gurukula Computer</p>
                  <p className="text-xs text-slate-500">Belthangady, 574214</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FLOATING UI — WhatsApp + Back to top
      ════════════════════════════════════════════════════════════════ */}
      {/* WhatsApp FAB */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 group">
        <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none select-none">
          Chat with us 👋
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] anim-ping opacity-25" />
          <a href="https://wa.me/916366564639" target="_blank" rel="noreferrer" aria-label="WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center shadow-lg shadow-green-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-green-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Back to top */}
      {scrollY > 400 && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-5 z-50 w-11 h-11 rounded-full bg-slate-900 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ animation: "fadeInUp 0.3s ease both" }}
          aria-label="Back to top">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
          </svg>
        </button>
      )}

      {/* ── MODALS ── */}
      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      {lightbox && <Lightbox photo={lightbox} onClose={lbClose} onPrev={lbPrev} onNext={lbNext} />}

      <Footer />
    </div>
  );
}