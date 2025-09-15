import { Component, For } from "solid-js";
import type { TodoList, TodoStore } from "../store";

interface ListSelectorProps {
    lists: TodoList[],
    selectedListId: () => string | null,
    selectList: (id: string) => void

}

const ListSelector: Component<ListSelectorProps> = (props) => (
    <div class="mb-4 flex gap-2 items-center">
        <label for="list-select" class="font-semibold">Select list:</label>
        <select
            id="list-select"
            class="border px-2 py-1"
            value={props.selectedListId() ?? ""}
            onInput={e => props.selectList(e.currentTarget.value)}
        >
            <option selected={props.selectedListId() === ""} value="" disabled>Select a list</option>
            <For each={props.lists}>{list => (
                <option selected={props.selectedListId() === list.id} value={list.id}>{list.name}</option>
            )}</For>
        </select>
    </div>
);

export default ListSelector;
