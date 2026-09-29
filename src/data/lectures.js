// ─── Lecture Library ──────────────────────────────────────
// Add entries here once videos are uploaded to YouTube.
// youtubeId is just the part after "v=" or "youtu.be/" in the URL.
// Empty arrays automatically show a "Coming soon" state on the page.
// Optional `credit` field renders a small attribution line under the description —
// use it for videos sourced from a partner institution rather than filmed by NFA.

export const categoryMeta = {
    students: {
      title: "Students",
      description: "Foundational neuroscience lectures",
    },
    residents: {
      title: "Residents",
      description: "Clinical case-based lectures",
    },
    emg: {
      title: "EMG Resources",
      description: "EEG and neurophysiology diagnostics",
    },
  };

  export const lectures = {
    students: [
      {
        title: "Introduction to Neuroanatomy (2025 Edition)",
        description:
          "An updated walkthrough of core neuroanatomy concepts for medical students, presented by the NeuroSciences For All team.",
        youtubeId: "EHLMQ4LhPzk",
      },
      {
        title: "Introduction to Neuroanatomy",
        description:
          "A foundational walkthrough of core neuroanatomy concepts for medical students, presented by the NeuroSciences For All team.",
        youtubeId: "QmE7mDU8m68",
      },
      {
        title: "The Neurological Exam — Dr. Soma Sahai-Srivastava",
        description:
          "Dr. Soma Sahai-Srivastava demonstrates the neurological examination, part of NFA's student lecture series.",
        youtubeId: "Vd-j5zFJ0FE",
      },
      {
        title: "Limb Exam (With Annotation)",
        description:
          "A guided walkthrough of the limb neurological exam with on-screen annotations highlighting each step.",
        youtubeId: "ro04IEtaoCM",
        credit: "Courtesy of University of Health Sciences, Cambodia",
      },
      {
        title: "Limb Exam (Without Annotation)",
        description:
          "The same limb neurological exam without annotations — useful for self-testing and practice.",
        youtubeId: "M7RithboD2o",
        credit: "Courtesy of University of Health Sciences, Cambodia",
      },
      {
        title: "Cranial Nerves (With Annotation)",
        description:
          "A guided walkthrough of the cranial nerve exam with on-screen annotations highlighting each step.",
        youtubeId: "iLq7p0jhTDo",
        credit: "Courtesy of University of Health Sciences, Cambodia",
      },
      {
        title: "Cranial Nerves (Without Annotation)",
        description:
          "The same cranial nerve exam without annotations — useful for self-testing and practice.",
        youtubeId: "Q0LGiwRvXdE",
        credit: "Courtesy of University of Health Sciences, Cambodia",
      },
      {
        title: "Clinical Localization in Neurology",
        description:
          "A guide to clinical localization — using exam findings to pinpoint where in the nervous system a lesion is occurring.",
        youtubeId: "0U9x7WtqMwU",
      },
    ],
    residents: [],
    emg: [
      // {
      //   title: "EMG Fundamentals",
      //   description: "Core principles of electromyography interpretation.",
      //   youtubeId: "dQw4w9WgXcQ",
      // },
    ],
  };
