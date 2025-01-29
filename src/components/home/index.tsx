import React from "react";
import { HeroSection } from "./hero-section";
import { FeaturesGrid } from "./features-grid";
import { LiveEditorSection } from "./live-editor-section";
import { Footer } from "./footer";
import { MouseRippleEffect } from "../fancy/mouse-ripple-effect";

const HomeSection = () => {
  return (
    <div>
      <MouseRippleEffect
        rippleColor="#3b82f6"
        className="w-full h-full"
        rippleSize={150}
        rippleDuration={0.7}
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
