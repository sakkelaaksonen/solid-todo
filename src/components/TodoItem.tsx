
import { Component, For, Show, createSignal } from "solid-js";
import { TaskStatus, type TodoStore } from "../store.ts";

const TodoItem: Component<{ task: any; listId: string; store: TodoStore; currentList: () => any }> = (props) => (
  <div class="flex items-center gap-2 mb-1">
    <select
      value={props.task.status}
      onInput={e => props.store.changeTaskStatus(props.listId, props.task.id, e.currentTarget.value as TaskStatus)}
      class="border px-2 py-1"
      aria-label="Change task status"
    >
      <option value="todo">Todo</option>
      <option value="doing">Doing</option>
      <option value="done">Done</option>
    </select>
    <input
      type="text"
      value={props.task.description}
      onInput={e => props.store.editTaskDescription(props.listId, props.task.id, e.currentTarget.value)}
      class="border px-2 py-1 flex-1"
      aria-label="Edit task description"
    />
    <button
      class="text-red-500"
      onClick={() => props.store.deleteTask(props.listId, props.task.id)}
      aria-label="Delete task"
    >x</button>
  </div>
);


export default TodoItem;