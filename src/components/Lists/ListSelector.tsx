import { Component, For } from "solid-js";
import type { StoreProps } from "../../store/store";

const ListSelector: Component<StoreProps> = (props) => {


  return (
    <label class="select select-primary  ">
      <span class="label">Select a list</span>
      <select
        id="list-select"
        class="select select-neutral"
        value={props.store.selectedListId ?? ""}
        onInput={e => props.actions.selectList(e.currentTarget.value)}
      >
        <option value="" disabled>Select a list</option>
        <For each={props.store.lists}>{list => (
          <option value={list.id}>{list.name}</option>
        )}</For>
      </select >
    </label >
  );
};

export default ListSelector;
