const STORAGE_KEY = "neotron_panel_layout";

export function savePanelLayout(state: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadPanelLayout() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}