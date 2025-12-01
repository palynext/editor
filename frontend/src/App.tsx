import Layout from "./components/layout/layout";
import PanelContainer from "./components/layout/panels/PanelContainer";
import { EventsOn } from "../wailsjs/runtime";
import { usePanelManager } from "./core/panel/PanelManager";

function App() {
 
  return (
    <Layout>
      {/* Your app components go here */}
      <PanelContainer />
    </Layout>
  );
}

export default App;
