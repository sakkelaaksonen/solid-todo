import { Component, For } from "solid-js";
import type { TodoStoreInstance } from "../store";
import store from "../store";


const ListSelector: Component = () => (
    <label class="select select-accent">
        <span class="label">Choose list</span>
        <select
            id="list-select"
            class="select select-neutral select-lg"
            value={store.selectedListId() ?? ""}
            onInput={e => store.selectList(e.currentTarget.value)}
        >
            <option value="" disabled>Select a list</option>
            <For each={store.getLists()}>{list => (
                <option value={list.id}>{list.name}</option>
            )}</For>
        </select >
    </label>
);

export default ListSelector;
