import { Component } from "solid-js";
import EditableListTitle from "./EditableListTitle";
// import AddNewListForm from "./AddNewListForm.tsx";
import ListSelector from "./ListSelector.tsx";
import { IconBars } from "./Icons.tsx";
type Props = {
  onClickNavi?: () => void;
}
const Navi: Component<Props> = (props) => {
  return (
    <nav class="navbar bg-secondary-content border-transparent border-b-primary border-2 shadow-sm mb-2 sticky top-0 z-10 min-h-24">
      <div class="flex-none pe-4">
        {/* <label for="navi-drawer" class="hidden" aria-disabled="true">Toggle navigation drawer</label> */}
        <button
          class="btn btn-square btn-ghost hover:text-primary focus:btn-primary"
          aria-label="Toggle navigation drawer" /* Adds an accessible label */
          onClick={() => {
            document.getElementById("navi-drawer")?.click();
            props.onClickNavi?.();
          }} /* Simulate click on the drawer input */
        >
          <IconBars />
        </button>
      </div>

      <div class="flex-none">
        <ListSelector />
      </div>

    </nav >);
}

export default Navi
