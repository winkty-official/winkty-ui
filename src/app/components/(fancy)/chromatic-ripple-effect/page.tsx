import {
  // ChromaticRipple,
  TextRippleEffect,
} from "@/components/fancy/chromatic-ripple-effect/chromatic-ripple-effect";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Chromatic Ripple Effect
      </h1>
      {/* <ChromaticRipple
        className="text-7xl font-bold text-gray-800 h-40"
        rippleColors={[
          "rgba(255, 105, 180, 0.3)", // Hot pink
          "rgba(64, 224, 208, 0.3)", // Turquoise
          "rgba(255, 215, 0, 0.3)", // Gold
          "rgba(138, 43, 226, 0.3)", // Blue violet
          "rgba(50, 205, 50, 0.3)", // Lime green
        ]}
        rippleSize={150}
        rippleDuration={0.7}
      >
        Hover over me! to see the effect
      </ChromaticRipple> */}
      <TextRippleEffect
        className="text-7xl h-40 font-bold text-gray-800"
        rippleColor="rgba(59, 130, 246, 0.2)"
        rippleSize={150}
        rippleDuration={0.7}
      >
        Hover over me to see the ripple effect!
      </TextRippleEffect>
    </div>
  );
}
