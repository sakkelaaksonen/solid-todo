
import { Component, } from "solid-js";
import store, { TaskStatus, Task } from "../store.ts";

type Props = {
    taskFilter: TaskStatus | "all";
    setTaskFilter: (value: TaskStatus | "all") => void;
    filteredTasks: Task[];
    handleClearAllDone: () => void;
}

const Filter: Component<Props> = (props) => (
    <div class="mb-2 flex gap-2">
        <label>Filter:</label>
        <select class="select select-sm select-neutral" value={props.taskFilter} onInput={e => props.setTaskFilter(e.currentTarget.value as TaskStatus | "all")}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
        </select>
        <div class="join">
            <span class="join-item label">
                Showing {props.filteredTasks.length} of {store.currentList().tasks.length} {store.listCount() === 1 ? "task" : "tasks"}.
            </span>
            <button disabled={store.getDoneTaskCount() === 0} onClick={props.handleClearAllDone} class="btn join-item btn-danger" >Clear all done tasks</button>
        </div>
    </div>
)

export default Filter;