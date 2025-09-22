import { Component, createSignal, onMount, Show, createEffect } from "solid-js";
import { IconAdd, IconClose, IconEdit } from "../ui/Icons.tsx";
import { type StoreProps, ListNameErrors, TaskNamePattern } from "../../store/store";
import Modal from "../ui/Modal.tsx";

const EditableListTitle: Component<StoreProps> = (props) => {
  const [editing, setEditing] = createSignal(false);
  const [editName, setEditName] = createSignal(props.actions.currentList().name);
  const [isModalOpen, setIsModalOpen] = createSignal(false); // Track modal state
  const [errorMessage, setErrorMessage] = createSignal("");

  let inputRef: HTMLInputElement | undefined;

  // Keep editName in sync with the current list name if it changes externally
  createEffect(() => {
    if (!editing()) {
      setEditName(props.actions.currentList().name);
    }
  });

  const startEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.focus();

    }, 0);
  };

  const saveListName = () => {
    if (!inputRef?.checkValidity()) {
      setErrorMessage(ListNameErrors.invalid);
      inputRef?.reportValidity();
      return;
    }

    if (props.actions.getLists().some(list => list.name === editName() && list.id !== props.actions.currentList().id)) {
      setErrorMessage(ListNameErrors.exists);
      return;
    }

    if (editName().trim() !== "" && editName() !== props.actions.currentList().name) {
      props.actions.editListName(props.actions.currentList().id, editName().trim());
      setErrorMessage("");
    }
    setEditing(false);
  };

  const confirmRemoveList = () => {
    props.actions.deleteList(props.actions.currentList().id); // Perform the remove action
    setIsModalOpen(false); // Close the modal
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const listName = () => props.actions.currentList().name;


  return (
    <>
      <Show when={!editing()}>
        <div class="flex items-center">
          <h1>
            <span class="hidden md:inline">
              Dos to Do in{" "}
            </span>

            <span class="flex-1 text-primary text-xl font-bold">
              &nbsp;{listName()}
            </span>
          </h1>
          <div class="divider divider-horizontal"></div>
          <button
            class="btn  btn-square btn-ghost hover:btn-primary flex-none"
            onClick={startEditing}
            aria-label={`Edit list name ${listName()}`}
          >
            <IconEdit />
          </button>
          <span class="divider divider-horizontal"></span>
          <button
            aria-label="Remove list"
            disabled={editing()}
            class="btn btn-square btn-ghost hover:btn-warning join-item"
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
            class="input join-item text-lg font-bold"
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
          {errorMessage() && <div class="px-2 text-error text">{errorMessage()}</div>}
          <button
            class="btn btn-primary join-item"
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
            <strong>{props.actions.currentList().name}</strong>?
          </p>
          <div class="modal-action justify-center">
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
