import { Component, createSignal, Show } from "solid-js";
import Todos from "./components/Todos/Todos.tsx";
import Navi from "./components/Navi";
import DrawerSide from "./components/Lists/DrawerSide.tsx";
import { useTodoStore, TaskNamePattern } from "./store/store.ts";

const App: Component = () => {

  const [drawerOpen, setDrawerOpen] = createSignal(false);
  const [store, actions] = useTodoStore();

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div class="drawer">
      <input id="navi-drawer" type="checkbox" class="drawer-toggle" aria-label="Navigation drawer toggle" />
      <div class="drawer-content">

        <Navi onClickNavi={openDrawer} store={store} actions={actions} />
        <Todos store={store} actions={actions} />
      </div>
      <Show when={drawerOpen}>
        <DrawerSide isOpen={drawerOpen} onClose={closeDrawer} store={store} actions={actions} />
      </Show>
    </div >
  );
};

export default App;
