import React from "react";
import { HeroSection } from "./hero-section";
import { FeaturesGrid } from "./features-grid";
import { LiveEditorSection } from "./live-editor-section";
import { Footer } from "./footer";

const HomeSection = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesGrid />
      <LiveEditorSection />
      <Footer />
    </div>
  );
};

export default HomeSection;
