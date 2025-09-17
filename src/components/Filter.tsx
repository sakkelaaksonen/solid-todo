import { Component, } from "solid-js";
import store, { TaskStatus, Task } from "../store.ts";

type Props = {
    taskFilter: TaskStatus | "all";
    setTaskFilter: (value: TaskStatus | "all") => void;
    filteredTasks: Task[];
    handleClearAllDone: () => void;
}

const Filter: Component<Props> = (props) => (
    <form class="mb-2 flex flex-wrap gap-2 bg-primary-content p-2 rounded-box items-center justify-start">
        <label class="label hidden md:inline">Filter:</label>

        <select class="select select-sm select-primary" value={props.taskFilter} onInput={e => props.setTaskFilter(e.currentTarget.value as TaskStatus | "all")}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
        </select>
        <div class="flex-1 flex md:justify-end items-center gap-4">
            <span class="label" classList={{ "text-warning": props.filteredTasks.length === 0 }}>
                Showing {props.filteredTasks.length} of {store.currentList().tasks.length} {store.listCount() === 1 ? "task" : "tasks"}.
            </span>
            <button disabled={store.getDoneTaskCount() === 0} onClick={props.handleClearAllDone} class="btn btn-neutral" >Clear all done tasks</button>
        </div>
    </form>
)

export default Filter;