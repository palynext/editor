import React from "react";
import { usePanelManager } from "../../../core/panel/PanelManager";
import DockArea from "./DockArea";
import FloatingPanel from "./FloatingPanel";

export default function PanelContainer() {
  const panels = usePanelManager((s) => s.panels);

  return (
    <>
      {/* Docked panels */}
      <DockArea
        side="left"
        panels={panels.filter(
          (p) => p.position === "dock" && p.dockSide === "left"
        )}
      />
      <DockArea
        side="right"
        panels={panels.filter(
          (p) => p.position === "dock" && p.dockSide === "right"
        )}
      />
      <DockArea
        side="bottom"
        panels={panels.filter(
          (p) => p.position === "dock" && p.dockSide === "bottom"
        )}
      />

      {/* Floating panels */}
      {panels
        .filter((p) => p.position === "float")
        .map((panel) => (
          <FloatingPanel key={panel.instanceId} panel={panel} />
        ))}
    </>
  );
}
