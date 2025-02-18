import React from "react";
import { HeroSection } from "./hero-section";
import { FeaturesGrid } from "./features-grid";
import { LiveEditorSection } from "./live-editor-section";
import { Footer } from "./footer";
import { MouseRippleEffect } from "@/components/ui/chromatic-ripple-effect";

const HomeSection = () => {
  return (
    <div>
      <MouseRippleEffect
        rippleColor="#6617a6"
        className="w-full h-full"
        rippleSize={150}
        rippleDuration={.8}
      >
        <HeroSection />
      </MouseRippleEffect>
      <FeaturesGrid />
      <LiveEditorSection />
      <Footer />
    </div>
  );
};

export default HomeSection;
