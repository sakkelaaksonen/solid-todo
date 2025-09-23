import { Component, For } from "solid-js";
import { type StoreProps, type Task, type TaskStatus, TaskStatusText } from "../../store/store.ts";
import { IconClose, IconTrashcan, } from "../ui/Icons.tsx";
import TodoStatusInput from "./TodoStatusInput.tsx";

type TodoItemsProps = StoreProps & {
  filteredTasks: Task[];
}

const TodoItems: Component<TodoItemsProps> = (props) => {
  return (
    <ul class="list bg-primary-content rounded-box ">
      <For each={[...props.filteredTasks].reverse()}>{task => (<li class="list-row">
        <div class="join border-neutral rounded-box hidden md:flex">
          <TodoStatusInput actions={props.actions} task={task} status="todo" id={`todo-${task.id}`} />
          <TodoStatusInput actions={props.actions} task={task} status="doing" id={`doing-${task.id}`} />
          <TodoStatusInput actions={props.actions} task={task} status="done" id={`done-${task.id}`} />
        </div>

        <label class="select select-primary select-sm md:hidden">
          <select
            class="select select-neutral select-sm"
            value={task.status}
            onInput={e => props.actions.changeTaskStatus(
              props.actions.getListIdForTask(task.id), task.id,
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
            name={`edit-${task.id}`}
            type="text"
            value={task.description}
            onInput={e => props.actions.editTaskDescription(props.actions.getListIdForTask(task.id), task.id, e.currentTarget.value)}
            class=" join-item input-ghost text-lg input flex-1 focus:input-neutral hover:border-neutral focus:font-bold focus:border-primary"
            aria-label="Edit task description"
            classList={{ "input-decoration-line text-secondary": task.status === "done" }}
          />
          <button
            class="btn border-neutral hover:btn-warning focus:btn-warning join-item"
            onClick={() => props.actions.deleteTask(props.actions.getListIdForTask(task.id), task.id)}
            aria-label="Remove task"
          >
            <span className="scale-75"><IconTrashcan /></span>

            <span class="hidden md:inline-block">Remove</span>
          </button>
        </label>
      </li>)}</For >
    </ul >

  );
}




export default TodoItems;
