import { Component, Show } from "solid-js";
import store, { type TaskStatus, type Task, type FilterTypes } from "../store.ts";
import { IconClose } from "./Icons.tsx";

type Props = {
  taskFilter: FilterTypes
  setTaskFilter: (value: FilterTypes) => void;
  filteredTasks: Task[];
  handleClearAllDone: () => void;
}

const Filter: Component<Props> = (props) => (
  <form class="mb-2 flex flex-wrap gap-2 bg-primary-content p-2 rounded-box items-center justify-start">
    <label class="label hidden md:inline">Filter:</label>

    <select class="w-24 select select-sm select-primary" value={props.taskFilter} onInput={e => props.setTaskFilter(e.currentTarget.value as TaskStatus | "all")}>
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
    <Show when={props.taskFilter !== 'all'}>
      <button class="flex-none text-primary" onClick={() => props.setTaskFilter("all")} aria-label="Clear filter, show all tasks">
        <IconClose />
      </button>
    </Show>
    <div class="flex-1 flex md:justify-end items-center gap-4">
      <span class="label" classList={{ "text-warning": props.filteredTasks.length === 0 }}>
        <span class="hidden md:inline">Showing </span>
        {props.filteredTasks.length}
        /
        {store.currentList().tasks.length}{" "}
        <span class="hidden md:inline">
          {store.listCount() === 1 ? "task" : "tasks"}. </span>
      </span>
      <button disabled={store.getDoneTaskCount() === 0} onClick={props.handleClearAllDone} class="btn btn-neutral" >Clear all done tasks</button>
    </div >
  </form >
)

export default Filter;
