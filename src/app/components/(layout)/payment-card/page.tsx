"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeBlock } from "@/components/home/code-block";
import { PaymentForm } from "@/components/layout/payment/payment-form";

const PaymentCardPage = () => {
  const [code, setCode] = useState<string | null>(null);
  const [filePath] = useState("");

  async function fetchCode(filePath: string) {
    try {
      const response = await fetch(`/api/code?filePath=${filePath}`);
      console.log("🚀 ~ fetchCode ~ response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch code.");
      }
      const { code } = await response.json();
      setCode(code);
    } catch (error) {
      console.error(error);
      setCode(null);
    }
  }

  useEffect(() => {
    if (filePath) {
      fetchCode(filePath);
    }
  }, [filePath]);

  return (
    <div className="py-10 space-y-12">
      <Header />
      <InstallationSection />
      <Payment fetchCode={fetchCode} code={code} />
    </div>
  );
};

function Header() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Animated Buttons</h1>
      <p className="text-muted-foreground text-lg">
        A collection of beautiful, animated button components built with Framer
        Motion.
      </p>
    </div>
  );
}

const installCode = {
  npm: ` npm install framer-motion payment 
npm install --save-dev @types/payment`,
  yarn: ` yarn add framer-motion payment
yarn add --save-dev @types/payment`,
  pnpm: ` pnpm add framer-motion payment
pnpm add --save-dev @types/payment`,
};

function InstallationSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Installation</h2>
      <Tabs defaultValue="npm" className="w-full">
        <TabsList>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="yarn">yarn</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        </TabsList>
        {Object.entries(installCode).map(([key, code]) => (
          <TabsContent key={key} value={key}>
            <CodeBlock code={code} language="bash" />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface PaymentProps {
  code: string | null;
  fetchCode: (path: string) => void;
}

const usage = `import { PaymentForm } from "@/components/payment-form"

export default function PaymentForm() {
  return (
    <>
     <PaymentForm />
    </>
  )
}`;

function Payment({ fetchCode, code }: PaymentProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger
          value="code"
          onClick={() =>
            fetchCode(
              "src/components/payment/payment-form.tsx,src/components/payment/card-preview.tsx"
            )
          }
        >
          Code
        </TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="p-6 rounded-lg border bg-card">
        <PaymentForm />
      </TabsContent>
      <TabsContent value="code">
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {code === null ? (
            <p className="text-muted-foreground text-lg">Loading code...</p>
          ) : code === "" ? (
            <p className="text-muted-foreground text-lg">
              Failed to load code.
            </p>
          ) : (
            <CodeBlock code={code} language="tsx" />
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="usage">
        <CodeBlock code={usage} language="tsx" />
      </TabsContent>
    </Tabs>
  );
}

export default PaymentCardPage;
