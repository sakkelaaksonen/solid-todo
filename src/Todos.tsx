
import { createSignal, For, Show, Component } from "solid-js";
import { createTodoListsStore, TaskStatus } from "./store.ts";

const store = createTodoListsStore();

const Todos: Component = () => {
  const [newListName, setNewListName] = createSignal("");
  const [newTaskDesc, setNewTaskDesc] = createSignal("");
  const [taskFilter, setTaskFilter] = createSignal<TaskStatus | "all">("all");

  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    if (store.addList(newListName())) {
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

  const currentList = () => store.lists().find(l => l.id === store.selectedListId());
  const filteredTasks = () => {
    if (!currentList()) return [];
    if (taskFilter() === "all") return currentList()!.tasks;
    return currentList()!.tasks.filter(t => t.status === taskFilter());
  };

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
      <div class="mb-4">
        <For each={store.lists()}>{list => (
          <div class="flex items-center gap-2 mb-1">
            <button
              class={`px-2 py-1 rounded ${store.selectedListId() === list.id ? "bg-blue-200" : "bg-gray-100"}`}
              onClick={() => store.selectList(list.id)}
              aria-label={`Select list ${list.name}`}
            >{list.name}</button>
            <button
              class="text-red-500"
              onClick={() => store.deleteList(list.id)}
              aria-label={`Delete list ${list.name}`}
            >x</button>
          </div>
        )}</For>
      </div>

      <Show when={currentList()}>
        <h3 class="text-lg font-semibold mb-2">Tasks in "{currentList()!.name}"</h3>
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
        <For each={filteredTasks()}>{task => (
          <div class="flex items-center gap-2 mb-1">
            <select
              value={task.status}
              onInput={e => store.changeTaskStatus(currentList()!.id, task.id, e.currentTarget.value as TaskStatus)}
              class="border px-2 py-1"
              aria-label="Change task status"
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <input
              type="text"
              value={task.description}
              onInput={e => store.editTaskDescription(currentList()!.id, task.id, e.currentTarget.value)}
              class="border px-2 py-1 flex-1"
              aria-label="Edit task description"
            />
            <button
              class="text-red-500"
              onClick={() => store.deleteTask(currentList()!.id, task.id)}
              aria-label="Delete task"
            >x</button>
          </div>
        )}</For>
      </Show>
    </div>
  );
};

export default Todos;