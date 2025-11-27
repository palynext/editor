import { useEffect } from "react";
import { panelRegistry } from "./core/panel/PanelRegistry";
import EditorPanel from "./components/panels/EditorPanel";
import { PanelDescriptor } from "./core/panel/PanelTypes";
import { usePanelManager } from "./core/panel/PanelManager";
import { Button } from "./components/ui/button";
import PanelContainer from "./components/layout/panels/PanelContainer";
import Footer from "./components/layout/footer";

const MyPluginPanel: PanelDescriptor = {
  id: "myplugin.panel",
  title: "Plugin Panel",
  component: EditorPanel,
  defaultSize: { w: 400, h: 300 },
  dock: "float",
};

function App() {
  const { openPanel } = usePanelManager();
  useEffect(() => {
    // Register the plugin panel when the component mounts
    panelRegistry.register(MyPluginPanel);

    // Cleanup function to unregister the panel when the component unmounts
    return () => {
      panelRegistry.unregister(MyPluginPanel.id);
    };
  }, []);
  return (
    <div id="App" className="flex h-full flex-col bg-gray-900 text-white">
      <PanelContainer />
      <Button onClick={() => openPanel("myplugin.panel", "left")}>
        Open Plugin Panel
      </Button>

      <div className="flex-1" />
      <Footer />
    </div>
  );
}

export default App;
