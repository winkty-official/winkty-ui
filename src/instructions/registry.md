# generate a registry of components

# target folder to create registry file

public/registry

## example of a registry

```json
{
  "name": "moving-border",
  "type": "registry:ui",
  "dependencies": ["framer-motion"],
  "files": [
    {
      "path": "components/ui/moving-border.tsx",
      "content": "\"use client\";\nimport React from \"react\";\nimport {\n  motion,\n  useAnimationFrame,\n  useMotionTemplate,\n  useMotionValue,\n  useTransform,\n} from \"framer-motion\";\nimport { useRef } from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport function Button({\n  borderRadius = \"1.75rem\",\n  children,\n  as: Component = \"button\",\n  containerClassName,\n  borderClassName,\n  duration,\n  className,\n  ...otherProps\n}: {\n  borderRadius?: string;\n  children: React.ReactNode;\n  as?: any;\n  containerClassName?: string;\n  borderClassName?: string;\n  duration?: number;\n  className?: string;\n  [key: string]: any;\n}) {\n  return (\n    <Component\n      className={cn(\n        \"bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden \",\n        containerClassName\n      )}\n      style={{\n        borderRadius: borderRadius,\n      }}\n      {...otherProps}\n    >\n      <div\n        className=\"absolute inset-0\"\n        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}\n      >\n        <MovingBorder duration={duration} rx=\"30%\" ry=\"30%\">\n          <div\n            className={cn(\n              \"h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]\",\n              borderClassName\n            )}\n          />\n        </MovingBorder>\n      </div>\n\n      <div\n        className={cn(\n          \"relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased\",\n          className\n        )}\n        style={{\n          borderRadius: `calc(${borderRadius} * 0.96)`,\n        }}\n      >\n        {children}\n      </div>\n    </Component>\n  );\n}\n\nexport const MovingBorder = ({\n  children,\n  duration = 2000,\n  rx,\n  ry,\n  ...otherProps\n}: {\n  children: React.ReactNode;\n  duration?: number;\n  rx?: string;\n  ry?: string;\n  [key: string]: any;\n}) => {\n  const pathRef = useRef<any>();\n  const progress = useMotionValue<number>(0);\n\n  useAnimationFrame((time) => {\n    const length = pathRef.current?.getTotalLength();\n    if (length) {\n      const pxPerMillisecond = length / duration;\n      progress.set((time * pxPerMillisecond) % length);\n    }\n  });\n\n  const x = useTransform(\n    progress,\n    (val) => pathRef.current?.getPointAtLength(val).x\n  );\n  const y = useTransform(\n    progress,\n    (val) => pathRef.current?.getPointAtLength(val).y\n  );\n\n  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;\n\n  return (\n    <>\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        preserveAspectRatio=\"none\"\n        className=\"absolute h-full w-full\"\n        width=\"100%\"\n        height=\"100%\"\n        {...otherProps}\n      >\n        <rect\n          fill=\"none\"\n          width=\"100%\"\n          height=\"100%\"\n          rx={rx}\n          ry={ry}\n          ref={pathRef}\n        />\n      </svg>\n      <motion.div\n        style={{\n          position: \"absolute\",\n          top: 0,\n          left: 0,\n          display: \"inline-block\",\n          transform,\n        }}\n      >\n        {children}\n      </motion.div>\n    </>\n  );\n};\n",
      "type": "registry:ui",
      "target": "components/ui/moving-border.tsx"
    }
  ],
  "author": "Manu Arora <hi@manuarora.in>",
  "title": "Moving Border"
}
```
