import { PanelDescriptor } from "./PanelTypes";

class PanelRegistry {
  private panels = new Map<string, PanelDescriptor>();

  register(panel: PanelDescriptor) {
    this.panels.set(panel.id, panel);
  }

  get(panelId: string) {
    return this.panels.get(panelId);
  }

  all() {
    return [...this.panels.values()];
  }

  unregister(panelId: string) {
    this.panels.delete(panelId);
  }
}

export const panelRegistry = new PanelRegistry();