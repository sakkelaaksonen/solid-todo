import { Component, createSignal, Show } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";
import { IconClose, IconEdit } from "./Icons.tsx";
import store from "../store.ts";

const EditableListTitle: Component = () => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(store.currentList().name || "");

    return (<>

        <span class="join">
            <Show when={editing()} fallback={<span class="font-base">{store.currentList().name}</span>}>
                <label class="floating-label">
                    <input
                        class="input input-neutral input-sm join-item"
                        value={store.currentList().name}
                        onInput={e => setEditName(e.currentTarget.value)}
                        onBlur={() => {
                            if (editName() !== store.currentList().name && editName().trim() !== "") {
                                store.editListName(store.currentList().id, editName().trim());
                            }
                            setEditing(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (editName() !== store.currentList().name && editName().trim() !== "") {
                                    store.editListName(store.currentList().id, editName().trim());
                                }
                                setEditing(false);
                            } else if (e.key === "Escape") {
                                setEditName(store.currentList().name);
                                setEditing(false);
                            }
                        }}
                        autofocus
                    />
                    <span>Edit list name</span>
                </label>
            </Show>
        </span >
        <span class="join">
            <button
                class="btn btn-sm btn-primary join-item"
                onClick={() => setEditing(true)}
                aria-label={`Edit list name ${store.currentList().name}`}
            ><IconEdit /> Edit</button>
            <button class="btn btn-sm hover:btn-warning join-item" onClick={() => store.deleteList(store.currentList().id)}><IconClose /> Remove</button>
        </span>
    </>
    );
};

export default EditableListTitle;
