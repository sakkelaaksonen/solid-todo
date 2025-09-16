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
    <form onSubmit={handleAddList} class="mb-2 flex gap-2">
      <fieldset class="fieldset">
        <div class="join">
          <label class="floating-label join-item">
            <input type="text" class="input input-primary input-sm validator join-item"
              placeholder="Max 60 characters, letters and numbers only" required
              value={newListName()} onInput={e =>
                setNewListName(e.currentTarget.value)} />
            <span>New list name</span>
          </label>
          <button class="btn btn-primary join-item btn-sm">
            <IconAdd />
            Add List</button>
        </div></fieldset>
    </form>
  );
}
export default AddNewListForm;
