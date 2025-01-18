import { Lightbulb, Award, Brain, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Creativity, Innovation, and Artistic Expression",
    description: "Creativity is the driving force behind everything we do. We encourage innovative thinking and celebrate the unique artistic voices of our students, empowering them to lead and shape the future of the creative industry.",
  },
  {
    icon: Award,
    title: "Excellence in Education and Professionalism",
    description: "We are committed to providing high-quality education, blending academic rigor with practical training. Our students graduate equipped with the expertise, integrity, and professionalism needed to excel in their careers.",
  },
  {
    icon: Brain,
    title: "Critical Thinking and Problem-Solving",
    description: "Our programs cultivate intellectual curiosity, teaching students to analyze, evaluate, and develop solutions to the challenges of the creative industries.",
  },
  {
    icon: Users,
    title: "Collaboration and Industry Partnerships",
    description: "We value collaboration, building strong relationships with industry leaders to provide mentorship, internships, and networking opportunities that prepare students for the workforce.",
  },
  {
    icon: Globe,
    title: "Global Perspective and Leadership",
    description: "We prepare our students for global success by fostering a broad worldview, leadership skills, and a sense of responsibility in shaping the creative industries worldwide.",
  },
];

export function CoreValues() {
  return (
    <div className="py-16 sm:py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-indigo-950">
            Our Core Values
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            At Unifilm College, we uphold values that are integral to our mission of nurturing creative professionals.
          </p>
        </div>
        <div className="mx-auto mt-12 sm:mt-16">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-lg p-6 sm:p-8 shadow-lg">
                <div className="mb-3 sm:mb-4">
                  <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-950" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-indigo-950">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}