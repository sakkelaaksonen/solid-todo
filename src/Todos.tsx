
import { createSignal, For, Show, Component } from "solid-js";
import store, { TaskStatus } from "./store.ts";
import EditableListTitle from "./components/EditableListTitle";
import ListSelector from "./components/ListSelector";
import type { Task } from "./store.ts";
import TodoItems from "./components/TodoItems.jsx";


const Todos: Component = () => {
  const [newListName, setNewListName] = createSignal("");
  const [newTaskDesc, setNewTaskDesc] = createSignal("");
  //This will be a component state and will not persist across reloads
  const [taskFilter, setTaskFilter] = createSignal<TaskStatus | "all">("all");

  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Current list before adding:", store.selectedListId());

    if (store.addList(newListName())) {

      console.log("List added:", newListName());
      console.log("Current list after adding:", store.selectedListId());
      setNewListName("");
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


  console.log("Current List:", store.selectedListId(), store.currentList());

  return (
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">Todo Lists</h2>
      <form onSubmit={handleAddList} class="mb-2 flex gap-2">
        <input
          class="border px-2 py-1"
          placeholder="New list name"
          required
          value={newListName()}
          onInput={e => setNewListName(e.currentTarget.value)}
        />
        <button class="bg-blue-500 text-white px-2 py-1 rounded">Add List</button>
      </form>

      <div class="mb-4 flex gap-2 items-center">
        <label for="list-select" class="font-semibold">Select list:</label>
        <select
          id="list-select"
          class="border px-2 py-1"
          value={store.selectedListId() ?? ""}
          onInput={e => store.selectList(e.currentTarget.value)}
        >
          <option value="" disabled>Select a list</option>
          <For each={store.getLists()}>{list => (
            <option value={list.id}>{list.name}</option>
          )}</For>
        </select>
      </div>

      <EditableListTitle store={store} />
      <form onSubmit={handleAddTask} class="mb-2 flex gap-2">
        <input
          class="border px-2 py-1"
          placeholder="New task description"
          required
          value={newTaskDesc()}
          onInput={e => setNewTaskDesc(e.currentTarget.value)}
        />
        <button class="bg-green-500 text-white px-2 py-1 rounded">Add Task</button>
      </form>
      <div class="mb-2 flex gap-2">
        <label>Filter:</label>
        <select value={taskFilter()} onInput={e => setTaskFilter(e.currentTarget.value as TaskStatus | "all")}
          class="border px-2 py-1">
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <TodoItems filteredTasks={filteredTasks()} />

    </div>
  );
};

export default Todos;