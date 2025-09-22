import { Component, For } from "solid-js";
import store, { type Task, type TaskStatus, TaskStatusText } from "../../store/store.ts";
import { IconClose, } from "../ui/Icons.tsx";
import TodoStatusInput from "./TodoStatusInput.tsx";

type TodoItemsProps = {
  filteredTasks: Task[];
}

const TodoItems: Component<TodoItemsProps> = (props) => (
  <ul class="list bg-primary-content rounded-box ">
    <For each={[...props.filteredTasks].reverse()}>{task => (<li class="list-row">
      <div class="join border-neutral rounded-box hidden md:flex">
        <TodoStatusInput task={task} status="todo" id={`todo-${task.id}`} />
        <TodoStatusInput task={task} status="doing" id={`doing-${task.id}`} />
        <TodoStatusInput task={task} status="done" id={`done-${task.id}`} />
      </div>

      <label class="select select-primary select-sm md:hidden">
        <select
          id="list-select"
          class="select select-neutral select-sm"
          value={task.status}
          onInput={e => store.changeTaskStatus(
            store.getListIdForTask(task.id), task.id,
            e.currentTarget.value as TaskStatus
          )
          }
        >
          <For each={Object.entries(TaskStatusText)}>{([status, text]) => (
            <option value={status}>{text}</option>
          )}</For>
        </select >
      </label >

      <label for={`edit-${task.id}`} class="join">
        <input
          type="text"
          value={task.description}
          onInput={e => store.editTaskDescription(store.getListIdForTask(task.id), task.id, e.currentTarget.value)}
          class=" join-item input-ghost input-xs input flex-1 focus:input-primary hover:border-neutral focus:font-bold focus:border-primary"
          aria-label="Edit task description"
          classList={{ "input-decoration-line text-secondary": task.status === "done" }}
        />
        <button
          class="btn border-neutral hover:btn-warning focus:btn-warning btn-xs join-item"
          onClick={() => store.deleteTask(store.getListIdForTask(task.id), task.id)}
          aria-label="Remove task"
        >
          <IconClose />
          <span class="hidden md:inline-block">Remove</span>
        </button>
      </label>
    </li>)}</For >
  </ul >

);




export default TodoItems;
