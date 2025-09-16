import { Component, For, Show, } from "solid-js";
import store, { type Task, type TaskStatus, } from "../store.ts";
import { IconClose, } from "./Icons";
type TodoItemsProps = {
  filteredTasks: Task[];
}

const TaskStatusText: Record<TaskStatus, string> = {
  todo: "Todo",
  doing: "Doing",
  done: "Done"
};

const getListIdForTask = (taskId = '') => store.listForTask(taskId)?.id || '';

const TodoItems: Component<TodoItemsProps> = (props) => (
  <ul class="list bg-base-100 rounded-box shadow-md">
    <For each={props.filteredTasks}>{task => (<li class="list-row">
      {/* <div class="flex items-center gap-2 mb-1"> */}


      <div class="btn-group join">
        <TodoStatusInput task={task} status="todo" id={`todo-${task.id}`} />
        <TodoStatusInput task={task} status="doing" id={`doing-${task.id}`} />
        <TodoStatusInput task={task} status="done" id={`done-${task.id}`} />
      </div>


      <div class="btn-group join">
        <input
          type="text"
          value={task.description}
          onInput={e => store.editTaskDescription(getListIdForTask(task.id), task.id, e.currentTarget.value)}
          class="input-neutral btn-xs input flex-1 join-item"
          aria-label="Edit task description"
        />
        <button
          class="btn btn-neutral btn-xs join-item"
          onClick={() => store.deleteTask(getListIdForTask(task.id), task.id)}
          aria-label="Delete task"
        >
          <IconClose /> Remove
        </button>
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


const TodoStatusInput: Component<{ task: Task, status: TaskStatus, id: string }> = (props) => (
  <label class={`btn  btn-xs join-item ${props.task.status === props.status ? "btn-primary" : ""}`} for={`${props.id}`}>
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