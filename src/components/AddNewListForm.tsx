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
        <div class="">
          <label class="input validator input-sm">
            <input type="text" placeholder="Max 60 characters, letters and numbers only"
              required
              // pattern={TaskNamePattern.toString()}
              maxLength={60}

              value={newListName()} onInput={e =>
                setNewListName(e.currentTarget.value)} />

          </label>
          <div class="validator-hint">Max 60 characters, letters and numbers only"</div>

          <button class="btn btn-primary btn-sm">
            <IconAdd />
            Add List</button>
        </div>

      </fieldset>
    </form>
  );
}
export default AddNewListForm;
