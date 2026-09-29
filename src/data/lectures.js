// ─── Lecture Library ──────────────────────────────────────
// Add entries here once videos are uploaded to YouTube.
// youtubeId is just the part after "v=" or "youtu.be/" in the URL.
// Empty arrays automatically show a "Coming soon" state on the page.

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
