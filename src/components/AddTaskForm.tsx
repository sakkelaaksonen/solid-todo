import { Component, } from "solid-js";

type Props = {
    newTaskDesc: string;
    setNewTaskDesc: (value: string) => void;
    handleAddTask: (e: SubmitEvent) => void;
}

const AddTaskForm: Component<Props> = (props) => (
    <form onSubmit={props.handleAddTask} class="mb-2 flex join">
        <input
            class="input-neutral input input-lg join-item"
            placeholder="New task description"
            required
            value={props.newTaskDesc}
            onInput={e => props.setNewTaskDesc(e.currentTarget.value)}
        />
        <button class="btn btn-lg btn-accent join-item">Add Task</button>
    </form>
)

export default AddTaskForm;