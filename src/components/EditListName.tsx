import { Component, createSignal } from "solid-js";
import type { TodoStore, TodoList } from "../store";

type EditListNameProps = {
    list: TodoList;
    store: TodoStore;
};

const EditListName: Component<EditListNameProps> = (props) => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(props.list.name);

    return (
        <div class="flex items-center gap-2 mb-1">
            <button
                class={`px-2 py-1 rounded ${props.store.selectedListId() === props.list.id ? "bg-blue-200" : "bg-gray-100"}`}
                onClick={() => props.store.selectList(props.list.id)}
                aria-label={`Select list ${props.list.name}`}
            >
                {editing()
                    ? <input
                        class="border px-2 py-1"
                        value={editName()}
                        onInput={e => setEditName(e.currentTarget.value)}
                        onBlur={() => {
                            if (editName() !== props.list.name && editName().trim() !== "") {
                                props.store.editListName(props.list.id, editName().trim());
                            }
                            setEditing(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (editName() !== props.list.name && editName().trim() !== "") {
                                    props.store.editListName(props.list.id, editName().trim());
                                }
                                setEditing(false);
                            } else if (e.key === "Escape") {
                                setEditName(props.list.name);
                                setEditing(false);
                            }
                        }}
                        autofocus
                    />
                    : props.list.name}
            </button>
            <button
                class="text-gray-500"
                onClick={() => setEditing(true)}
                aria-label={`Edit list name ${props.list.name}`}
            >✎</button>
            <button
                class="text-red-500"
                onClick={() => props.store.deleteList(props.list.id)}
                aria-label={`Delete list ${props.list.name}`}
            >🗑️</button>
            <button
                class="text-red-500"
                onClick={() => props.store.deleteList(props.list.id)}
                aria-label={`Delete list ${props.list.name}`}
            >x</button>
        </div>
    );
};

export default EditListName;
