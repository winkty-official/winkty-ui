import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Github, Terminal } from "lucide-react";
import { CodeBlock } from "@/components/home/code-block";

export const metadata: Metadata = {
  title: "Components - Shadcn UI",
  description: "Beautiful and accessible components built with Tailwind CSS.",
};

const installationCode = `npx shadcn-ui@latest init
npx shadcn-ui@latest add button`;

const usageCode = `import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`;

export default function ComponentsPage() {
  return (
    <div className="container max-w-6xl py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Beautiful UI Components</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A collection of accessible and customizable components that you can
          copy and paste into your apps. Built with Tailwind CSS and Radix UI.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            Search Components{" "}
            <span className="ml-2 text-sm text-muted">⌘+K</span>
          </Button>

          <Button size="lg" variant="outline">
            <Github className="mr-2" />
            View on GitHub
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: "Accessible",
            description:
              "Components follow WAI-ARIA guidelines and support keyboard navigation.",
          },
          {
            title: "Customizable",
            description:
              "Use CSS variables to customize components to match your brand.",
          },
          {
            title: "Light & Dark",
            description:
              "Automatic dark mode based on system preferences or manual toggle.",
          },
        ].map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installation Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Installation</h2>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5" />
              <p className="font-semibold">Install using CLI</p>
            </div>
            <CodeBlock code={installationCode} language="bash" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Copy className="h-5 w-5" />
              <p className="font-semibold">Usage Example</p>
            </div>
            <CodeBlock code={usageCode} language="tsx" />
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "What is shadcn/ui?",
              answer:
                "shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. It's not a component library, but rather a collection of components that you can copy and paste into your apps.",
            },
            {
              question: "Can I use this in my project?",
              answer:
                "Yes! The components are open source and you can use them in any project. You can copy and paste the components you need or use the CLI to add them to your project.",
            },
            {
              question: "Is this a component library?",
              answer:
                "No. This is not a component library. It's a collection of re-usable components that you can copy and paste into your apps.",
            },
            {
              question: "Can I customize the components?",
              answer:
                "Yes! The components are built using Tailwind CSS and you can customize them using Tailwind's utility classes or by modifying the source code directly.",
            },
          ].map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Community Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Discord</h3>
              <p className="text-muted-foreground mb-4">
                Join our Discord community to get help and share your work.
              </p>
              <Button variant="outline" className="w-full">
                Join Discord
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-muted-foreground mb-4">
                Star us on GitHub and contribute to the project.
              </p>
              <Button variant="outline" className="w-full">
                View GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
