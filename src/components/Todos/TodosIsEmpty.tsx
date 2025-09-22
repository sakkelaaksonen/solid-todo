
import { type Component } from "solid-js";

interface TodoIsEmptyProps {
  filteredCount: number;
  totalCount: number;

}

const TodoIsEmpty: Component<TodoIsEmptyProps> = (props) => (
  <div class="text-warning italic mt-8">
    {props.totalCount > 0 ?
      `No tasks with this status. (${props.totalCount - props.filteredCount} hidden).` :
      "No tasks in this list."}
  </div>
);


export default TodoIsEmpty;
