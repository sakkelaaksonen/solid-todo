import { vi } from "vitest";
import type { TaskStatus, StoreProps, StoreActions, TodoStore, TodoList } from "./store/store.ts";
import { createStore } from "solid-js/store";


const mockActions: StoreActions = {
  currentList: vi.fn(() => ({
    tasks: [
      { id: "1", status: "todo" as TaskStatus, description: "Task 1" },
      { id: "2", status: "done" as TaskStatus, description: "Task 2" },
      { id: "3", status: "doing" as TaskStatus, description: "Task 3" },
    ],
  } as TodoList)),
  listCount: vi.fn(() => 1),
  addList: vi.fn(),
  deleteList: vi.fn(),
  editListName: vi.fn(),
  selectList: vi.fn(),
  addTask: vi.fn(),
  deleteTask: vi.fn(),
  editTaskDescription: vi.fn(),
  changeTaskStatus: vi.fn(),
  clearAllDoneFromCurrentList: vi.fn(),
  listNameExists: vi.fn(),
  getDoneTaskCount: vi.fn(),
  getListIdForTask: vi.fn(),
  selectedListId: vi.fn(() => "list-1"),
  listForTask: vi.fn((taskId) => mockStore.lists[0]),
  getLists: vi.fn(() => mockStore.lists),
  nameExists: vi.fn((name: string, lists: TodoList[]) => lists.some((l: TodoList) => l.name === name)),
};

const mockStore: TodoStore = {
  lists: [
    {
      id: "list-1",
      name: "Sample List",
      tasks: [
        { id: "task-1", description: "Task 1", status: "todo" as TaskStatus },
        { id: "task-2", description: "Task 2", status: "doing" as TaskStatus },
        { id: "task-3", description: "Task 3", status: "done" as TaskStatus },
      ],
    },
    {
      id: "list-2",
      name: "Sample Two",
      tasks: [
        { id: "task-21", description: "Task 21", status: "todo" as TaskStatus },
        { id: "task-22", description: "Task 22", status: "doing" as TaskStatus },
        { id: "task-23", description: "Task 23", status: "done" as TaskStatus },
      ],
    },
  ],
  selectedListId: "list-1",
};

export const storeSetup: StoreProps = {
  store: mockStore,
  actions: mockActions,
};

export const createMockStore = () => {
  const [store, setStore] = createStore<TodoStore>(mockStore); // Fix Store usage
  return {
    store,
    actions: mockActions,
    setStore,
  };
};
