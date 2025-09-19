import { Component, createSignal, Show } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";
import { IconAdd, IconClose, IconEdit } from "./Icons.tsx";
import store from "../store.ts";
import Modal from "./Modal";

const EditableListTitle: Component = () => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(store.currentList().name || "");
    const [isModalOpen, setIsModalOpen] = createSignal(false); // Track modal state

    const saveListName = () => {
        if (editName().trim() !== "" && editName() !== store.currentList().name) {
            store.editListName(store.currentList().id, editName().trim());
        }
        setEditing(false);
    };

    const confirmRemoveList = () => {
        store.deleteList(store.currentList().id); // Perform the remove action
        setIsModalOpen(false); // Close the modal
    };

    return (
        <>
            <Show when={!editing()}>
                <div class="flex">
                    <h1>
                        Dos to Do in{" "}
                        <span class="flex-1 text-primary font-large font-bold">
                            &nbsp;{store.currentList().name}
                        </span>
                    </h1>
                    <div class="divider divider-horizontal"></div>
                    <button
                        class="btn btn-sm btn-square btn-ghost hover:btn-primary flex-none"
                        onClick={() => setEditing(!editing())}
                        aria-label={`Edit list name ${store.currentList().name}`}
                    >
                        <IconEdit />
                    </button>
                    <span class="divider divider-tight divider-horizontal"></span>
                    <button
                        disabled={editing()}
                        class="btn btn-square btn-ghost btn-sm hover:btn-warning join-item"
                        onClick={() => setIsModalOpen(true)} // Open the modal
                    >
                        <IconClose />
                    </button>
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
                        onInput={(e) => setEditName(e.currentTarget.value)}
                        readonly={!editing()}
                        onBlur={() => {
                            saveListName();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                saveListName();
                            } else if (e.key === "Escape") {
                                setEditName(store.currentList().name);
                                setEditing(false);
                            }
                        }}
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

            {/* Modal for confirming remove action */}
            <Show when={isModalOpen()}>
                <Modal
                    isOpen={isModalOpen()}
                    onClose={() => setIsModalOpen(false)}
                >

                    <h3 class="font-bold text-lg">Confirm Removal</h3>
                    <p class="py-4">
                        Are you sure you want to remove the list{" "}
                        <strong>{store.currentList().name}</strong>?
                    </p>
                    <div class="modal-action">
                        <button class="btn btn-error" onClick={confirmRemoveList}>
                            Confirm
                        </button>
                        <button class="btn" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </Show>
        </>
    );
};

export default EditableListTitle;
