import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Minus, X } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { create } from "zustand";
import { useAppTrayStore } from "@/components/ui/app-tray";

// Store to manage z-index of windows
interface ZIndexState {
  highestZIndex: number;
  bringToFront: () => number;
}

export const useZIndexStore = create<ZIndexState>((set, get) => ({
  highestZIndex: 100, // Starting z-index (must be below dock)
  bringToFront: () => {
    set((state) => {
      const newZIndex = state.highestZIndex + 1;
      return { highestZIndex: newZIndex };
    });
    return get().highestZIndex;
  },
}));

/**
 * Props for the AppWindow component.
 */
interface AppWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the application window.
   */
  title: string;

  /**
   * Unique identifier for the application.
   */
  appId: string;

  /**
   * Content inside the application window.
   */
  children: React.ReactNode;

  /**
   * Optional className for styling.
   */
  className?: string;

  /**
   * Optional ref for the window container.
   */
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * A draggable, animated application window component.
 *
 * @component
 * @example
 * ```tsx
 * <AppWindow title="My App" appId="app-1">
 *   <p>My app content</p>
 * </AppWindow>
 * ```
 *
 * @param {AppWindowProps} props - The component props.
 * @returns {JSX.Element} The rendered AppWindow component.
 */
export const AppWindow = forwardRef<HTMLDivElement, AppWindowProps>(
  ({ title, children, appId, className, containerRef }, ref) => {
    const { openApps, minimizeApp, closeApp } = useAppTrayStore();
    const isOpen = openApps.has(appId);

    const windowRef = useRef<HTMLDivElement>(null);
    const mergedRef = (ref as React.RefObject<HTMLDivElement>) || windowRef;

    const [minimizeTarget, setMinimizeTarget] = useState({ x: 0, y: 0 });
    const [isMinimizing, setIsMinimizing] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Track zIndex of this window
    const { highestZIndex, bringToFront } = useZIndexStore();
    const [zIndex, setZIndex] = useState(highestZIndex);

    const containerCtxRef = useContext(AppWindowContainerContext);
    const dragContainerRef = containerRef || containerCtxRef;

    useEffect(() => {
      if (!isOpen) {
        setIsMinimizing(false);
        setIsClosing(false);
      }
    }, [isOpen]);

    useLayoutEffect(() => {
      if (isOpen) {
        const height = mergedRef.current?.offsetHeight;
        const width = mergedRef.current?.offsetWidth;
        mergedRef.current?.style.setProperty("--window-height", `${height}px`);
        mergedRef.current?.style.setProperty("--window-width", `${width}px`);
      }
    }, [isOpen, mergedRef]);

    useEffect(() => {
      const updateMinimizeTarget = () => {
        const dockIcon = document.querySelector(
          `[data-app="${title.toLowerCase()}"]`,
        );
        if (dockIcon && mergedRef.current) {
          const iconRect = dockIcon.getBoundingClientRect();
          const windowRect = mergedRef.current.getBoundingClientRect();

          setMinimizeTarget({
            x:
              iconRect.left -
              windowRect.left +
              (iconRect.width - windowRect.width) / 2,
            y:
              iconRect.top -
              windowRect.top +
              (iconRect.height - windowRect.height) / 2,
          });
        }
      };

      if (isOpen && !isMinimizing && !isClosing) {
        updateMinimizeTarget();
        window.addEventListener("resize", updateMinimizeTarget);
        return () => window.removeEventListener("resize", updateMinimizeTarget);
      }
    }, [isOpen, isMinimizing, isClosing, title, mergedRef]);

    const handleClose = (appId: string) => {
      setIsClosing(true);
      setTimeout(() => {
        closeApp(appId);
        setIsClosing(false);
      }, 300);
    };

    const handleMinimize = (appId: string) => {
      setIsMinimizing(true);
      setTimeout(() => {
        minimizeApp(appId);
        setIsMinimizing(false);
      }, 300);
    };

    const handleClick = () => {
      setZIndex(bringToFront());
    };

    const dragControls = useDragControls();

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={mergedRef}
            onMouseDown={handleClick} // Bring window to front when clicked
            initial={{
              cursor: "grab",
              opacity: 0,
              scale: 0.8,
              y: 20,
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
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    },
                  }
            }
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 20,
              transition: {
                duration: 0.2,
              },
            }}
            className={`fixed inset-0 left-[30%] top-[30%] w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-gray-800 shadow-2xl ${className}`}
            style={{
              transformOrigin: "center center",
              pointerEvents: isMinimizing || isClosing ? "none" : "auto",
              zIndex,
            }}
            layoutId={`window-${title.toLowerCase()}`}
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            whileDrag={{
              cursor: "grabbing",
            }}
            {...(dragContainerRef && { dragConstraints: dragContainerRef })}
          >
            <motion.div
              className="top-0 z-10 flex w-full items-center justify-between bg-gray-900 px-4 py-2"
              layout
              onPointerDown={(e) => {
                dragControls.start(e);
              }}
            >
              <div className="group flex gap-2">
                <button
                  onClick={() => handleClose(appId)}
                  className="rounded-full bg-red-500 p-[.5] transition-colors hover:bg-red-600"
                >
                  <X className="size-[0.625rem] text-black" />
                </button>
                <button
                  onClick={() => handleMinimize(appId)}
                  className="rounded-full bg-yellow-500 p-[.5] transition-colors hover:bg-yellow-600"
                >
                  <Minus className="size-[0.625rem] text-black" />
                </button>
              </div>
              <span className="pointer-events-none select-none text-sm text-gray-400">
                {title}
              </span>
              <div className="w-16" />
            </motion.div>
            <motion.div
              className="p-4"
              style={{
                cursor: "default",
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

AppWindow.displayName = "AppWindow";

interface AppWindowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The top position of the container. Can be a number (pixels) or a CSS string.
   * @default "74px"
   */
  top?: number | string;

  /**
   * The bottom position of the container. Can be a number (pixels) or a CSS string.
   * @default "74px"
   */
  bottom?: number | string;

  /**
   * Custom styles for the container. Allows full flexibility to override defaults.
   */
  style?: React.CSSProperties;
}

export const AppWindowContainerContext =
  createContext<React.RefObject<HTMLDivElement> | null>(null);

/**
 * A container component that provides a fixed positioning context for draggable windows.
 * Allows dynamic styling and forward ref support for greater flexibility.
 *
 * @component
 * @example
 * ```tsx
 * <AppWindowContainer top="50px" bottom="50px" style={{ background: "rgba(0,0,0,0.5)" }}>
 *   <AppWindow title="My App">App Content</AppWindow>
 * </AppWindowContainer>
 * ```
 *
 * @param {AppWindowContainerProps} props - The component props.
 * @returns {JSX.Element} The rendered AppWindowContainer component.
 */
export const AppWindowContainer = forwardRef<
  HTMLDivElement,
  AppWindowContainerProps
>(
  (
    { children, top = "74px", bottom = "74px", className, style, ...props },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const containerRef =
      (ref as React.RefObject<HTMLDivElement>) || internalRef;

    return (
      <AppWindowContainerContext.Provider value={containerRef}>
        <div
          ref={containerRef}
          style={{
            pointerEvents: "none",
            position: "fixed",
            top,
            left: 0,
            right: 0,
            bottom,
            ...style, // Merge custom styles
          }}
          className={className} // Allow custom class names
          {...props} // Spread extra props (e.g., event handlers)
        >
          {children}
        </div>
      </AppWindowContainerContext.Provider>
    );
  },
);

AppWindowContainer.displayName = "AppWindowContainer";
