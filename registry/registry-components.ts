import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "auto-complete",
    type: "registry:ui",
    registryDependencies: ["button", "popover", "command", "badge"],
    dependencies: ["framer-motion", "lucide-react"],
    files: ["ui/auto-complete.tsx"],
  },
  {
    name: "input-field",
    type: "registry:ui",
    registryDependencies: ["utils"],
    dependencies: ["class-variance-authority"],
    files: ["ui/input-field.tsx"],
  },
  {
    name: "area-radio",
    type: "registry:ui",
    registryDependencies: ["label", "utils"],
    dependencies: ["@radix-ui/react-radio-group"],
    files: ["ui/area-radio.tsx"],
  },
  {
    name: "file-tree",
    type: "registry:ui",
    registryDependencies: ["card", "utils"],
    dependencies: ["framer-motion", "lucide-react"],
    files: ["ui/file-tree.tsx"],
  },
  {
    name: "auth-form",
    type: "registry:ui",
    registryDependencies: ["button", "form", "utils"],
    dependencies: [
      "zod",
      "react-hook-form",
      "lucide-react",
      "@hookform/resolvers",
    ],
    files: ["ui/auth-form.tsx", "ui/input-field.tsx"],
  },
  {
    name: "payment-form",
    type: "registry:ui",
    registryDependencies: ["button", "form", "utils", "select"],
    dependencies: [
      "react-hook-form",
      "framer-motion",
      "@hookform/resolvers",
      "zod",
      "payment",
      "lucide-react",
    ],
    files: ["ui/payment-form.tsx", "ui/input-field.tsx"],
  },
  {
    name: "chromatic-ripple-effect",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [
      "framer-motion",
    ],
    files: ["ui/chromatic-ripple-effect.tsx"],
  },
  {
    name: "highlighted-article",
    type: "registry:ui",
    registryDependencies: ["utils"],
    dependencies: [
      "framer-motion",
    ],
    files: ["ui/highlighted-article.tsx"],
  },
  {
    name: "neon-pulse",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [
      "framer-motion",
    ],
    files: ["ui/neon-pulse.tsx"],
  },
  {
    name: "particle-field",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [
      "framer-motion",
    ],
    files: ["ui/particle-field.tsx"],
  },
  // {
  //   name: "hint",
  //   type: "registry:ui",
  //   registryDependencies: ["tooltip"],
  //   dependencies: ["framer-motion"],
  //   files: ["ui/hint.tsx"],
  // },
  // {
  //   name: "animated-button",
  //   type: "registry:ui",
  //   registryDependencies: ["button"],
  //   tailwind: {
  //     config: {
  //       theme: {
  //         extend: {
  //           animation: {
  //             ripple: "ripple 0.6s ease-out",
  //           },
  //           keyframes: {
  //             ripple: {
  //               "0%": {
  //                 transform: "scale(0)",
  //                 opacity: "1",
  //               },
  //               "100%": {
  //                 transform: "scale(4)",
  //                 opacity: "0",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   files: ["ui/animated-button.tsx"],
  // },
  // {
  //   name: "sidebar-02",
  //   type: "registry:block",
  //   registryDependencies: [
  //     "progress",
  //     "https://www.uicart.io/registry/hint.json",
  //   ],
  //   dependencies: ["framer-motion", "lucide-react"],
  //   files: ["block/sidebar-02/sidebar-02.tsx"],
  // },
  // {
  //   name: "sonic-bento",
  //   type: "registry:block",
  //   dependencies: ["framer-motion", "lucide-react"],
  //   files: ["block/bento-grid-components/sonic-bento.tsx"],
  // },
  // {
  //   name: "design-board",
  //   type: "registry:block",
  //   dependencies: [
  //     "framer-motion",
  //     "lucide-react",
  //     "@tailwindcss/container-queries",
  //   ],
  //   files: ["block/bento-grid-components/design-board.tsx"],
  //   tailwind: {
  //     config: {
  //       plugins: [`require("@tailwindcss/container-queries")`],
  //     },
  //   },
  // },
  // {
  //   name: "bento-grid-01",
  //   type: "registry:block",
  //   registryDependencies: [
  //     "https://www.uicart.io/registry/sonic-bento.json",
  //     "https://www.uicart.io/registry/design-board.json",
  //   ],
  //   files: ["block/bento-grid-01/bento-grid.tsx"],
  // },
];
