
import { Component, For, Show, } from "solid-js";
import store, { type Task, TaskStatus } from "../store.ts";

type TodoItemsProps = {
  filteredTasks: Task[];
}

const getListIdForTask = (taskId = '') => store.listForTask(taskId)?.id || '';

const TodoItems: Component<TodoItemsProps> = (props) => (
  <For each={props.filteredTasks}>{task => (
    <div class="flex items-center gap-2 mb-1">
      <select
        value={task.status}
        onInput={e => store.changeTaskStatus(getListIdForTask(task.id), task.id, e.currentTarget.value as TaskStatus)}
        class="border px-2 py-1"
        aria-label="Change task status"
      >
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <input
        type="text"
        value={task.description}
        onInput={e => store.editTaskDescription(getListIdForTask(task.id), task.id, e.currentTarget.value)}
        class="border px-2 py-1 flex-1"
        aria-label="Edit task description"
      />
      <button
        class="text-red-500"
        onClick={() => store.deleteTask(getListIdForTask(task.id), task.id)}
        aria-label="Delete task"
      >x</button>
    </div>)}</For>

);


export default TodoItems;