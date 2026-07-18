import somaImg from "../assets/team/soma-sahai-srivastava.jpeg";
import leighImg from "../assets/team/leigh-ramos-platt.jpeg";
import jenniferImg from "../assets/team/jennifer_hui.jpeg";
import belindaImg from "../assets/team/belinda_f.jpeg";
import fernandoImg from "../assets/team/fernando_ibanhes.jpg";
import yaesshnaImg from "../assets/team/yaesshna_pillay.jpg"
import shobhnaImg from "../assets/team/shobhna_professional_pic.jpg";
import iraImg from "../assets/team/ira_chaturvedi.jpeg";
// import placeholderImg from "../assets/team/placeholder.jpg";

// ─── Team Data ────────────────────────────────────────────
// tier: "leadership" → larger cards (top row)
// tier: "team"       → smaller cards (bottom row)
//
// To update a bio: edit shortBio and/or fullBio below
// To add a photo:  drop the file in src/assets/team/ and import it above
// To add LinkedIn: uncomment the linkedin field and add the URL

export const team = [

  // ── Leadership ────────────────────────────────────────

  {
    name: "Soma Sahai-Srivastava, MD",
    role: "Founder & CEO",
    shortBio: "Neurologist, medical educator, and physician-leader with a deep commitment to global health equity.",
    fullBio: "Dr. Soma Sahai-Srivastava is a neurologist, medical educator, and physician-leader with a deep commitment to global health equity. With over two decades of experience at the University of Southern California (USC), she has served in multiple pivotal roles, including Vice Chair of Ambulatory Neurology. As a renowned headache specialist, she founded the UCNS-accredited USC Headache Fellowship in 2012 and built the comprehensive USC Headache and Neuralgia Center. Beyond her clinical practice in the United States, Dr. Sahai-Srivastava has dedicated her career to closing the global neurology gap. Since 2015, she has directed a global neuroscience program focused on medical education in Cambodia and Laos, and has served as a Visiting Professor for the International Headache Society in both nations. She founded Neurosciences for All to formalize and expand this mission, ensuring that healthcare providers in under-resourced regions have the specialized training and diagnostic tools necessary to treat neurological disorders effectively.",
    image: somaImg,
    tier: "leadership",
    // linkedin: "",
  },

  {
    name: "Leigh Maria Ramos-Platt, MD",
    role: "President",
    // NOTE: Bio sourced from public USC/CHLA profile — confirm with Dr. Ramos-Platt
    shortBio: "Clinical Professor of Neurology and Pediatrics at Keck School of Medicine, USC, and Medical Director of the Muscular Dystrophy Association Neuromuscular Clinic at Children's Hospital Los Angeles.",
    fullBio: "Dr. Leigh Maria Ramos-Platt is a Clinical Professor of Neurology and Pediatrics at the Keck School of Medicine, University of Southern California, and Medical Director of the Muscular Dystrophy Association Neuromuscular Clinic at Children's Hospital Los Angeles. Board certified in Neurology with Special Qualification in Child Neurology and Clinical Neurophysiology, she is a leading expert in pediatric neuromuscular diseases, including Duchenne Muscular Dystrophy and Spinal Muscular Atrophy. Dr. Ramos-Platt is widely recognized for her work in advancing gene therapy access and ensuring that families from all backgrounds can benefit from life-changing treatments. She is an active advocate for health equity in pediatric neurological care.",
    image: leighImg,
    tier: "leadership",
    // linkedin: "",
  },

  {
    name: "Jennifer S. Hui, MD",
    role: "Vice-President",
    shortBio: "Neurologist and Program Director for the Neurology Residency at USC, specializing in Movement Disorders and Parkinson's disease.",
    fullBio: "Dr. Jennifer S. Hui is a fellowship-trained Movement Disorders specialist and Program Director for the Neurology Residency at the Keck School of Medicine, University of Southern California. Her clinical and research focus includes the non-motor symptoms of Parkinson's disease and oversight of multiple clinical trials. The residency program she leads is based primarily at Los Angeles General Medical Center — the city's largest safety-net hospital — and is committed to addressing healthcare disparities in neurological care. In 2026–2027, the program will launch a structured Health Equity curriculum to expand access to neurologic care and accommodate growing community needs. Dr. Hui has supported resident participation in Neurosciences for All for the past ten years, sponsoring a growing number of residents and fellows dedicated to educational outreach in Cambodia and beyond.",
    image: jenniferImg,
    tier: "leadership",
    // linkedin: "",
  },

  {
    name: "Belinda Flournoy",
    role: "Chief Financial Officer / Treasurer",
    shortBio: "Founder of STEAM Wonderlabs & Young Innovators",
    fullBio: "Belinda Flournoy is an educator, advisor, and entrepreneur committed to helping students build confidence, achieve academic success, and develop a lifelong love of learning. She has supported school-age and college-bound students across multiple subjects and is recognized for the outstanding feedback she has received from learners and families for her personalized approach.Beyond education, Belinda is the founder of STEAM Wonderlabs & Young Innovators, a 501(c)(3) nonprofit focused on expanding access to high-quality STEAM learning opportunities for underserved youth. Her experience in education, advocacy, and community leadership strengthens her role as Treasurer and her dedication to advancing meaningful, mission-driven work.",
    image: belindaImg,
    tier: "leadership",
    // linkedin: "",
  },

  // ── Team Members ──────────────────────────────────────

  {
    name: "Yaesshna Pillay, MD",
    role: "Neurologist & Clinical Neurophysiology Fellow",
    // NOTE: Bio sourced from Doximity public profile — confirm with Dr. Pillay
    // NOTE: Foundation role/title to be confirmed
    shortBio: "Neurologist and Clinical Neurophysiology Fellow at USC/LA General Medical Center, with training from the University of Texas and University College Dublin.",
    fullBio: "Dr. Yaesshna Pillay is a Neurologist and Clinical Neurophysiology Fellow at the University of Southern California and Los Angeles General Medical Center. She completed her Neurology residency at the University of Texas Health Science Center San Antonio and her medical degree at University College Dublin. Her clinical focus is in neurophysiology, including the diagnosis and assessment of neurological conditions through electrodiagnostic studies.",
    image: yaesshnaImg,
    tier: "team",
    // linkedin: "",
  },

  {
    name: "Fernando Henrique Ibanhes, MD",
    role: "Director, Global Logistics and Education",
    shortBio: "Neurology resident and future Vascular Neurology Fellow at USC, dedicated to health equity and global capacity building in neurological education.",
    fullBio: "Dr. Fernando Henrique Ibanhes serves as the Director of Global Logistics and Education for Neurosciences for All. He is an Adult Neurology resident at the University of Southern California and Los Angeles General Medical Center, and a future Vascular Neurology Fellow. Driven by a deep commitment to health equity and global capacity building, he earned his MD and a Master of Science in Population Medicine from Brown University. His academic work explores how social determinants of health influence cerebrovascular outcomes and access to care in vulnerable populations. Internationally, Dr. Ibanhes acts as a Visiting Resident Instructor in Cambodia, where he leads neuroanatomy education for medical trainees and internal medicine residents. Recently awarded the USC Dhablania and Kim Family Global Medicine and Health Fellowship, he is dedicated to helping establish the first neurology residency program in Cambodia through accessible and innovative teaching tools.",
    image: fernandoImg,
    tier: "team",
    // linkedin: "",
  },

  {
    name: "Ira Chaturvedi",
    role: "Secretary",
    shortBio: "Medical student at USC Keck School of Medicine with a strong interest in global health and neurological care.",
    fullBio: "Ira Chaturvedi is a medical student at the Keck School of Medicine of the University of Southern California with a strong interest in global health and neurological care. She joined Neurosciences for All to support access to neurological education and contribute to improving global access to neurological care. Ira is committed to advancing health equity through education, collaboration, and service.",
    image: iraImg,
    tier: "team",
    // linkedin: "",
  },
  {
    name: "Shobhna Sinha",
    role: "Technical Lead",
    shortBio: "Full Stack Developer and AI Educator with a Master's in Computer Engineering from Santa Clara University, building full-stack platforms from concept to deployment.",
    fullBio: "Shobhna Sinha is a Full Stack Developer and AI Educator with a Master's in Computer Engineering from Santa Clara University. She designed and built the entire NeuroSciences For All platform, from the website itself to the member chat system, event infrastructure, and donation processing. Previously a Senior Web Developer at Unistor Networks, she now splits her time between independent development work and teaching mathematics and computer science to students from elementary through AP level. She brings the same commitment to precision and clarity to both.",
    image: shobhnaImg,
    tier: "team",
    linkedin: "https://www.linkedin.com/in/shobhna-s-5064551b0/",
  },

];
