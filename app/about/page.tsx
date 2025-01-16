import Image from "next/image";
import { MissionVision } from "./components/mission-vision";
import { CoreValues } from "./components/core-values";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
            alt="Film production equipment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white">
            Discovering the Art of Film and Creativity
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 max-w-xl">
            Founded in November 2023, Unifilm College is Ghana&apos;s premier practical training institution for aspiring creatives.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2 items-center">
            {/* Image Container */}
            <div className="relative h-[300px] sm:h-[400px] w-full">
              <Image
                src="/images/about.jpg"
                alt="About Unifilm College"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
                Recognized by the Ghana Education Service and NASIA, we offer industry-relevant programs that blend hands-on training with academic rigor. Our strategic partnership with the Youngtrepreneurs UK Film Academy provides students with unique opportunities for internships, mentorship, and career advancement through global exposure.
              </p>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
                Unifilm College is committed to offering students the tools they need to thrive in the creative industry, helping them build solid networks, gain valuable experience, and unlock career opportunities.
              </p>
              <Button asChild>
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MissionVision />
      <CoreValues />
    </>
  );
}