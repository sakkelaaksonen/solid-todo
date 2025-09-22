import { Component, createSignal, Show } from "solid-js";
import store from "../../store/store";
import { For } from "solid-js";
import { IconLookingGlass, IconClose, IconCheck, IconListBullets, IconInfo } from "../ui/Icons";


type Props = {
  onSelectList?: (listId: string) => void;
}

const DrawerListSelector: Component<Props> = ({ onSelectList }) => {
  const [searchQuery, setSearchQuery] = createSignal("");

  const handleSelect = (listId: string) => {
    store.selectList(listId);
    onSelectList?.(listId);
  }


  const filteredLists = () => {
    return store.getLists().filter(list => list.name.toLowerCase().includes(searchQuery().toLowerCase()));
  };

  return (
    <>
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
          aria-label="Search lists"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          id="list-search"
          value={searchQuery()}
        />
      </label>
      <div class="divider"></div>
      <ul class="menu min-h-full w-full">
        <For each={filteredLists()} fallback={<li>No lists found</li>}>{list => (
          <li class="pb-2">


            <Show when={store.selectedListId() === list.id}>
              <span class="btn-lg join-item btn btn-primary w-full text-start">
                {list.name}

                <span class="ml-auto " aria-label={`${list.tasks.length} tasks in this list`}>
                  <Show when={list.tasks.length > 0} fallback={<IconInfo />}>
                    <IconListBullets />
                  </Show>
                </span>
              </span>


            </Show>

            <Show when={store.selectedListId() !== list.id}>
              <button
                onClick={() => handleSelect(list.id)}
                class="btn hover:btn-primary btn-lg  w-full group "
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
    </>
  )
}

export default DrawerListSelector;
