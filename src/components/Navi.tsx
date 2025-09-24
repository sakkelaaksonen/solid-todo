import { Component } from "solid-js";
import ListSelector from "./Lists/ListSelector.tsx";
import { IconBars } from "./ui/Icons.tsx";
import type { StoreProps } from "../store/store.ts";


type Props = StoreProps & {
  onClickNavi?: () => void;
}
const Navi: Component<Props> = (props) => {

  const handleDrawerToggle = () => {
    document.getElementById("navi-drawer")?.click();
    props.onClickNavi?.();
  };

  return (
    <nav class="navbar bg-secondary-content border-transparent border-b-primary border-2 shadow-sm mb-2 sticky top-0 z-10 min-h-24 gap-1">
      <ListSelector store={props.store} actions={props.actions} />
      <div class="flex-1"></div>
      <div class="flex-none pe-4">
        <button
          title="Manage Todo Lists"
          class="btn max-md:btn-square btn-primary"
          aria-label="Manage Todo Lists" /* Adds an accessible label */
          onClick={handleDrawerToggle}
        >

          <IconBars />
          <span class="hidden md:inline">Manage Todo Lists</span>
        </button>
      </div>

    </nav >);
}

export default Navi
