import TronPanel from "@/components/panels/TronPanel";
import { usePanelManager } from "@/core/panel/PanelManager";
import { panelRegistry } from "@/core/panel/PanelRegistry";
import { PanelInstance } from "@/core/panel/PanelTypes";

export default function FloatingPanel({ panel }: { panel: PanelInstance }) {
  const { movePanel, closePanel, focusPanel } = usePanelManager();
  const desc = panelRegistry.get(panel.panelId);
  const Component = desc?.component;

  return (
    <div
      className="floating-panel neon-glow absolute"
      style={{
        left: panel.x,
        top: panel.y,
        width: panel.w,
        height: panel.h,
        zIndex: panel.zIndex,
      }}
      onMouseDown={() => {
        focusPanel(panel.instanceId);
      }}
    >
      <TronPanel className="h-full">
        <div
          className="flex justify-between items-center px-4 py-2 border-b border-cyan-400/30"
          onMouseDown={(e) => {
            const offsetX = e.clientX - panel.x!;
            const offsetY = e.clientY - panel.y!;
            const move = (ev: MouseEvent) => {
              movePanel(panel.instanceId, {
                x: ev.clientX - offsetX,
                y: ev.clientY - offsetY,
              });
            };
            const stop = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", stop);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", stop);
          }}
        >
          <span className="font-semibold tracking-wide text-cyan-300">
            {desc?.title ?? "Hub Panel"}
          </span>

          <button
            onClick={() => closePanel(panel.instanceId)}
            className="text-cyan-400 hover:text-cyan-200"
          >
            ✕
          </button>
        </div>

        <div className="overflow-auto h-[calc(100%-48px)]">
          {Component && <Component />}
        </div>
      </TronPanel>
      {/* Resize handle (bottom-right corner) */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const startY = e.clientY;
          const startW = panel.w!;
          const startH = panel.h!;
          const resize = (ev: MouseEvent) => {
            const newW = Math.max(150, startW + (ev.clientX - startX));
            const newH = Math.max(100, startH + (ev.clientY - startY));
            movePanel(panel.instanceId, { w: newW, h: newH });
          };
          const stop = () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stop);
          };
          window.addEventListener("mousemove", resize);
          window.addEventListener("mouseup", stop);
        }}
      />

      {/* Resize handle (bottom-left corner) */}
      <div
        className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const startY = e.clientY;
          const startW = panel.w!;
          const startH = panel.h!;
          const startXPos = panel.x!;
          const resize = (ev: MouseEvent) => {
            const deltaX = ev.clientX - startX;
            const newW = Math.max(150, startW - deltaX);
            const newX = startXPos + deltaX;
            const newH = Math.max(100, startH + (ev.clientY - startY));
            movePanel(panel.instanceId, { w: newW, h: newH, x: newX });
          };
          const stop = () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stop);
          };
          window.addEventListener("mousemove", resize);
          window.addEventListener("mouseup", stop);
        }}
      />

      {/* Resize handle (top-right corner) */}
      <div
        className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const startY = e.clientY;
          const startW = panel.w!;
          const startH = panel.h!;
          const startYPos = panel.y!;
          const resize = (ev: MouseEvent) => {
            const deltaY = ev.clientY - startY;
            const newH = Math.max(100, startH - deltaY);
            const newY = startYPos + deltaY;
            const newW = Math.max(150, startW + (ev.clientX - startX));
            movePanel(panel.instanceId, { w: newW, h: newH, y: newY });
          };
          const stop = () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stop);
          };
          window.addEventListener("mousemove", resize);
          window.addEventListener("mouseup", stop);
        }}
      />

      {/* Resize handle (top-left corner) */}
      <div
        className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-50"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const startY = e.clientY;
          const startW = panel.w!;
          const startH = panel.h!;
          const startXPos = panel.x!;
          const startYPos = panel.y!;
          const resize = (ev: MouseEvent) => {
            const deltaX = ev.clientX - startX;
            const deltaY = ev.clientY - startY;
            const newW = Math.max(150, startW - deltaX);
            const newH = Math.max(100, startH - deltaY);
            const newX = startXPos + deltaX;
            const newY = startYPos + deltaY;
            movePanel(panel.instanceId, { w: newW, h: newH, x: newX, y: newY });
          };
          const stop = () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stop);
          };
          window.addEventListener("mousemove", resize);
          window.addEventListener("mouseup", stop);
        }}
      />
    </div>
  );
}
