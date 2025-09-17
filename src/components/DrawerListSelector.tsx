import { Component, createSignal, Show } from "solid-js";
import store from "../store";
import { For } from "solid-js";
import { IconLookingGlass, IconClose } from "./Icons";

const DrawerListSelector: Component = () => {
    const [searchQuery, setSearchQuery] = createSignal("");

    const handleSelect = (listId: string) => {
        store.selectList(listId);
    }

    const filteredLists = () => {
        return store.getLists().filter(list => list.name.toLowerCase().includes(searchQuery().toLowerCase()));
    };

    return (
        <div class="p-4">
            <label for="list-search" class="input input-sm input-primary ">
                <span class="label">
                    <Show when={searchQuery().length === 0}>
                        <IconLookingGlass />
                    </Show>
                    <Show when={searchQuery().length > 0}>
                        <button onClick={() => setSearchQuery("")} class="btn-ghost btn-xs text-primary">
                            <IconClose />
                        </button>
                    </Show>
                </span>

                <input
                    type="text"
                    placeholder="Search lists..."
                    // class="input input-sm input-primary w-full mb-4"
                    onInput={(e) => setSearchQuery(e.currentTarget.value)}
                    id="list-search"
                />
            </label>
            <div class="divider"></div>
            <ul class="menu min-h-full">
                <For each={filteredLists()}>{list => (
                    <li class="pb-2"><button
                        onClick={() => handleSelect(list.id)}
                        class="btn btn-neutral btn-xs  hover:btn-primary"
                        classList={{
                            "btn-primary": store.selectedListId() === list.id,
                            "btn-neutral": store.selectedListId() !== list.id
                        }}

                    >{list.name}</button></li>
                )}</For>
            </ul>
        </div>
    )
}

export default DrawerListSelector;