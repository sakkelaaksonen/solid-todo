import { Component, createSignal, onMount, Show, createEffect } from "solid-js";
import { IconAdd, IconClose, IconEdit, IconTrashcan } from "../ui/Icons.tsx";
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

  const cancelEditing = () => {
    setEditName(props.actions.currentList().name);
    setEditing(false);
    setErrorMessage("");
  }

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
          <h1 class=" truncate">
            <span class="hidden md:inline">
              Dos to Do in{" "}
            </span>

            <span class="text-primary text-xl font-bold">
              &nbsp;{listName()}
            </span>
          </h1>
          <div class="divider divider-horizontal"></div>
          <div class="join flex-grow group justify-end md:justify-start">
            <button
              title="Edit list name"
              class="btn btn-ghost hover:btn-primary flex-none join-item group-hover:border-neutral group-hover:border focus:btn-primary"
              onClick={startEditing}
              aria-label={`Edit list name ${listName()}`}
            >
              <IconEdit />
              <span class="hidden md:inline">Edit name</span>
            </button>

            <button
              title="Remove list"
              aria-label="Remove list"
              disabled={editing()}
              class="btn btn-ghost hover:btn-warning join-item group-hover:border-neutral group-hover:border focus:btn-warning"
              onClick={openModal} // Open the modal
            >
              <IconTrashcan />
              <span class="hidden md:inline">Remove</span>
            </button>
          </div>
        </div>
      </Show >

      <Show when={editing()}>
        <div class="flex gap-2">
          <div class="label validator floating-label join gap-1">
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
              // onBlur={() => {
              //   saveListName();
              // }}
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

            <button
              class="btn btn-primary join-item gap-0"
              onClick={saveListName}
              aria-label={`Edit list name ${listName()}`}
            >
              <IconAdd />
              Save
            </button>

          </div>



          <button
            class="btn btn-ghost btn-square hover:bg-transparent hover:border-transparent hover:text-warning"
            onClick={cancelEditing}
            aria-label={"Cancel editing list name"}
          >
            <IconClose />

          </button>


        </div>
        {errorMessage() && <div class="mt-2 text-warning flex items-center px-4">{errorMessage()}</div>}
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
            <button class="btn" onClick={closeModal}>
              Cancel
            </button>
            <button class="btn btn-error" onClick={confirmRemoveList}>
              Confirm
            </button>

          </div>
        </Modal>
      </Show >
    </>
  );
};

export default EditableListTitle;
