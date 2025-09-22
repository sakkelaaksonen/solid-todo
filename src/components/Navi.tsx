import { Component } from "solid-js";
import EditableListTitle from "./Lists/EditableListTitle.tsx";
// import AddNewListForm from "./AddNewListForm.tsx";
import ListSelector from "./Lists/ListSelector.tsx";
import { IconBars } from "./ui/Icons.tsx";
type Props = {
  onClickNavi?: () => void;
}
const Navi: Component<Props> = (props) => {

  const handleDrawerToggle = () => {
    document.getElementById("navi-drawer")?.click();
    props.onClickNavi?.();
  };

  return (
    <nav class="navbar bg-secondary-content border-transparent border-b-primary border-2 shadow-sm mb-2 sticky top-0 z-10 min-h-24">


      <div class="flex-none">
        <ListSelector />
      </div>
      <div class="flex-1"></div>
      <div class="flex-none pe-4">
        <button
          class="btn btn-square btn-ghost hover:text-primary focus:btn-primary"
          aria-label="Toggle navigation drawer" /* Adds an accessible label */
          onClick={handleDrawerToggle}
        >
          <IconBars />
        </button>
      </div>

    </nav >);
}

export default Navi
