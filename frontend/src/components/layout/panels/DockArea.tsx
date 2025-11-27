import { panelRegistry } from "@/core/panel/PanelRegistry";
import { PanelInstance } from "@/core/panel/PanelTypes";

export default function DockArea({
  side,
  panels,
}: {
  side: string;
  panels: PanelInstance[];
}) {
  return (
    <div className={`dock-area dock-${side}`}>
      {panels.map((panel) => {
        const desc = panelRegistry.get(panel.panelId);
        if (!desc) return null;

        const Component = desc.component;

        return (
          <div key={panel.instanceId} className="dock-panel neon-border">
            <Component />
          </div>
        );
      })}
    </div>
  );
}
