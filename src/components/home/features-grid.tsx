"use client";

import { Zap, Shield, Sparkles, Gauge, Palette, Code } from "lucide-react";
import TiltCard from "../ui/tilt-card";

export function FeaturesGrid() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Optimized for performance with minimal bundle size impact.",
      icon: Zap,
      gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
    },
    {
      title: "Type Safe",
      description: "Built with TypeScript for robust, error-free development.",
      icon: Shield,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    },
    {
      title: "Beautiful Defaults",
      description:
        "Carefully crafted animations that look great out of the box.",
      icon: Sparkles,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    },
    {
      title: "High Performance",
      description: "Hardware-accelerated animations for smooth 60fps.",
      icon: Gauge,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
    },
    {
      title: "Customizable",
      description: "Easily adapt animations to match your brand identity.",
      icon: Palette,
      gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
    },
    {
      title: "Developer First",
      description: "Intuitive API designed for developer productivity.",
      icon: Code,
      gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Our Library?</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to create stunning animations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <TiltCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            >
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <feature.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                  role="img"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature?.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature?.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
