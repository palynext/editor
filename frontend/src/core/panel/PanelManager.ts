import { create } from "zustand";
import { nanoid } from "nanoid";
import { PanelInstance } from "./PanelTypes";
import { panelRegistry } from "./PanelRegistry";
import { savePanelLayout, loadPanelLayout } from "./PanelStorage";

export interface PanelManagerState {
  panels: PanelInstance[];

  openPanel: (panelId: string, dock?: PanelInstance["dockSide"]) => void;
  closePanel: (instanceId: string) => void;

  movePanel: (instanceId: string, pos: Partial<PanelInstance>) => void;
  saveLayout: () => void;
  restoreLayout: () => void;
}

export const usePanelManager = create<PanelManagerState>((set, get) => ({
  panels: [],

  openPanel: (panelId, dock = "right") => {
    const desc = panelRegistry.get(panelId);
    if (!desc) return;

    set((state) => ({
      panels: [
        ...state.panels,
        {
          instanceId: nanoid(),
          panelId,
          position: desc.dock === "float" ? "float" : "dock",
          dockSide: desc.dock === "float" ? undefined : (desc.dock ?? dock),
          x: 200,
          y: 200,
          w: desc.defaultSize?.w ?? 400,
          h: desc.defaultSize?.h ?? 300,
        },
      ],
    }));
  },

  closePanel: (instanceId) =>
    set((state) => ({
      panels: state.panels.filter((p) => p.instanceId !== instanceId),
    })),

  movePanel: (instanceId, pos) =>
    set((state) => ({
      panels: state.panels.map((p) =>
        p.instanceId === instanceId ? { ...p, ...pos } : p
      ),
    })),

  saveLayout: () => {
    const { panels } = get();
    savePanelLayout(panels);
  },

  restoreLayout: () => {
    const loaded = loadPanelLayout();
    if (loaded) set({ panels: loaded });
  },
}));
