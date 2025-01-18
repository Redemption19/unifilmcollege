type Course = {
  title: string;
  slug: string;
  image: string;
  duration: string;
  description: string;
  modules: string[];
  learningOutcomes: string[];
  careerPath: string;
};

export const courseData: Course[] = [
  {
    title: "Diploma in Journalism and Media Studies",
    slug: "journalism-media-studies",
    image: "/images/film2.jpg",
    duration: "1 year",
    description: "Master the art of storytelling and news reporting across multiple media platforms with our comprehensive journalism program.",
    modules: [
      "Newspaper Reporting / Print Journalism",
      "Radio Presenting / Radio Journalism",
      "Radio and TV Producing",
      "TV Presenting / TV Journalism",
      "Radio & TV DJing",
      "Media Marketing",
      "Media Law and Ethics"
    ],
    learningOutcomes: [
      "Master the fundamentals of journalism across various media platforms.",
      "Develop presentation and production skills for radio and television.",
      "Gain knowledge of ethical practices and marketing strategies in media."
    ],
    careerPath: "Journalist, media broadcaster, content creator, media marketer."
  },
  {
    title: "Diploma/Certificate in TV and Film Production",
    slug: "tv-film-production",
    image: "/images/joun.jpg",
    duration: "1 year (Diploma) / 6 months (Certificate)",
    description: "Learn the art of visual storytelling through hands-on experience in film directing, editing, and production.",
    modules: [
      "Music Video Directing & Editing",
      "Commercial/Documentary Directing & Editing",
      "Script Writing & Treatment Making",
      "Visual Effects & Motion Graphics",
      "Camera and Gimbal Operating",
      "Digital Video Editing, Color Grading, and Drone Piloting"
    ],
    learningOutcomes: [
      "Acquire technical skills in directing and editing films and videos.",
      "Learn advanced techniques in cinematography and visual storytelling.",
      "Understand the essentials of pre-production and post-production workflows."
    ],
    careerPath: "Film director, cinematographer, video editor, producer."
  },
  {
    title: "Diploma/Certificate in Graphic Design",
    slug: "graphic-design",
    image: "/images/graphic.jpg",
    duration: "1 year (Diploma) / 6 months (Certificate)",
    description: "Master the tools and techniques of modern graphic design, from branding to digital media.",
    modules: [
      "CorelDraw Application",
      "Corporate Image and Identity",
      "Photoshop Application",
      "Illustrator, HTML, and DTP Tools"
    ],
    learningOutcomes: [
      "Create compelling graphic designs for various industries.",
      "Develop skills in branding, identity creation, and digital tools.",
      "Master software applications for professional-grade design work."
    ],
    careerPath: "Graphic designer, branding expert, digital artist."
  },
  {
    title: "Diploma/Certificate in Photography",
    slug: "photography",
    image: "/images/photography.jpg",
    duration: "1 year (Diploma) / 6 months (Certificate)",
    description: "Learn professional photography techniques and master the art of visual storytelling.",
    modules: [
      "Documentary and Commercial Photography",
      "Studio Photography and Retouching",
      "Studio Lighting and Media Ethics"
    ],
    learningOutcomes: [
      "Develop proficiency in studio and outdoor photography techniques.",
      "Learn post-processing and photo enhancement methods.",
      "Understand the ethical considerations of professional photography."
    ],
    careerPath: "Photographer, photo editor, visual content creator."
  },
  {
    title: "Diploma/Certificate in Sound Engineering",
    slug: "sound-engineering",
    image: "/images/sound.jpg",
    duration: "1 year (Diploma) / 6 months (Certificate)",
    description: "Master the art of sound production, mixing, and audio engineering.",
    modules: [
      "Beats Making",
      "Mixing and Mastering",
      "Piano Lessons and Vocal Recording"
    ],
    learningOutcomes: [
      "Gain expertise in sound design, mixing, and mastering.",
      "Learn to create and refine beats for various music genres.",
      "Acquire skills in studio setup and vocal recording techniques."
    ],
    careerPath: "Sound engineer, music producer, audio technician."
  },
  {
    title: "Certificate in Microsoft Office Suite",
    slug: "microsoft-office",
    image: "/images/office.webp",
    duration: "6 months",
    description: "Master essential Microsoft Office applications for professional workplace success.",
    modules: [
      "Microsoft PowerPoint, Word, Excel, Access",
      "Internet and Microsoft Publisher"
    ],
    learningOutcomes: [
      "Master essential office software for workplace productivity.",
      "Develop skills in creating presentations, managing data, and document processing.",
      "Learn effective internet and communication tools for professional environments."
    ],
    careerPath: "Administrative assistant, office manager, technical support specialist."
  },
  {
    title: "Cosmetology",
    slug: "cosmetology",
    image: "/images/cos.jpg",
    duration: "4 months",
    description: "Learn professional beauty techniques in hair styling and makeup artistry.",
    modules: [
      "Hair: Wig Making, Braids, Ponytails, Bridal Styling",
      "Makeup: Day Makeup, Night Makeup, Soft Glam, Full Glam"
    ],
    learningOutcomes: [
      "Develop professional hairstyling and makeup application techniques.",
      "Gain expertise in bridal and event-specific beauty services.",
      "Understand trends and client engagement in the cosmetology industry."
    ],
    careerPath: "Hairstylist, makeup artist, beauty consultant."
  }
];