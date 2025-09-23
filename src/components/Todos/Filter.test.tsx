import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, getByRole } from "@solidjs/testing-library";
import type { TaskStatus, StoreActions } from "../../store/store.ts";
import Filter from "./Filter";
import { storeSetup } from "../../testSetup.ts";

describe("Filter", () => {
  it("should render the filter options and task counts", () => {
    const { getByLabelText, getByText } = render(() => (
      <Filter
        actions={storeSetup.actions} // Use actions from storeSetup
        taskFilter="all"
        setTaskFilter={vi.fn()}
        filteredTasks={storeSetup.store.lists[0].tasks} // Use tasks from storeSetup
        handleClearAllDone={vi.fn()}
        store={storeSetup.store} // Provide store prop
      />
    ));

    expect(getByLabelText("Task filter")).toBeInTheDocument();
    expect(getByText("3/3")).toBeInTheDocument();
  });

  it("should call setTaskFilter when a filter is selected", async () => {
    const mockSetTaskFilter = vi.fn();

    const { getByRole } = render(() => (
      <Filter
        actions={storeSetup.actions} // Use actions from storeSetup
        taskFilter="all"
        setTaskFilter={mockSetTaskFilter}
        filteredTasks={storeSetup.store.lists[0].tasks} // Use tasks from storeSetup
        handleClearAllDone={vi.fn()}
        store={storeSetup.store} // Provide store prop

      />
    ));

    const select = getByRole("combobox");


    await fireEvent.input(select, { target: { value: "done" } }); // Use fireEvent.input to match onInput handler

    expect(mockSetTaskFilter).toHaveBeenCalledWith("done");
  });

  it("should call handleClearAllDone when the button is clicked", async () => {
    const mockHandleClearAllDone = vi.fn();

    const { getByText } = render(() => (
      <Filter
        actions={storeSetup.actions} // Use actions from storeSetup
        taskFilter="all"
        setTaskFilter={vi.fn()}
        filteredTasks={storeSetup.store.lists[0].tasks} // Use tasks from storeSetup
        handleClearAllDone={mockHandleClearAllDone}
        store={storeSetup.store}
      />
    ));

    const button = getByText("Clear all done tasks");
    await fireEvent.click(button);

    expect(mockHandleClearAllDone).toHaveBeenCalled();
  });

  it("should disable the clear button when there are no done tasks", () => {
    // Mock currentList to return a list with no "done" tasks
    storeSetup.actions.currentList = vi.fn(() => ({
      id: "list-1",
      name: "Test List",
      tasks: [
        { id: "1", status: "todo" as TaskStatus, description: "Task 1" },
        { id: "2", status: "doing" as TaskStatus, description: "Task 2" },
      ],
    }));

    const { getByText } = render(() => (
      <Filter
        actions={storeSetup.actions} // Use actions from storeSetup
        taskFilter="all"
        setTaskFilter={vi.fn()}
        filteredTasks={[]} // No filtered tasks
        handleClearAllDone={vi.fn()}
        store={storeSetup.store}
      />
    ));

    const button = getByText("Clear all done tasks") as HTMLButtonElement; // Cast button to HTMLButtonElement
    expect(button).toBeDisabled();
  });
});
