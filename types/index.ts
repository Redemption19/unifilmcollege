export interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  slug: string;
  modules: string[];
  learningOutcomes: string[];
  careerPath: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  _id: string;
  src: string;
  alt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admission {
  _id: string;
  fullName: string;
  email: string;
  course: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
} 