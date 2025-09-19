import { Component, createSignal, Show } from "solid-js";
import Todos from "./Todos";
import Navi from "./components/Navi";
import DrawerSide from "./components/DrawerSide.tsx";

const App: Component = () => {

  const [drawerOpen, setDrawerOpen] = createSignal(false);


  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div class="drawer">
      <input id="navi-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navi onClickNavi={openDrawer} />
        <Todos />
      </div>
      <DrawerSide isOpen={drawerOpen} onClose={closeDrawer} />

      {/* <Show when={drawerOpen()}>
        <div class="drawer-side min-h-full">
          <label for="navi-drawer" class="drawer-overlay"></label>
          <div class="min-h-full menu p-4 w-80 bg-base-100 text-base-content">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">

                <label for="navi-drawer" id="navi-drawer-label" class="btn btn-xs btn-ghost hover:text-primary">
                  <IconListBullets />
                </label>
                <span>All My Dos to Do <span class="text-primary font-bold">({store.listCount()}) </span> </span>
              </div>


            </div>
            <div class="divider"></div>
            <AddNewListForm />
            <div class="divider"></div>
            <DrawerListSelector />
          </div>
        </div>
      </Show> */}


    </div >
  );
};

export default App;
