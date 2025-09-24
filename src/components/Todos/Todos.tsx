import { createSignal, Show, Component } from "solid-js";
import { TaskStatus } from "../../store/store.ts";
import type { Task } from "../../store/store.ts";
import TodoItems from "./TodoItems.jsx";
import TodoIsEmpty from "./TodosIsEmpty.tsx";
import Filter from "./Filter.tsx";
import AddNewTaskForm from "./AddNewTaskForm.tsx";
import EditableListTitle from "../Lists/EditableListTitle.tsx";
import { StoreProps } from "../../store/store.ts";

const Todos: Component<StoreProps> = (props) => {

  const [newTaskDesc, setNewTaskDesc] = createSignal("");

  //This will be a component state and will not persist across reloads
  const [taskFilter, setTaskFilter] = createSignal<TaskStatus | "all">("all");


  // Task operations
  const handleAddTask = (e: SubmitEvent) => {
    e.preventDefault();
    if (props.actions.selectedListId()) {
      props.actions.addTask(props.actions.selectedListId()!, newTaskDesc());
      setNewTaskDesc("");
    }
  };
  const filteredTasks = (): Task[] => {
    if (!props.actions.currentList()) return [];
    if (taskFilter() === "all") return props.actions.currentList()!.tasks;
    return props.actions.currentList()!.tasks.filter(t => t.status === taskFilter());
  };

  const handleClearAllDone = () =>
    props.actions.clearAllDoneFromCurrentList();


  const TodosFallback = () => (
    <TodoIsEmpty filteredCount={filteredTasks().length} totalCount={props.actions.currentList().tasks.length} />
  );

  return (<>

    <div class="p-4">
      <div class="divider max-md:hidden"></div>
      <EditableListTitle store={props.store} actions={props.actions} />

      <div class="divider mb-12 "></div>
      <AddNewTaskForm
        handleAddTask={handleAddTask}
        newTaskDesc={newTaskDesc()}
        setNewTaskDesc={setNewTaskDesc}
      />
      <div class="divider"></div>
      <Filter
        store={props.store}
        actions={props.actions}
        taskFilter={taskFilter()}
        setTaskFilter={setTaskFilter}
        filteredTasks={filteredTasks()}
        handleClearAllDone={handleClearAllDone} />

      <Show when={filteredTasks().length > 0} fallback={TodosFallback()}>
        <TodoItems filteredTasks={filteredTasks()} store={props.store} actions={props.actions} />
      </Show>

    </div></>
  );
};

export default Todos;
