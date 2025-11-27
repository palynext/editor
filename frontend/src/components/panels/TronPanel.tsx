import React from "react";
import clsx from "clsx";
import gridSvg from "../../assest/svg/grid.svg";
interface TronPanelProps {
  children?: React.ReactNode;
  className?: string;
}
export default function TronPanel({ children, className }: TronPanelProps) {
  return (
    <div
      className={clsx(
        "h-full w-full p-2",
        "relative rounded-xl overflow-hidden",
        "bg-[rgba(0,10,20,0.45)] backdrop-blur-md",
        "border border-cyan-400/50",
        "shadow-[0_0_25px_rgba(0,255,255,0.5),inset_0_0_20px_rgba(0,255,255,0.15)]",
        "before:absolute before:inset-0 before:bg-(--grid-bg) before:bg-repeat before:opacity-20",
        className
      )}
      style={{
        ["--grid-bg" as any]: `url(${gridSvg})`,
      }}
    >
      <span className="absolute top-0 left-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute top-0 right-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute bottom-0 left-6 w-4 h-0.5 bg-cyan-400"></span>
      <span className="absolute bottom-0 right-6 w-4 h-0.5 bg-cyan-400"></span>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
