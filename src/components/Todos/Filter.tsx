import { Component, Show, createMemo, createSignal } from "solid-js";
import type { StoreProps, TaskStatus, Task, FilterTypes } from "../../store/store.ts";
import { IconClose } from "../ui/Icons.tsx";
import Modal from "../ui/Modal.tsx";

type Props = StoreProps & {
  taskFilter: FilterTypes
  setTaskFilter: (value: FilterTypes) => void;
  filteredTasks: Task[];
  handleClearAllDone: () => void;
}

const Filter: Component<Props> = (props) => {

  const [isModalOpen, setIsModalOpen] = createSignal(false); // Track modal state

  const doneTaskCount = createMemo(() => {
    const list = props.actions.currentList()
    if (!list) return 0;
    return props.actions.getDoneTaskCount();
  })

  const confirmClearAllDone = () => {
    props.handleClearAllDone();
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);

  }

  const closeModal = () => {
    setIsModalOpen(false);
  }


  return (
    <>
      <form class="mb-2 flex flex-wrap gap-2 bg-primary-content p-2 rounded-box items-center justify-start">
        <label for="filter" class="label" aria-label="Task filter" >
          <span class="foo md:inline">Filter:</span>

          <select
            id="filter"
            class="w-24 select select-primary"
            value={props.taskFilter}
            onInput={e => props.setTaskFilter(e.currentTarget.value as TaskStatus | "all")}
            data-testId="task-filter">
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </label>
        <Show when={props.taskFilter !== 'all'}>
          <button title="Clear filter, show all tasks"
            aria-label="Clear filter, show all tasks"
            class="flex-none text-primary"
            onClick={() => props.setTaskFilter("all")}>
            <IconClose />
          </button>
        </Show>
        <div class="flex-1 flex justify-end items-center gap-4">
          <span class="label" classList={{
            "text-warning": props.filteredTasks.length === 0,
            'text-primary': props.filteredTasks.length > 0
          }}>
            <span class="hidden md:inline">Showing </span>
            {props.filteredTasks.length}
            /
            {props.actions.currentList().tasks.length}{" "}
            <span class="hidden md:inline">
              {props.actions.listCount() === 1 ? "task" : "tasks"}. </span>
          </span>
          <button
            type="button"
            disabled={doneTaskCount() === 0}
            onClick={openModal}
            class="btn btn-neutral focus:border-primary focus:outline-primary hover:btn-warning focus:hover:border-transparent focus:hover:outline-warning" >Clear done</button>
        </div >
      </form >
      {/* Modal Confirmation */}
      < Show when={isModalOpen()} >
        <Modal
          isOpen={isModalOpen()}
          onClose={closeModal}
        >
          <h3 class="font-bold text-lg">Confirm Clear</h3>
          <p>Are you sure you want to clear all done tasks?</p>
          <div class="modal-action justify-center">
            <button
              class="btn"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              class="btn btn-warning"
              onClick={confirmClearAllDone}
            >
              Yes, Clear
            </button>

          </div >
        </Modal>
      </Show >
    </>
  )
}

export default Filter;
