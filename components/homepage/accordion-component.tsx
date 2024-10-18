import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TITLE_TAILWIND_CLASS } from "@/utils/constants";

export function AccordionComponent() {
  return (
    <div className="flex flex-col w-[70%] lg:w-[50%] mx-auto">
      <h2
        className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold text-center tracking-tight dark:text-white text-gray-900`}
      >
        Frequently Asked Questions (FAQs)
      </h2>
      <Accordion type="single" collapsible className="w-full mt-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="font-medium">What is ChainAuth?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              ChainAuth is a decentralized authentication framework that allows
              users to log in without passwords using cryptographic keys or
              biometrics.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <span className="font-medium">
              How does ChainAuth enhance security?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              By eliminating centralized databases and using blockchain
              technology, ChainAuth reduces vulnerabilities associated with
              traditional authentication methods.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <span className="font-medium">Is my data safe with ChainAuth?</span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, ChainAuth ensures your data is secure through decentralized
              identity management and compliance with data protection
              regulations.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <span className="font-medium">
              How can I integrate ChainAuth into my application?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>
              ChainAuth offers a SaaS subscription model for easy integration
              into websites and applications. You can also seek consulting
              services for customized implementations.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
