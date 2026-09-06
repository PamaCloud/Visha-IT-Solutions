export interface VishaTrainingItem {
  id: string;
  slug: string;
  title: string;
  duration?: string;
  mode?: string;
}

export const VISHA_TRAINING_PROGRAMS: VishaTrainingItem[] = [
  {
    id: "full-stack-development",
    slug: "full-stack-development",
    title: "Full Stack Development",
    duration: "6 Months",
    mode: "Hybrid",
  },
  {
    id: "advanced-java-programming",
    slug: "advanced-java-programming",
    title: "Advanced Java Programming",
    duration: "4 Months",
    mode: "Online",
  },
  {
    id: "cloud-computing-aws",
    slug: "cloud-computing-aws",
    title: "Cloud Computing & AWS",
    duration: "3 Months",
    mode: "Online",
  },
  {
    id: "python-data-engineering",
    slug: "python-data-engineering",
    title: "Python & Data Engineering",
    duration: "4 Months",
    mode: "Hybrid",
  },
  {
    id: "ai-machine-learning",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    duration: "6 Months",
    mode: "Online",
  },
  {
    id: "digital-marketing-mastery",
    slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    duration: "3 Months",
    mode: "Hybrid",
  },
];
