import { Component, } from "solid-js";
import { IconAdd } from "../ui/Icons.tsx";
import { createSignal } from "solid-js";
import { type StoreProps, TaskNamePattern } from "../../store/store";


const AddNewListForm: Component<StoreProps> = (props) => {
  const [newListName, setNewListName] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");

  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    if (props.actions.listNameExists(newListName())) {
      setErrorMessage("Name already exists.");
      return;
    }
    if (props.actions.addList(newListName())) {
      setNewListName("");
      setErrorMessage("");
      e.target && (e.target as HTMLFormElement).reset();
    } else {


      (e.target as HTMLFormElement).reportValidity();
    }
  };

  return (
    <form onSubmit={handleAddList}>
      <fieldset class="fieldset">
        {errorMessage() && <div class="error-message">{errorMessage()}</div>}
        <label class="input validator floating-label w-full">
          <span class="label">Add a new list</span>
          <input type="text" placeholder="New list: Max 60 characters, letters and numbers only"
            required
            id="new-list-name"
            onChange={() => setErrorMessage("")}
            pattern={TaskNamePattern.source}
            maxLength={60}
            value={newListName()} onInput={e =>
              setNewListName(e.currentTarget.value)} />

        </label>
        <button class="btn btn-primary mt-2">
          <IconAdd />
          Add List</button>

        <div class="validator-hint text-accent">Max 60 characters, letters and numbers only</div>

      </fieldset>
    </form>
  );
}
export default AddNewListForm;
