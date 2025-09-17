import { Component, For, Show, } from "solid-js";
import store, { type Task, type TaskStatus, TaskStatusText } from "../store.ts";
import { IconClose, } from "./Icons";
type TodoItemsProps = {
  filteredTasks: Task[];
}


const getListIdForTask = (taskId = '') => store.listForTask(taskId)?.id || '';

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
          onInput={e => store.selectList(e.currentTarget.value)}
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
          onInput={e => store.editTaskDescription(getListIdForTask(task.id), task.id, e.currentTarget.value)}
          class=" join-item input-ghost input-xs input flex-1 focus:input-primary hover:border-neutral focus:font-bold focus:border-primary"
          aria-label="Edit task description"
        />
        <button
          class="btn border-neutral hover:btn-warning focus:btn-warning btn-xs join-item"
          onClick={() => store.deleteTask(getListIdForTask(task.id), task.id)}
          aria-label="Remove task"
        >
          <IconClose />
          <span class="hidden md:inline-block">Remove</span>

        </button>
      </label>
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


const TodoStatusInput: Component<{ task: Task, status: TaskStatus, id: string }> = (props) => (
  <label class="btn hover:btn-info btn-xs join-item" classList={{
    "btn-primary hover:btn-primary": props.task.status === props.status
  }}>
    <input
      id={`${props.id}`}
      type="radio"
      name={`status-${props.task.id}`}
      value={props.status}
      checked={props.task.status === props.status}
      onInput={e => store.changeTaskStatus(
        getListIdForTask(props.task.id), props.task.id,
        e.currentTarget.value as TaskStatus
      )}
      class="absolute opacity-0"
    />
    {TaskStatusText[props.status]}
  </label>

);


export default TodoItems;