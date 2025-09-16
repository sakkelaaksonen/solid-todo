import { createSignal, For, Show, Component } from "solid-js";
import store, { TaskStatus } from "./store.ts";
import EditableListTitle from "./components/EditableListTitle";
import ListSelector from "./components/ListSelector";
import type { Task } from "./store.ts";
import TodoItems, { TodoIsEmpty } from "./components/TodoItems.jsx";
import Filter from "./components/Filter.tsx";
import AddNewListForm from "./components/AddNewListForm.tsx";
import AddTaskForm from "./components/AddTaskForm.tsx";
import { IconCheck, IconChevronUpDown } from "./components/Icons.tsx";

const Todos: Component = () => {
  const [newListName, setNewListName] = createSignal("");
  const [newTaskDesc, setNewTaskDesc] = createSignal("");
  //This will be a component state and will not persist across reloads
  const [taskFilter, setTaskFilter] = createSignal<TaskStatus | "all">("all");

  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    if (store.addList(newListName())) {
      setNewListName("");
      e.target && (e.target as HTMLFormElement).reset();
    } else {
      alert("Invalid or duplicate list name.");
    }
  };

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



  console.log("Current List:", store.selectedListId(), store.currentList());

  return (

    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">Todo Lists</h2>
      <AddNewListForm newListName={newListName()} setNewListName={setNewListName} handleAddList={handleAddList} />
      <div class="mb-4 flex gap-2 items-center">
        <For each={store.getLists()}>{list => (
          <button class="badge badge-primary" onClick={() => store.selectList(list.id)}>

            <Show when={store.selectedListId() === list.id}><IconCheck /></Show>
            {list.name}
          </button>
        )}</For>

      </div>

      <EditableListTitle store={store} />
      <AddTaskForm handleAddTask={handleAddTask} newTaskDesc={newTaskDesc()} setNewTaskDesc={setNewTaskDesc} />
      <Filter taskFilter={taskFilter()} setTaskFilter={setTaskFilter} filteredTasks={filteredTasks()} handleClearAllDone={handleClearAllDone} />
      <Show when={filteredTasks().length > 0} fallback={<TodoIsEmpty filteredCount={filteredTasks().length} totalCount={store.currentList().tasks.length} />}>
        <TodoItems filteredTasks={filteredTasks()} />
      </Show>

    </div>
  );
};

export default Todos;