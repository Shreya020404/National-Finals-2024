import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full p-8">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is ChainAuth?</AccordionTrigger>
        <AccordionContent>
          ChainAuth is a decentralized authentication framework that allows
          users to log in without passwords, using cryptographic keys or
          biometrics for enhanced security.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does ChainAuth ensure my data is secure?
        </AccordionTrigger>
        <AccordionContent>
          ChainAuth leverages blockchain technology to eliminate centralized
          databases, ensuring your data is protected against breaches and
          unauthorized access.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Can I integrate ChainAuth with my existing applications?
        </AccordionTrigger>
        <AccordionContent>
          Yes, ChainAuth offers a SaaS subscription model for easy integration
          into websites and apps, along with consulting services for customized
          implementations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Is ChainAuth compliant with data protection regulations?
        </AccordionTrigger>
        <AccordionContent>
          Yes, ChainAuth integrates compliance management features to adhere to
          regulations like GDPR and HIPAA.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
