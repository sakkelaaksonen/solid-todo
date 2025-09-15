import { Component, For } from "solid-js";
import type { TodoStoreInstance } from "../store";
import store from "../store";


const ListSelector: Component = () => (
    <select
        id="list-select"
        class="border px-2 py-1"
        value={store.selectedListId() ?? ""}
        onInput={e => store.selectList(e.currentTarget.value)}
    >
        <option value="" disabled>Select a list</option>
        <For each={store.getLists()}>{list => (
            <option value={list.id}>{list.name}</option>
        )}</For>
    </select>
);

export default ListSelector;
