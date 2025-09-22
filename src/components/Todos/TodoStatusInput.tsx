import { type Component } from "solid-js";
import store, { TaskStatusText } from "../../store/store.ts";
import type { Task, TaskStatus } from "../../store/store.ts";



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
        store.getListIdForTask(props.task.id), props.task.id,
        e.currentTarget.value as TaskStatus
      )}
      class="absolute opacity-0"
    />
    {TaskStatusText[props.status]}
  </label>

);


export default TodoStatusInput;
