import { Component, For } from "solid-js";
import store from "../../store/store";

const ListSelector: Component = () => (

  <label class="select select-primary select-sm ">
    <span class="label">Select a list</span>
    <select
      id="list-select"
      class="select select-neutral select-sm"
      value={store.selectedListId() ?? ""}
      onInput={e => store.selectList(e.currentTarget.value)}
    >
      <option value="" disabled>Select a list</option>
      <For each={store.getLists()}>{list => (
        <option value={list.id}>{list.name}</option>
      )}</For>
    </select >
  </label >
);

export default ListSelector;
