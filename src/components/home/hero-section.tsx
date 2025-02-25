"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Scale, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";
import { TextRippleEffect } from "../ui/chromatic-ripple-effect";

export function HeroSection() {
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const router = useRouter();

  const gandleGetStartedClick = () => {
    router.push("/components");
  };

  return (
    <section
      ref={ref}
      className="relative flex max-h-[54rem] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50"
    >
      <div className="bg-grid-white/10 bg-grid-pattern absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 text-center"
      >
        <motion.h1
          className="mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text pt-12 text-6xl font-bold text-transparent md:text-8xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TextRippleEffect>Install Configure</TextRippleEffect>
          <br />
          <TextRippleEffect>Use forever.</TextRippleEffect>
        </motion.h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground md:text-2xl">
          A powerful animated react component library that combines the best of Framer Motion
          and GSAP for stunning web experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={gandleGetStartedClick} size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="https://dashboard-template-01.vercel.app/">
              Free Templates
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {[
          {
            icon: Package,
            title: "Lightweight",
            description: "Only 12kb gzipped, with zero dependencies",
          },
          {
            icon: Zap,
            title: "Performant",
            description: "60fps animations with hardware acceleration",
          },
          {
            icon: Scale,
            title: "Flexible",
            description: "Works with any React component or HTML element",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [-20, 0, -20],
            }}
            transition={{
              opacity: { delay: index * 0.2 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
            }}
            className="rounded-xl border bg-card p-6 shadow-lg"
          >
            <feature.icon className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
