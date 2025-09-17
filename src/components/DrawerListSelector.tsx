import { Component, createSignal, Show } from "solid-js";
import store from "../store";
import { For } from "solid-js";
import { IconLookingGlass, IconClose, IconCheck, IconListBullets, IconInfo } from "./Icons";

const DrawerListSelector: Component = () => {
    const [searchQuery, setSearchQuery] = createSignal("");

    const handleSelect = (listId: string) => {
        store.selectList(listId);
    }

    const handleRemove = (listId: string) => {
        store.deleteList(listId);
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
                    value={searchQuery()}
                />
            </label>
            <div class="divider"></div>
            <ul class="menu min-h-full w-full">
                <For each={filteredLists()}>{list => (
                    <li class="pb-2">


                        <Show when={store.selectedListId() === list.id}>
                            <span class="btn-xs join-item btn btn-primary w-full text-start">
                                {list.name}

                                <span class="ml-auto " aria-label={`${list.tasks.length} tasks in this list`}>
                                    <Show when={list.tasks.length > 0} fallback={<IconInfo />}>
                                        <IconListBullets />
                                    </Show>
                                </span>
                            </span>


                        </Show>

                        {/* <Show when={store.selectedListId() === list.id}>
                            <label class="btn-xs join-item">
                                {list.name}


                            </label>
                            <button
                                onClick={() => handleRemove(list.id)}
                                class="btn hover:btn-primary btn-xs btn-ghost inline join-item"
                                classList={{
                                    "btn-primary": store.selectedListId() === list.id,
                                    "btn-ghost": store.selectedListId() !== list.id
                                }}

                            >
                                <IconClose />
                            </button>

                        </Show> */}

                        <Show when={store.selectedListId() !== list.id}>
                            <button
                                onClick={() => handleSelect(list.id)}
                                class="btn hover:btn-primary btn-xs  w-full group "
                                classList={{
                                    "btn-primary": store.selectedListId() === list.id,
                                    "btn-ghost": store.selectedListId() !== list.id,
                                }}
                            >         {list.name}
                                <span class="ml-auto group-hover:inline hidden">
                                    <IconCheck />
                                </span>

                            </button>
                        </Show>
                    </li>
                )}</For>
            </ul >
        </div >
    )
}

export default DrawerListSelector;