
import { For, Show, type Component } from "solid-js";
import { StoreProps } from "../../store/store.ts";
import { IconCheck } from "../ui/Icons.tsx";

const TodoSelector: Component<StoreProps> = (props) => {

  alert("OLD TodoSelector - use ListSelector instead");
  return (
    <div class="mb-4 flex gap-2 items-center">
      <For each={props.actions.getLists()}>{list => (
        <button class="btn btn-xs" classList={{
          "btn-primary": props.actions.selectedListId() !== list.id,
          "btn-info": props.actions.selectedListId() === list.id
        }}
          onClick={() => props.actions.selectList(list.id)}>
          <Show when={props.actions.selectedListId() === list.id}><IconCheck /></Show>
          {list.name}
        </button>
      )}</For>

    </div>)
}
export default TodoSelector;
