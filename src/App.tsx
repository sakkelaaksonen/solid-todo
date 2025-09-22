import { Component, createSignal, Show } from "solid-js";
import Todos from "./components/Todos/Todos.tsx";
import Navi from "./components/Navi";
import DrawerSide from "./components/Lists/DrawerSide.tsx";

const App: Component = () => {

  const [drawerOpen, setDrawerOpen] = createSignal(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div class="drawer">
      <input id="navi-drawer" type="checkbox" class="drawer-toggle" aria-label="Navigation drawer toggle" />
      <div class="drawer-content">
        <Navi onClickNavi={openDrawer} />
        <Todos />
      </div>
      <Show when={drawerOpen}>
        <DrawerSide isOpen={drawerOpen} onClose={closeDrawer} />
      </Show>
    </div >
  );
};

export default App;
