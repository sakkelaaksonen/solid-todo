import { Component, } from "solid-js";
import { IconAdd } from "./Icons";
import { createSignal } from "solid-js";
import store from "../store.ts";



const AddNewListForm: Component = (props) => {
  const [newListName, setNewListName] = createSignal("");
  // List operations
  const handleAddList = (e: SubmitEvent) => {
    e.preventDefault();
    if (store.addList(newListName())) {
      setNewListName("");
      e.target && (e.target as HTMLFormElement).reset();
    } else {
      alert("Invalid or duplicate list name.");
    }
  };
  return (
    <form onSubmit={handleAddList} class="mb-2">
      <fieldset class="fieldset">
        <div class="join">
          <label class="input validator join-item input-sm">
            <input type="text" placeholder="Max 60 characters, letters and numbers only"
              required
              pattern="^[a-zA-Z0-9 ]+$"
              maxLength={60}

              value={newListName()} onInput={e =>
                setNewListName(e.currentTarget.value)} />
          </label>

          <button class="btn btn-primary join-item btn-sm">
            <IconAdd />
            Add List</button>
        </div>
        <div class="validator-hint hidden">Enter valid email address</div>
      </fieldset>
    </form>
  );
}
export default AddNewListForm;
