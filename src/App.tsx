import { Component } from "solid-js";
import Todos from "./Todos";
import EditableListTitle from "./components/EditableListTitle";
import AddNewListForm from "./components/AddNewListForm.tsx";
import Navi from "./components/Navi";
import DrawerListSelector from "./components/DrawerListSelector.tsx";
import { IconClose, IconListBullets } from "./components/Icons.tsx";

const App: Component = () => {
  return (
    <div class="drawer">
      <input id="navi-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <Navi />
        <Todos />
      </div>
      <div class="drawer-side min-h-full">
        <label for="navi-drawer" class="drawer-overlay"></label>
        <div class="min-h-full menu p-4 w-80 bg-base-100 text-base-content">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <IconListBullets />
              <span>All My Dos to Do</span>
            </div>
            <label for="navi-drawer" class="btn btn-xs btn-ghost hover:btn-primary">
              Close Menu
            </label>
          </div>
          <div class="divider"></div>
          <DrawerListSelector />
        </div>
      </div>
    </div>
  );
};

export default App;
