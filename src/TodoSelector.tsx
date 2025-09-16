
import { For, Show, Component } from "solid-js";
import store from "./store.ts";


import { IconCheck } from "./components/Icons.tsx";

const TodoSelector = () => {
    return (
        <div class="mb-4 flex gap-2 items-center">
            <For each={store.getLists()}>{list => (
                <button class="btn btn-xs" classList={{
                    "btn-primary": store.selectedListId() !== list.id,
                    "btn-info": store.selectedListId() === list.id
                }}
                    onClick={() => store.selectList(list.id)}>
                    <Show when={store.selectedListId() === list.id}><IconCheck /></Show>
                    {list.name}
                </button>
            )}</For>

        </div>)
}
export default TodoSelector;