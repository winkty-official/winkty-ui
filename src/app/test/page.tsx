// "use client";

// import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
// import React, { MouseEvent as ReactMouseEvent } from "react";
// import { cn } from "@/lib/utils";

// export const CardSpotlight = ({
//   radius = 300, // Glow size
//   color = "rgba(255, 0, 150, 1)", // Neon glow color
//   className,
//   ...props
// }: {
//   radius?: number;
//   color?: string;
// } & React.HTMLAttributes<HTMLDivElement>) => {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   // Smooth animation
//   //   const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
//   //   const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

//   function handleMouseMove({
//     currentTarget,
//     clientX,
//     clientY,
//   }: ReactMouseEvent<HTMLDivElement>) {
//     const { left, top } = currentTarget.getBoundingClientRect();

//     const x = clientX - left;
//     const y = clientY - top;

//     mouseX.set(x);
//     mouseY.set(y);
//   }

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-gray-900 relative z-20">
//       <div className="relative z-10 w-full max-w-[38rem] max-h-[21rem] h-full flex items-center justify-center">
//         <div
//           className={cn(
//             "relative max-w-xl w-full h-72 m-auto rounded-md border border-neutral-800 bg-black",
//             className,
//             "before:content-[''] before:overflow-hidden before:absolute before:-inset-5 before:-z-10 before:border-2 before:rounded-md before:border-gray-200/10 before:bg-gray-200/10 backdrop-blur-md",
//           )}
//           onMouseMove={handleMouseMove}
//           {...props}
//         >
//           <motion.div
//             className="absolute -inset-4 rounded-md pointer-events-none"
//             style={{
//               background: useMotionTemplate`
//               radial-gradient(
//                 ${radius}px circle at ${mouseX}px ${mouseY}px,
//                 ${color},
//                 transparent 70%
//               )
//             `,
//               filter: "blur(40px)",
//               opacity: 0.8,
//             }}
//           />

//           <div className="relative z-10 rounded-sm bg-white h-full w-full flex items-center justify-center">
//             <p className="text-white font-semibold">Hover Me!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardSpotlight;

import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
