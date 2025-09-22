import { type Component } from "solid-js";
import { type StoreProps, TaskStatusText } from "../../store/store.ts";
import type { Task, TaskStatus } from "../../store/store.ts";


type Props = Pick<StoreProps, 'actions'> & {
  task: Task;
  status: TaskStatus;
  id: string;
}

const TodoStatusInput: Component<Props> = (props) => {

  return (
    <label class="btn join-item" classList={{
      "btn-info": props.task.status === props.status && props.status === 'todo',
      "btn-secondary": props.task.status === props.status && props.status === 'doing',
      "btn-primary ": props.task.status === 'done' && props.status === 'done',
    }}>
      <input
        id={`${props.id}`}
        type="radio"
        name={`status-${props.task.id}`}
        value={props.status}
        checked={props.task.status === props.status}
        onInput={e => props.actions.changeTaskStatus(
          props.actions.getListIdForTask(props.task.id), props.task.id,
          e.currentTarget.value as TaskStatus
        )}
        class="absolute opacity-0"
      />
      {TaskStatusText[props.status]}
    </label>

  )
};


export default TodoStatusInput;
