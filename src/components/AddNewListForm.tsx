import { Component, } from "solid-js";
import { IconAdd } from "./Icons";
import { createSignal } from "solid-js";
import store, { TaskNamePattern } from "../store.ts";



const AddNewListForm: Component = (props) => {
  const [newListName, setNewListName] = createSignal("");
  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    if (store.addList(newListName())) {
      setNewListName("");
      e.target && (e.target as HTMLFormElement).reset();
    } else {
      (e.target as HTMLFormElement).reportValidity();
    }
  };
  return (
    <form onSubmit={handleAddList} class="mb-2">
      <fieldset class="fieldset">

        <label class="input validator floating-label input-sm">
          <span class="label">Add a new list</span>
          <input type="text" placeholder="New list: Max 60 characters, letters and numbers only"
            required
            id="new-list-name"
            pattern={TaskNamePattern.source}
            maxLength={60}
            value={newListName()} onInput={e =>
              setNewListName(e.currentTarget.value)} />

        </label>
        <div class="validator-hint">Max 60 characters, letters and numbers only</div>

        <button class="btn btn-primary btn-sm">
          <IconAdd />
          Add List</button>
      </fieldset>
    </form>
  );
}
export default AddNewListForm;
