import React from "react";
import clsx from "clsx";
interface TronPanelProps {
  children?: React.ReactNode;
  className?: string;
}
export default function TronPanel({ children, className }: TronPanelProps) {
  return (
    <div
      className={clsx(
        "relative before:bg-hud-grid before:absolute before:inset-0 border border-cyan-400/10 rounded-xl overflow-hidden",
        "shadow-[0_0_15px_rgba(0,255,255,0.10),inset_0_0_5px_rgba(0,255,255,0.12)]",
        className
      )}
    >
      <span className="absolute top-0 left-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute top-0 right-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute bottom-0 left-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute bottom-0 right-6 w-4 h-0.5 bg-cyan-400"></span>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
