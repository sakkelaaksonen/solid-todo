import { Component, createSignal } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";



const EditableListTitle: Component<TodoStoreInstance> = (props) => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(props.store.currentList().name || "");

    return (
        <div class="flex items-center gap-2 mb-2">
            <h3 class="text-lg font-semibold">
                {editing()
                    ? <input
                        class="border px-2 py-1"
                        value={props.store.currentList().name}
                        onInput={e => setEditName(e.currentTarget.value)}
                        onBlur={() => {
                            if (editName() !== props.store.currentList().name && editName().trim() !== "") {
                                props.store.editListName(props.store.currentList().id, editName().trim());
                            }
                            setEditing(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (editName() !== props.store.currentList().name && editName().trim() !== "") {
                                    props.store.editListName(props.store.currentList().id, editName().trim());
                                }
                                setEditing(false);
                            } else if (e.key === "Escape") {
                                setEditName(props.store.currentList().name);
                                setEditing(false);
                            }
                        }}
                        autofocus
                    />
                    : <>Tasks in "{props.store.currentList().name}"</>
                }
            </h3>
            <button
                class="text-gray-500"
                onClick={() => setEditing(true)}
                aria-label={`Edit list name ${props.store.currentList().name}`}
            >✎</button>
            <button onClick={() => props.store.deleteList(props.store.currentList().id)}>X</button>
        </div>
    );
};

export default EditableListTitle;
