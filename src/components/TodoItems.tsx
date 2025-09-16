import { Component, For, Show, } from "solid-js";
import store, { type Task, TaskStatus } from "../store.ts";

type TodoItemsProps = {
  filteredTasks: Task[];
}

const getListIdForTask = (taskId = '') => store.listForTask(taskId)?.id || '';

const TodoItems: Component<TodoItemsProps> = (props) => (
  <ul class="list bg-base-100 rounded-box shadow-md">
    <For each={props.filteredTasks}>{task => (<li class="list-row">
      {/* <div class="flex items-center gap-2 mb-1"> */}


      <div class="btn-group join">
        <label class={`btn  btn-sm join-item ${task.status === "todo" ? "btn-accent" : ""}`}>
          <input
            type="radio"
            name={`status-${task.id}`}
            value="todo"
            checked={task.status === "todo"}
            onInput={e => store.changeTaskStatus(getListIdForTask(task.id), task.id, e.currentTarget.value as TaskStatus)}
            class="hidden"
          />
          Todo
        </label>
        <label class={`btn btn-sm join-item ${task.status === "doing" ? "btn-accent" : ""}`}>
          <input
            type="radio"
            name={`status-${task.id}`}
            value="doing"
            checked={task.status === "doing"}
            onInput={e => store.changeTaskStatus(getListIdForTask(task.id), task.id, e.currentTarget.value as TaskStatus)}
            class="hidden"
          />
          Doing
        </label>
        <label class={`btn btn-sm join-item ${task.status === "done" ? "btn-accent" : ""}`}>
          <input
            type="radio"
            name={`status-${task.id}`}
            value="done"
            checked={task.status === "done"}
            onInput={e => store.changeTaskStatus(getListIdForTask(task.id), task.id, e.currentTarget.value as TaskStatus)}
            class="hidden"
          />
          Done
        </label>
      </div>
      <div class="btn-group join">
        <input
          type="text"
          value={task.description}
          onInput={e => store.editTaskDescription(getListIdForTask(task.id), task.id, e.currentTarget.value)}
          class="input-neutral btn-sm input flex-1 join-item"
          aria-label="Edit task description"
        />
        <button
          class="btn btn-warning btn-sm join-item"
          onClick={() => store.deleteTask(getListIdForTask(task.id), task.id)}
          aria-label="Delete task"
        >x</button>
      </div>
    </li>)}</For >
  </ul>

);
interface TodoIsEmptyProps {
  filteredCount: number;
  totalCount: number;

}
export const TodoIsEmpty: Component<TodoIsEmptyProps> = (props) => (

  <div class="text-gray-500 italic">
    {props.totalCount > 0 ? `No tasks with this status. (${props.totalCount - props.filteredCount} hidden).` : "No tasks in this list."}
  </div>
);

export default TodoItems;