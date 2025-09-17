import { Component, For } from "solid-js";
import type { TodoStoreInstance } from "../store";
import store from "../store";


const ListSelector: Component = () => (
    <span class="hidden md:inline-block">
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
    </span >
);

export default ListSelector;
