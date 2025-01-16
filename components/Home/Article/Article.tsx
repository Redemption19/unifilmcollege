"use client";
import { GraduationCap, ClipboardCheck, CreditCard, UserCheck, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Article = () => {
  const admissionSteps = [
    {
      icon: <ClipboardCheck className="w-12 h-12 text-[#a36105]" />,
      title: "1. Choose Your Program",
      description: "Select from our range of diploma and certificate programs that match your career goals."
    },
    {
      icon: <CreditCard className="w-12 h-12 text-[#a36105]" />,
      title: "2. Purchase Form",
      description: "Buy your admission form for 100 GHS through mobile money or bank transfer."
    },
    {
      icon: <UserCheck className="w-12 h-12 text-[#a36105]" />,
      title: "3. Submit Application",
      description: "Complete the application form with required documents and submit for review."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-[#a36105]" />,
      title: "4. Begin Your Journey",
      description: "Upon acceptance, complete your registration and start your educational journey."
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Basic requirements include a valid ID, passport photos, and completed application form. Specific programs may have additional requirements."
    },
    {
      question: "How much is the application fee?",
      answer: "The application fee is 100 GHS, payable through mobile money or bank transfer."
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes, we offer merit-based scholarships to outstanding students. Contact our admissions office for more information."
    },
    {
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for multiple programs with a single application form. Additional program choices should be indicated on your application."
    },
    {
      question: "What is the duration of the programs?",
      answer: "Program durations vary: Diploma programs are typically 1 year, Certificate programs are 6 months, and specialized courses like Cosmetology are 4 months."
    }
  ];

  // State for managing FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-20 pb-20 bg-gray-100">
      <div className="w-[80%] mx-auto">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl text-gray-900 font-bold mb-4">
            Admission Process
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to begin your journey at Unifilm College
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {admissionSteps.map((step, i) => (
            <div key={i} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
              >
                {/* Content */}
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="mb-4"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              {/* Arrows (only show between items, not after the last one) */}
              {i < admissionSteps.length - 1 && (
                <>
                  {/* Desktop Arrow */}
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8 text-[#a36105]" />
                    </motion.div>
                  </div>
                  {/* Mobile/Tablet Arrow */}
                  <div className="lg:hidden flex justify-center mt-4">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
                    >
                      <ArrowRight className="w-8 h-8 text-[#a36105] transform rotate-90" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/admissions">
            <Button 
              size="lg"
              className="bg-[#a36105] hover:bg-[#875004] text-white font-semibold px-8"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about admission and programs at Unifilm College
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index}
                className="mb-4"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-lg font-semibold text-left">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-[#a36105] flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#a36105] flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white px-6 pb-6 rounded-b-lg shadow-md -mt-1"
                  >
                    <p className="text-gray-600 pt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-[#a36105] hover:bg-[#875004] text-white font-semibold px-8"
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Article;
