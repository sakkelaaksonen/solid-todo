import { createSignal } from "solid-js";

export type TaskStatus = "todo" | "doing" | "done";
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

function generateId() {
	return Math.random().toString(36).substr(2, 9);
}

function isValidListName(name: string, lists: TodoList[]): boolean {
	if (!name.match(/^[\p{L}\d]{1,60}$/u)) return false;
	return !lists.some((l) => l.name === name);
}

export function createTodoListsStore() {
	const [lists, setLists] = createSignal<TodoList[]>([]);
	const [selectedListId, setSelectedListId] = createSignal<string | null>(null);

	// List operations
	function addList(name: string) {
		if (!isValidListName(name, lists())) return false;
		const newList: TodoList = { id: generateId(), name, tasks: [] };
		setLists([...lists(), newList]);
		setSelectedListId(newList.id);
		return true;
	}

	function deleteList(id: string) {
		setLists(lists().filter((l) => l.id !== id));
		if (selectedListId() === id) setSelectedListId(null);
	}

	function editListName(id: string, name: string) {
		if (!isValidListName(name, lists())) return false;
		setLists(lists().map((l) => l.id === id ? { ...l, name } : l));
		return true;
	}

	function selectList(id: string) {
		setSelectedListId(id);
	}

	// Task operations
	function addTask(listId: string, description: string) {
		setLists(lists().map((l) =>
			l.id === listId
				? { ...l, tasks: [...l.tasks, { id: generateId(), description, status: "todo" }] }
				: l
		));
	}

	function deleteTask(listId: string, taskId: string) {
		setLists(lists().map((l) =>
			l.id === listId
				? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) }
				: l
		));
	}

	function editTaskDescription(listId: string, taskId: string, description: string) {
		setLists(lists().map((l) =>
			l.id === listId
				? { ...l, tasks: l.tasks.map((t) => t.id === taskId ? { ...t, description } : t) }
				: l
		));
	}

	function changeTaskStatus(listId: string, taskId: string, status: TaskStatus) {
		setLists(lists().map((l) =>
			l.id === listId
				? { ...l, tasks: l.tasks.map((t) => t.id === taskId ? { ...t, status } : t) }
				: l
		));
	}

	function filterTasks(listId: string, status: TaskStatus) {
		const list = lists().find((l) => l.id === listId);
		return list ? list.tasks.filter((t) => t.status === status) : [];
	}

	// LocalStorage sync (basic)
	// TODO: Add localStorage persistence logic here

	return {
		lists,
		setLists,
		selectedListId,
		setSelectedListId,
		addList,
		deleteList,
		editListName,
		selectList,
		addTask,
		deleteTask,
		editTaskDescription,
		changeTaskStatus,
		filterTasks,
	};
}
