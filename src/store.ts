// Type for the todo store, for use in components

import { createEffect, createSignal } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";


// Typed localStorage store for TodoStore[]
function createLocalStore<T extends object>(name: string, init: T): [Store<T>, SetStoreFunction<T>] {
    const localState = localStorage.getItem(name);
    const [state, setState] = createStore<T>(localState ? JSON.parse(localState) : init);
    createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
    return [state, setState];
}

export type TaskStatus = "todo" | "doing" | "done";
export type FilterTypes = "all" | TaskStatus;

export type Task = {
    id: string;
    description: string;
    status: TaskStatus;
};

export type TodoList = {
    id: string;
    name: string;
    tasks: Task[];
};


export type TodoStore = {
    lists: TodoList[];
    selectedListId: string | null;   
};

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function isValidListName(name: string, lists: TodoList[]): boolean {
    if (!name.match(/^[\p{L}\d]{1,60}$/u)) return false;
    return !lists.some((l) => l.name === name);
}


export function createTodoListsStore() {
    const [store, setStore] = createLocalStore<TodoStore>("todoStore", { lists: [], selectedListId: null });

    function addList(name: string): boolean {
        if (!isValidListName(name, store.lists)) return false;
        const newList: TodoList = { id: generateId(), name, tasks: [] };
        setStore("lists", (lists) => [...lists, newList]);
        setStore("selectedListId", newList.id);
        return true;
    }

    function deleteList(id: string) {
        setStore("lists", (lists) => lists.filter((l) => l.id !== id));
        if (store.selectedListId === id) {
            setStore("selectedListId", store.lists.length > 1 ? store.lists[0].id : null);
        }
    }

    function editListName(id: string, newName: string): boolean {
        if (!isValidListName(newName, store.lists)) return false;
        setStore("lists", (list) => list.id === id, "name", newName);
        return true;
    }

    function selectList(id: string) {
        if (store.lists.some((l) => l.id === id)) {
            setStore("selectedListId", id);
        }
    }
    
    function addTask(listId: string, description: string) {
        const newTask: Task = { id: generateId(), description, status: "todo" };
        setStore("lists", (l) => l.id === listId, "tasks", (tasks) => [...tasks, newTask]);
    }
    function deleteTask(listId: string, taskId: string) {
        setStore("lists", (l) => l.id === listId, "tasks", (tasks) => tasks.filter((t) => t.id !== taskId));
    }
    function editTaskDescription(listId: string, taskId: string, newDescription: string) {
        setStore("lists", (l) => l.id === listId, "tasks", (t) => t.id === taskId, "description", newDescription);
    }
    function changeTaskStatus(listId: string, taskId: string, newStatus: TaskStatus) {
        setStore("lists", (l) => l.id === listId, "tasks", (t) => t.id === taskId, "status", newStatus);
    }

    function selectedListId() {
        return store.selectedListId;
    }

    function currentList() {
        return store.lists.find(l => l.id === selectedListId());
    }

    return {
        lists: store.lists,
        selectedListId,
        addList,
        deleteList,
        editListName,
        selectList,
        addTask,
        deleteTask,
        editTaskDescription,
        changeTaskStatus,
        currentList,
    }
}
