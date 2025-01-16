import { Target, Eye } from "lucide-react";

export function MissionVision() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-950" />
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">
                Mission Statement
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              At Unifilm College, we empower aspiring creatives with the skills and knowledge to excel in film, media, and technology. Through a blend of practical experience and academic excellence, we inspire innovation, foster critical thinking, and cultivate artistic expression in every student.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-950" />
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950">
                Vision Statement
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              We aim to be a globally recognized institution in the creative arts and technology sector, known for our innovative curriculum and strong industry partnerships. Our goal is to shape the next generation of influential storytellers and leaders, preparing them for success in an ever-evolving industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}