"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Package, Zap, Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-background/50"
    >
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Animate.
          <br />
          Without Limits.
        </motion.h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A powerful animation library that combines the best of Framer Motion
          and GSAP for stunning web experiences.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={gandleGetStartedClick} size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto px-4">
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
            className="p-6 rounded-xl bg-card border shadow-lg"
          >
            <feature.icon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
