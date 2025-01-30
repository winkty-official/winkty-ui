import { NeonPulse } from "@/components/fancy/neon-pulse/neon-pulse";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <NeonPulse
        text="Neon Pulse"
        color="#00ffff"
        glowColor="#00ffff"
        fontSize="6rem"
        pulseDuration={1000}
        className="mb-8"
      />
      <NeonPulse
        text="Electrifying Text"
        color="#ff00ff"
        glowColor="#ff00ff"
        fontSize="4rem"
        pulseDuration={1500}
      />
    </div>
  );
}
