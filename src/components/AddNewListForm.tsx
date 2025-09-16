import { Component, } from "solid-js";
import { IconAdd } from "./Icons";

type Props = {
  newListName: string;
  setNewListName: (value: string) => void;
  handleAddList: (e: SubmitEvent) => void;
}

const AddNewListForm: Component<Props> = (props) => (
  <form onSubmit={props.handleAddList} class="mb-2 flex gap-2">
    <div class="join">
      <label class="floating-label join-item">
        <input type="text" class="input input-primary validator join-item"
          placeholder="Max 60 characters, letters and numbers only" required
          value={props.newListName} onInput={e =>
            props.setNewListName(e.currentTarget.value)} />
        <span>New list name</span>
      </label>
      <button class="btn btn-primary join-item">
        <IconAdd />
        Add List</button>
    </div>
  </form>
);

export default AddNewListForm;
