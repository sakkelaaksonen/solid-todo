import { Component, createSignal, Show } from "solid-js";
import { type StoreActions, StoreProps } from "../../store/store";
import { For } from "solid-js";
import { IconLookingGlass, IconClose, IconCheck, IconListBullets, IconInfo } from "../ui/Icons";


type Props = {
  actions: StoreActions;
  onSelectList?: (listId: string) => void;
}

const DrawerListSelector: Component<Props> = (props) => {
  const [searchQuery, setSearchQuery] = createSignal("");

  const handleSelect = (listId: string) => {
    props.actions.selectList(listId);
    props.onSelectList?.(listId);
  }


  const filteredLists = () => {
    return props.actions.getLists().filter(list => list.name.toLowerCase().includes(searchQuery().toLowerCase()));
  };

  return (
    <>
      <label for="list-search" class="input w-full input-primary ">
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
        <For each={filteredLists().reverse()} fallback={<li>No lists found</li>}>{list => (
          <li class="pb-2">
            <Show when={props.actions.selectedListId() === list.id}>
              <span class="text-lg join-item w-full text-start text-primary">
                <span class="">
                  <IconCheck />
                </span>
                {list.name}
              </span>

            </Show>

            <Show when={props.actions.selectedListId() !== list.id}>
              <button
                onClick={() => handleSelect(list.id)}
                aria-label={`Select list ${list.name}`}
              >
                <span class="scale-75">
                  <Show when={list.tasks.length > 0} fallback={<IconInfo />}>
                    <IconListBullets />
                  </Show>
                </span>
                {list.name}
              </button>
            </Show>
          </li>
        )}</For>
      </ul >
    </>
  )
}

export default DrawerListSelector;
