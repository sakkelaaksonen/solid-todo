//
/**
 * Store
 * TODO: 
 * - Typed errors and error messages 
 */

import { createEffect } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";


function createLocalStore<TodoStore extends object>(name: string, init: TodoStore): [Store<TodoStore>, SetStoreFunction<TodoStore>] {
    const localState = localStorage.getItem(name);
    const [state, setState] = createStore<TodoStore>(localState ? JSON.parse(localState) : init);
    createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
    return [state, setState];
}

export type TaskStatus = "todo" | "doing" | "done";

export const TaskNamePattern = /^[\p{L}\d\s]{1,60}$/u;

export const TaskStatusText: Record<TaskStatus, string> = {
  todo: "Todo",
  doing: "Doing",
  done: "Done"
};

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

export const ListNameErrors: Record<string, string> = {
  exists: "Name already exists.",
  invalid: "Invalid name.",
};



export type StoreProps = {
  store: TodoStore;
  actions: StoreActions;
}


export type StoreActions = {    
    addList: (name: string) => boolean;
    deleteList: (id: string) => void;
    editListName: (id: string, newName: string) => boolean;
    selectList: (id: string) => void;
    addTask: (listId: string, description: string) => void;
    deleteTask: (listId: string, taskId: string) => void;
    editTaskDescription: (listId: string, taskId: string, newDescription: string) => void;
    changeTaskStatus: (listId: string, taskId: string, newStatus: TaskStatus) => void;
    selectedListId: () => string | null;
    listForTask: (taskId: string) => TodoList 
    currentList: () => TodoList,
    getLists: () => TodoList[],
    clearAllDoneFromCurrentList: () => void,
    listCount: () => number,
    getDoneTaskCount: () => number,
    listNameExists: (name: string) => boolean;
    getListIdForTask: (taskId: string) => string;
}


function generateId() {
    return Math.random().toString(36).substring(2, 11);
}


function isValidListName(name: string, lists: TodoList[]): boolean {
    if (!name.match(TaskNamePattern)) return false;
    return !lists.some((l) => l.name === name);
}


export function useTodoStore(): [TodoStore, StoreActions] {
    const initialLists: TodoList[] = [
        {
            id: "sample-list",
            name: "Sample List",
            tasks: [
                { id: "sample-task-1", description: "Welcome to your todo app!", status: "todo" },
                { id: "sample-task-2", description: "Try adding a new list.", status: "doing" },
                { id: "sample-task-3", description: "Check off a task.", status: "done" }
            ]
        }
    ];
    const [store, setStore] = createLocalStore<TodoStore>("todoStore", { lists: initialLists, selectedListId: initialLists[0].id });

    function addList(name: string): boolean {
        if (!isValidListName(name, store.lists)) return false;
        const newList: TodoList = { id: generateId(), name, tasks: [] };
        setStore("lists", (lists) => [...lists, newList]);
        setStore("selectedListId", newList.id);
        return true;
    }

    function deleteList(id: string) {
        if (store.selectedListId === id) {
            setStore("selectedListId", store.lists.length > 1 ? store.lists[0].id : null);
        }
        setStore("lists", (lists) => lists.filter((l) => l.id !== id));

    }

    function listNameExists(name: string): boolean {
        return store.lists.some((l) => l.name === name);
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

    function listForTask(taskId: string): TodoList {
        const list = store.lists.find(l => l.tasks.some(t => t.id === taskId));
        if (!list) {
            throw new Error("List for task not found");
        }
        return list;
    }

    function currentList() {
        const current =  store.lists.find(l => l.id === selectedListId()) ;
        if(!current) {
            throw new Error("Current list not found");
        }
        return current;
    }

    function getLists() {
        return store.lists;
    }

    function clearAllDoneFromCurrentList() {
        if (!store.selectedListId) return;
        setStore("lists", (l) => l.id === store.selectedListId, "tasks", (tasks) => tasks.filter((t) => t.status !== "done"));
    }
    
    function listCount() {
        return store.lists.length;
    }

    function getDoneTaskCount() {
        const list = currentList()
        if(!list) return 0;
        return list.tasks.filter(t => t.status === "done").length;
    }


    function getListIdForTask(taskId = '') {
        return listForTask(taskId)?.id || '';
    }



    return [store, {
        addList,
        deleteList,
        editListName,
        selectList,
        addTask,
        deleteTask,
        editTaskDescription,
        changeTaskStatus,
        currentList,
        listForTask,
        getLists,
        clearAllDoneFromCurrentList,
        listCount,
        getDoneTaskCount,
        listNameExists,
        getListIdForTask,
        selectedListId,
    }];
}
