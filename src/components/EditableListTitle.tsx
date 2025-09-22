import { Component, createSignal, Show } from "solid-js";
import type { TodoStoreInstance } from "../store.ts";
import { IconAdd, IconClose, IconEdit } from "./Icons.tsx";
import store, { TaskNamePattern } from "../store.ts";
import Modal from "./Modal";

const EditableListTitle: Component = () => {


  const [editing, setEditing] = createSignal(false);
  const [editName, setEditName] = createSignal(store.currentList().name || "");
  const [isModalOpen, setIsModalOpen] = createSignal(false); // Track modal state
  const [errorMessage, setErrorMessage] = createSignal("");

  let inputRef: HTMLInputElement | undefined;

  const startEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.focus(); // Focus the input when editing starts
    }, 0); // Delay to ensure the input is rendered
  };


  const saveListName = () => {
    if (!inputRef?.checkValidity()) {
      setErrorMessage("Invalid list name.");
      inputRef?.reportValidity();
      return;
    }

    //TODO AI made a mess again. Fix this.
    if (store.getLists().some(list => list.name === editName() && list.id !== store.currentList().id)) {
      setErrorMessage("List name already exists.");
      return;
    }

    if (editName().trim() !== "" && editName() !== store.currentList().name) {
      store.editListName(store.currentList().id, editName().trim());
      setErrorMessage("");
    }
    setEditing(false);
  };

  const confirmRemoveList = () => {
    store.deleteList(store.currentList().id); // Perform the remove action
    setIsModalOpen(false); // Close the modal
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const listName = () => store.currentList().name || "Unnamed List";

  return (
    <>
      <Show when={!editing()}>
        <div class="flex">
          <h1>
            <span class="hidden md:inline">
              Dos to Do in{" "}
            </span>

            <span class="flex-1 text-primary font-large font-bold">
              &nbsp;{listName()}
            </span>
          </h1>
          <div class="divider divider-horizontal"></div>
          <button
            class="btn btn-sm btn-square btn-ghost hover:btn-primary flex-none"
            onClick={startEditing}
            aria-label={`Edit list name ${listName()}`}
          >
            <IconEdit />
          </button>
          <span class="divider divider-horizontal"></span>
          <button
            aria-label="Remove list"
            disabled={editing()}
            class="btn btn-square btn-ghost btn-sm hover:btn-warning join-item"
            onClick={openModal} // Open the modal
          >
            <IconClose />
          </button>
        </div>
      </Show>

      <Show when={editing()}>
        <div class="label validator floating-label join">
          <input
            ref={inputRef}
            class="input input-sm join-item"
            classList={{
              "input-neutral": editing(),
            }}
            disabled={!editing()}
            type="text"
            maxlength={60}
            pattern={TaskNamePattern.source}
            value={editName()}
            onInput={(e) => setEditName(e.currentTarget.value)}
            readonly={!editing()}
            onBlur={() => {
              saveListName();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveListName();
              } else if (e.key === "Escape") {
                setEditName(listName());
                setEditing(false);
              }
            }}
          />
          <span class="validator-hint">Max 60 characters, letters and numbers only</span>

          <span class="label text-primary">Max 60 letters and numbers</span>
          {errorMessage() && <div class="px-2 text-error text-sm">{errorMessage()}</div>}
          <button
            class="btn btn-sm btn-primary join-item"
            onClick={saveListName}
            aria-label={`Edit list name ${listName()}`}
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
          onClose={closeModal}
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
            <button class="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </Show >
    </>
  );
};

export default EditableListTitle;
