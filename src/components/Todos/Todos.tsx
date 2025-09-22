import { createSignal, Show, Component } from "solid-js";
import store, { TaskStatus } from "../../store/store.ts";
import type { Task } from "../../store/store.ts";
import TodoItems from "./TodoItems.jsx";
import TodoIsEmpty from "./TodosIsEmpty.tsx";
import Filter from "./Filter.tsx";
import AddNewTaskForm from "./AddNewTaskForm.tsx";
import EditableListTitle from "../Lists/EditableListTitle.tsx";

const Todos: Component = () => {
  const [newTaskDesc, setNewTaskDesc] = createSignal("");

  //This will be a component state and will not persist across reloads
  const [taskFilter, setTaskFilter] = createSignal<TaskStatus | "all">("all");


  // Task operations
  const handleAddTask = (e: SubmitEvent) => {
    e.preventDefault();
    if (store.selectedListId()) {
      store.addTask(store.selectedListId()!, newTaskDesc());
      setNewTaskDesc("");
    }
  };
  const filteredTasks = (): Task[] => {
    if (!store.currentList()) return [];
    if (taskFilter() === "all") return store.currentList()!.tasks;
    return store.currentList()!.tasks.filter(t => t.status === taskFilter());
  };

  const handleClearAllDone = () =>
    store.clearAllDoneFromCurrentList();


  const TodosFallback = () => (
    <TodoIsEmpty filteredCount={filteredTasks().length} totalCount={store.currentList().tasks.length} />
  );

  return (<>

    <div class="p-4">
      <div class="divider"></div>
      <EditableListTitle />

      <div class="divider"></div>
      <AddNewTaskForm
        handleAddTask={handleAddTask}
        newTaskDesc={newTaskDesc()}
        setNewTaskDesc={setNewTaskDesc}
      />
      <div class="divider"></div>
      <Filter taskFilter={taskFilter()}
        setTaskFilter={setTaskFilter}
        filteredTasks={filteredTasks()}
        handleClearAllDone={handleClearAllDone} />

      <Show when={filteredTasks().length > 0} fallback={TodosFallback()}>
        <TodoItems filteredTasks={filteredTasks()} />
      </Show>

    </div></>
  );
};

export default Todos;
