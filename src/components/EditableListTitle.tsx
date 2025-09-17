import { Component, createSignal, Show } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";
import { IconAdd, IconClose, IconEdit } from "./Icons.tsx";
import store from "../store.ts";

const EditableListTitle: Component = () => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(store.currentList().name || "");
    const saveListName = () => {
        if (editName().trim() !== "" && editName() !== store.currentList().name) {
            store.editListName(store.currentList().id, editName().trim());
        }
        setEditing(false);
    }

    const removeList = () => store.deleteList(store.currentList().id);
    return (<>

        <Show when={!editing()}>
            <div class="flex">
                <h1>Dos to Do in <span class="flex-1 text-primary font-large font-bold">&nbsp;{store.currentList().name}</span></h1>
                <span class="divider divider-horizontal"></span>
                <button
                    class="btn btn-sm  btn-square btn-ghost hover:btn-primary flex-none"
                    onClick={() => setEditing(!editing())}
                    aria-label={`Edit list name ${store.currentList().name}`}
                >
                    <IconEdit />
                </button>
                <div class="divider divider-horizontal"></div>
                <button disabled={editing()} class="btn btn-square btn-ghost  btn-sm hover:btn-warning join-item" onClick={removeList}><IconClose /></button>
                <div class="divider divider-horizontal"></div>
            </div>

        </Show>


        <Show when={editing()}>

            <div class="label floating-label join">




                <input
                    class="input input-sm join-item"
                    classList={{
                        "input-neutral": editing(),

                    }}
                    disabled={!editing()}
                    type="text"
                    maxlength={60}
                    pattern="^[a-zA-Z0-9 ]+$"
                    value={store.currentList().name}
                    onInput={e => setEditName(e.currentTarget.value)}
                    readonly={!editing()}
                    onBlur={() => {
                        saveListName();
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            saveListName();
                        } else if (e.key === "Escape") {
                            setEditName(store.currentList().name);
                            setEditing(false);
                        }
                    }}
                    autofocus
                />
                <span class="label text-primary">List Name</span>
                <button
                    class="btn btn-sm btn-primary join-item"
                    onClick={saveListName}
                    aria-label={`Edit list name ${store.currentList().name}`}
                >
                    <IconAdd />
                    Save
                </button>


            </div>
        </Show>
    </>
    );
};

export default EditableListTitle;
