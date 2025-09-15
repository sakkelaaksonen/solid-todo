import { Component, createSignal } from "solid-js";
import store from "../store";


const EditListName: Component = () => {
    const list = store.currentList();
    if (!list) return null;
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(list.name);

    return (
        <div class="flex items-center gap-2 mb-1">
            <button
                class={`px-2 py-1 rounded ${store.selectedListId() === list.id ? "bg-blue-200" : "bg-gray-100"}`}
                onClick={() => store.selectList(list.id)}
                aria-label={`Select list ${list.name}`}
            >
                {editing()
                    ? <input
                        class="border px-2 py-1"
                        value={editName()}
                        onInput={e => setEditName(e.currentTarget.value)}
                        onBlur={() => {
                            if (editName() !== list.name && editName().trim() !== "") {
                                store.editListName(list.id, editName().trim());
                            }
                            setEditing(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (editName() !== list.name && editName().trim() !== "") {
                                    store.editListName(list.id, editName().trim());
                                }
                                setEditing(false);
                            } else if (e.key === "Escape") {
                                setEditName(list.name);
                                setEditing(false);
                            }
                        }}
                        autofocus
                    />
                    : list.name}
            </button>
            <button
                class="text-gray-500"
                onClick={() => setEditing(true)}
                aria-label={`Edit list name ${list.name}`}
            >✎</button>
            <button
                class="text-red-500"
                onClick={() => store.deleteList(list.id)}
                aria-label={`Delete list ${list.name}`}
            >🗑️</button>
            <button
                class="text-red-500"
                onClick={() => store.deleteList(list.id)}
                aria-label={`Delete list ${list.name}`}
            >x</button>
        </div>
    );
};

export default EditListName;
