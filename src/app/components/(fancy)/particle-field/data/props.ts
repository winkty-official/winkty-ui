export const propDefinitions = [
  {
    prop: "className",
    type: "string",
    description: "Additional CSS classes to apply to the container",
  },
  {
    prop: "particleCount",
    type: "number",
    default: "50",
    description: "Number of particles to render",
  },
  {
    prop: "colors",
    type: "string[]",
    default: '["#4f46e5", "#0ea5e9", "#8b5cf6", "#ec4899"]',
    description: "Array of colors for particles",
  },
  {
    prop: "minSize",
    type: "number",
    default: "3",
    description: "Minimum size of particles in pixels",
  },
  {
    prop: "maxSize",
    type: "number",
    default: "6",
    description: "Maximum size of particles in pixels",
  },
  {
    prop: "glowIntensity",
    type: "number",
    default: "15",
    description: "Intensity of the glow effect around particles",
  },
  {
    prop: "expandScale",
    type: "number",
    default: "1.5",
    description: "Scale factor for particle expansion on hover",
  },
];
