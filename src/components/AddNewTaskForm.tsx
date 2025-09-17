import { Component, } from "solid-js";
import { IconAdd } from "./Icons";

type Props = {
    newTaskDesc: string;
    setNewTaskDesc: (value: string) => void;
    handleAddTask: (e: SubmitEvent) => void;
}

const AddTaskForm: Component<Props> = (props) => (
    <form onSubmit={props.handleAddTask} class="mb-2 flex join">
        <label class="floating-label join-item flex-1 flex">
            <input
                class="input-primary input-xl input join-item flex-1"
                placeholder="New task description"
                required
                value={props.newTaskDesc}
                onInput={e => props.setNewTaskDesc(e.currentTarget.value)}
            />
            <span>Add New Task</span>
        </label>
        <button class="btn btn-primary btn-xl join-item"> <IconAdd /> Add Task</button>
    </form>
)

export default AddTaskForm;