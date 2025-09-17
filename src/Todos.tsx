import { createSignal, For, Show, Component } from "solid-js";
import store, { TaskStatus } from "./store.ts";
import type { Task } from "./store.ts";
import TodoItems, { TodoIsEmpty } from "./components/TodoItems.jsx";
import Filter from "./components/Filter.tsx";
import AddNewTaskForm from "./components/AddNewTaskForm.tsx";
import EditableListTitle from "./components/EditableListTitle.tsx";

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


  return (<>

    <div class="p-4">

      {/* <TodoSelector /> */}

      {/* <EditableListTitle /> */}


      {/* <div class="divider"></div> */}
      <div class="divider"></div>
      <AddNewTaskForm handleAddTask={handleAddTask} newTaskDesc={newTaskDesc()} setNewTaskDesc={setNewTaskDesc} />
      <div class="divider"></div>
      <Filter taskFilter={taskFilter()} setTaskFilter={setTaskFilter} filteredTasks={filteredTasks()} handleClearAllDone={handleClearAllDone} />

      <Show when={filteredTasks().length > 0} fallback={<TodoIsEmpty filteredCount={filteredTasks().length} totalCount={store.currentList().tasks.length} />}>
        <TodoItems filteredTasks={filteredTasks()} />
      </Show>

    </div></>
  );
};

export default Todos;