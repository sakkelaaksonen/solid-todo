import { Component, createSignal, Show } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";
import { IconClose, IconEdit } from "./Icons.tsx";



const EditableListTitle: Component<TodoStoreInstance> = (props) => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(props.store.currentList().name || "");

    return (
        <div class="flex items-center gap-2 mb-2">

            <span class="join">
                <Show when={editing()} fallback={<h3 class="text-lg font-semibold ">Tasks in "{props.store.currentList().name}" </h3>}>
                    <input
                        class="input input-neutral input-sm join-item"
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
                </Show>
            </span>
            <span class="join">
                <button
                    class="btn btn-sm btn-primary join-item"
                    onClick={() => setEditing(true)}
                    aria-label={`Edit list name ${props.store.currentList().name}`}
                ><IconEdit /> Edit</button>
                <button class="btn btn-sm btn-neutral join-item" onClick={() => props.store.deleteList(props.store.currentList().id)}><IconClose /> Remove</button>
            </span>
        </div>
    );
};

export default EditableListTitle;
