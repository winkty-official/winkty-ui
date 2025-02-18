"use client";
import { Button } from "@/components/ui/button";
import {
  MouseRippleEffect
} from "@/components/ui/chromatic-ripple-effect";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function RippleEffectHeroSection() {
  const router = useRouter();
  return (
    <MouseRippleEffect
      rippleColor="#6617a6"
      className="w-full h-full"
      rippleSize={150}
      rippleDuration={0.8}
    >
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-background/50">
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
            Animate
            <br />
            Without Limits.
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A powerful animation library that combines the best of Framer Motion
            and GSAP for stunning web experiences.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => router.push("/components")}
              size="lg"
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              View on GitHub
            </Button>
          </div>
        </motion.div>
      </section>
    </MouseRippleEffect>
  );
}

export default RippleEffectHeroSection;
