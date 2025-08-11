import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./lib/utils";

interface ScrimrProps {
  isLoading: boolean;
  children: React.ReactNode;
  length?: number;            // visible placeholder length
  speed?: number;             // ms
  chars?: string;             // character pool
  className?: string;
  placeholderLabel?: string;  // a11y label for loading content
  partialUpdateRatio?: number;// 0~1, portion of chars to mutate per tick
}

const DEFAULT_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*    ";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const pick = (chars: string) =>
  chars[Math.floor(Math.random() * chars.length)];

/** mutate only some positions for a smoother effect */
function mutateText(
  text: string,
  chars: string,
  ratio: number
): string {
  if (!text) return text;
  const arr = text.split("");
  const changes = Math.max(1, Math.floor(arr.length * ratio));
  for (let i = 0; i < changes; i++) {
    const idx = Math.floor(Math.random() * arr.length);
    arr[idx] = pick(chars);
  }
  return arr.join("");
}

export const Scrimr: React.FC<ScrimrProps> = ({
  isLoading,
  children,
  length = 20,
  speed = 30,
  chars = DEFAULT_CHARS,
  className,
  placeholderLabel = "Loading content",
  partialUpdateRatio = 0.8,
}) => {
  const safeLength = clamp(Math.floor(length), 1, 5000);
  const hasChars = typeof chars === "string" && chars.length > 0;
  const pool = hasChars ? chars : DEFAULT_CHARS;

  const [text, setText] = useState<string>("");
  const timerRef = useRef<number | ReturnType<typeof setInterval> | undefined>(undefined);

  // reduced motion support
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (timerRef.current) {
        clearInterval(timerRef.current as number);
        timerRef.current = undefined;
      }
      return;
    }

    // initial text
    setText(Array.from({ length: safeLength }, () => pick(pool)).join(""));

    const interval = prefersReducedMotion ? 400 : speed;

    const tick = () => {
      // pause when tab hidden to save cycles
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setText((prev) => {
        if (!prev) {
          return Array.from({ length: safeLength }, () => pick(pool)).join("");
        }
        return mutateText(prev, pool, clamp(partialUpdateRatio, 0.05, 1));
      });
    };

    timerRef.current = setInterval(tick, interval);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current as number);
        timerRef.current = undefined;
      }
    };
  }, [isLoading, safeLength, pool, speed, partialUpdateRatio, prefersReducedMotion]);

  if (!isLoading) return <>{children}</>;

  return (
    <span
      className={cn(
        "block animate-pulse text-gray-400 select-none font-mono truncate",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={placeholderLabel}
      aria-busy="true"
    >
      <span aria-hidden="true">{text}</span>
    </span>
  );
};

export default Scrimr