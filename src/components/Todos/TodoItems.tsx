import { Component, For } from "solid-js";
import { type StoreProps, type Task, type TaskStatus, TaskStatusText } from "../../store/store.ts";
import { IconClose, IconTrashcan, } from "../ui/Icons.tsx";
import TodoStatusInput from "./TodoStatusInput.tsx";

type TodoItemsProps = StoreProps & {
  filteredTasks: Task[];
}

const TodoItems: Component<TodoItemsProps> = (props) => {
  return (
    <>
      <ul class="list bg-primary-content rounded-box ">
        <For each={[...props.filteredTasks].reverse()}>{task => (<li class="list-row flex items-center gap-2 p-2">
          <label for={`edit-${task.id}`} class="flex-grow">
            <input
              name={`edit-${task.id}`}
              type="text"
              value={task.description}
              onInput={e => props.actions.editTaskDescription(props.actions.getListIdForTask(task.id), task.id, e.currentTarget.value)}
              class="input-ghost text-lg input flex-1 focus:input-neutral hover:border-neutral focus:font-bold focus:border-primary w-full truncate"
              aria-label="Edit task description"
              classList={{ "input-decoration-line text-secondary": task.status === "done" }}
            />
          </label>

          <span class="join border-neutral rounded-box hidden md:flex">
            <TodoStatusInput actions={props.actions} task={task} status="todo" id={`todo-${task.id}`} />
            <TodoStatusInput actions={props.actions} task={task} status="doing" id={`doing-${task.id}`} />
            <TodoStatusInput actions={props.actions} task={task} status="done" id={`done-${task.id}`} />
          </span>

          <label class="select select-primary select-sm md:hidden w-24" aria-label="Change task status">
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
                <option value={status} >
                  {text}</option>
              )}</For>
            </select >
          </label >

          <button
            class="btn max-md:btn-square border-neutral hover:btn-warning focus:btn-warning"
            onClick={() => props.actions.deleteTask(props.actions.getListIdForTask(task.id), task.id)}
            aria-label="Remove task"
          >
            <span class="scale-75"><IconTrashcan /></span>
            <span class="hidden md:inline-block">Remove</span>
          </button>

        </li>)}</For >
      </ul >
    </>

  );
}




export default TodoItems;
