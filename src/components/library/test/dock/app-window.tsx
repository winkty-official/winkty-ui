import React, { useRef, useEffect, useState } from 'react';
import { X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
}

export function AppWindow({ title, isOpen, onClose, onMinimize, children }: AppWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [minimizeTarget, setMinimizeTarget] = useState({ x: 0, y: 0 });
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsMinimizing(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateMinimizeTarget = () => {
      const dockIcon = document.querySelector(`[data-app="${title.toLowerCase()}"]`);
      if (dockIcon && windowRef.current) {
        const iconRect = dockIcon.getBoundingClientRect();
        const windowRect = windowRef.current.getBoundingClientRect();
        
        setMinimizeTarget({
          x: iconRect.left - windowRect.left + (iconRect.width - windowRect.width) / 2,
          y: iconRect.top - windowRect.top + (iconRect.height - windowRect.height) / 2
        });
      }
    };

    if (isOpen && !isMinimizing && !isClosing) {
      updateMinimizeTarget();
      window.addEventListener('resize', updateMinimizeTarget);
      return () => window.removeEventListener('resize', updateMinimizeTarget);
    }
  }, [isOpen, isMinimizing, isClosing, title]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onMinimize();
      setIsClosing(false);
    }, 300);
  };

  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      onMinimize();
      setIsMinimizing(false);
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={windowRef}
          initial={{ 
            opacity: 0,
            scale: 0.8,
            y: 20
          }}
          animate={
            isMinimizing || isClosing
              ? {
                  scale: 0.5,
                  opacity: 0,
                  x: minimizeTarget.x,
                  y: minimizeTarget.y,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }
              : {
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }
          }
          exit={{
            scale: 0.8,
            opacity: 0,
            y: 20,
            transition: {
              duration: 0.2
            }
          }}
          className="fixed left-[30%] top-[30%] w-[600px] -translate-x-1/2 -translate-y-1/2 
                     overflow-hidden rounded-lg bg-gray-800 shadow-2xl"
          style={{
            transformOrigin: 'center center',
            pointerEvents: isMinimizing || isClosing ? 'none' : 'auto'
          }}
          layoutId={`window-${title.toLowerCase()}`}
        >
          <motion.div
            className="flex items-center justify-between bg-gray-900 px-4 py-2"
            layout
          >
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="group h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600"
              >
                <X className="h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <button
                onClick={handleMinimize}
                className="group h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
              >
                <Minus className="h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
            <span className="text-sm text-gray-400">{title}</span>
            <div className="w-16" />
          </motion.div>
          <motion.div
            className="p-4"
            layout
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}