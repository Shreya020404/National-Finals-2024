"use client";

import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, CheckCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <span className="text-lg sm:text-xl font-bold">ChainAuth</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#services"
            >
              Services
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#testimonials"
            >
              Testimonials
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#faq"
            >
              FAQ
            </Link>
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          <Button className="hidden md:inline-flex bg-green-600 hover:bg-green-700">
            Get Started
          </Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              className="text-sm font-medium hover:text-green-600"
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Decentralized Authentication Framework
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Eliminate the need for passwords and centralized services with
              ChainAuth.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-base sm:text-lg py-2 px-4 sm:px-6">
              Schedule a Demo
            </Button>
          </div>
        </section>

        <section
          id="services"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: (
                    <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  ),
                  title: "Decentralized Identity",
                  description:
                    "Secure identity management with full user control.",
                },
                {
                  icon: (
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  ),
                  title: "Tokenized Access Control",
                  description:
                    "Flexible access management through Tokenized Authentication Keys (TAKs).",
                },
                {
                  icon: (
                    <Key className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  ),
                  title: "Compliance Management",
                  description:
                    "Ensures adherence to GDPR and HIPAA regulations.",
                },
                {
                  icon: (
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  ),
                  title: "Enhanced Security",
                  description:
                    "Blockchain technology ensures no single point of failure.",
                },
              ].map((service, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              How ChainAuth Works
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
              {[
                "Users create a decentralized identity using cryptographic keys.",
                "Login to services without passwords using biometrics or keys.",
                "Tokenized Authentication Keys (TAKs) allow for secure access control.",
                "Compliance with regulations is ensured through Vottun integration.",
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                {
                  quote:
                    "ChainAuth has transformed our approach to authentication. No more passwords!",
                  author: "Alice Johnson, CTO at TechInnovate",
                },
                {
                  quote:
                    "The integration was seamless, and the security is top-notch.",
                  author: "Bob Smith, Security Manager at SecureCorp",
                },
                {
                  quote:
                    "Finally, a solution that puts control back in the hands of users.",
                  author: "Charlie Brown, CEO at Future Tech",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
                >
                  <p className="text-base sm:text-lg mb-4">
                    &#34;{testimonial.quote}&#34;
                  </p>
                  <p className="text-sm sm:text-base font-semibold">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
              {[
                {
                  question: "What is ChainAuth?",
                  answer:
                    "ChainAuth is a decentralized authentication framework that eliminates the need for passwords.",
                },
                {
                  question: "How does decentralized identity work?",
                  answer:
                    "Users create a decentralized identity using cryptographic keys, giving them full control over their credentials.",
                },
                {
                  question: "What is a Tokenized Authentication Key (TAK)?",
                  answer:
                    "TAKs are secure tokens that allow for flexible access control across platforms.",
                },
              ].map((item, index) => (
                <div key={index} className="border-b py-4">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="text-sm text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} ChainAuth. All rights reserved.
          </p>
          <Link
            className="text-sm text-green-600 hover:underline"
            href="#contact"
          >
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}
