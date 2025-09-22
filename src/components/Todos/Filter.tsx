import { Component, Show } from "solid-js";
import type { StoreProps, TaskStatus, Task, FilterTypes } from "../../store/store.ts";
import { IconClose } from "../ui/Icons.tsx";

type Props = StoreProps & {
  taskFilter: FilterTypes
  setTaskFilter: (value: FilterTypes) => void;
  filteredTasks: Task[];
  handleClearAllDone: () => void;
}

const Filter: Component<Props> = (props) => {

  return (
    <form class="mb-2 flex flex-wrap gap-2 bg-primary-content p-2 rounded-box items-center justify-start">
      <label for="filter" class="label" aria-label="Task filter">
        <span class="foo md:inline">Filter:</span>

        <select id="filter" class="w-24 select select-primary" value={props.taskFilter} onInput={e => props.setTaskFilter(e.currentTarget.value as TaskStatus | "all")}>
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </label>
      <Show when={props.taskFilter !== 'all'}>
        <button title="Clear filter, show all tasks"
          aria-label="Clear filter, show all tasks"
          class="flex-none text-primary"
          onClick={() => props.setTaskFilter("all")}>
          <IconClose />
        </button>
      </Show>
      <div class="flex-1 flex md:justify-end items-center gap-4">
        <span class="label" classList={{
          "text-warning": props.filteredTasks.length === 0,
          'text-primary': props.filteredTasks.length > 0
        }}>
          <span class="hidden md:inline">Showing </span>
          {props.filteredTasks.length}
          /
          {props.actions.currentList().tasks.length}{" "}
          <span class="hidden md:inline">
            {props.actions.listCount() === 1 ? "task" : "tasks"}. </span>
        </span>
        <button
          disabled={props.actions.getDoneTaskCount() === 0}
          onClick={props.handleClearAllDone}
          class="btn btn-neutral" >Clear all done tasks</button>
      </div >
    </form >
  )
}

export default Filter;
