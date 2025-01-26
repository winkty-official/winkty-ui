"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShipWheel as ColorWheel, Sliders, Play } from "lucide-react";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { CodeBlock } from "./code-block";

interface AnimationConfig {
  scale: number;
  rotate: number;
  duration: number;
  bounce: boolean;
}

export function LiveEditorSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [config, setConfig] = useState<AnimationConfig>({
    scale: 1,
    rotate: 0,
    duration: 0.6,
    bounce: true,
  });

  const generateCode = (config: AnimationConfig) => {
    return `<motion.div
  animate={{
    scale: ${config.scale},
    rotate: ${config.rotate},
  }}
  transition={{
    duration: ${config.duration},
    type: "${config.bounce ? "spring" : "tween"}",
    ${config.bounce ? "bounce: 0.4," : ""}
  }}
>
  Your Component
</motion.div>`;
  };

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Customize in Real-Time</h2>
          <p className="text-xl text-muted-foreground">
            Experiment with our components and see changes instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Controls
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Scale</Label>
                  <Slider
                    value={[config.scale]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={([value]) =>
                      setConfig({ ...config, scale: value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rotate (degrees)</Label>
                  <Slider
                    value={[config.rotate]}
                    min={0}
                    max={360}
                    step={15}
                    onValueChange={([value]) =>
                      setConfig({ ...config, rotate: value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (seconds)</Label>
                  <Slider
                    value={[config.duration]}
                    min={0.1}
                    max={2}
                    step={0.1}
                    onValueChange={([value]) =>
                      setConfig({ ...config, duration: value })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Bounce Effect</Label>
                  <Switch
                    checked={config.bounce}
                    onCheckedChange={(checked) =>
                      setConfig({ ...config, bounce: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <ColorWheel className="h-5 w-5" />
                Preview
              </h3>
              <div className="border rounded-lg p-8 flex items-center justify-center bg-muted/50">
                <motion.div
                  animate={{
                    scale: config.scale,
                    rotate: config.rotate,
                  }}
                  transition={{
                    duration: config.duration,
                    type: config.bounce ? "spring" : "tween",
                    bounce: config.bounce ? 0.4 : undefined,
                  }}
                  className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center text-primary-foreground"
                >
                  <Play className="h-8 w-8" />
                </motion.div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Generated Code</h3>
            <CodeBlock code={generateCode(config)} language="tsx" />
          </Card>
        </div>
      </div>
    </section>
  );
}
