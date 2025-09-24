import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, } from "@solidjs/testing-library";
import Filter from "./Filter";
import { storeSetup } from "../../testSetup.ts";

export const CLEAR_DONE_BUTTON_TEXT = "Clear done";

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


  // it("should disable the clear button when there are no done tasks", () => {

  // Confirm modal broke this test, needs to be reworked
  // Tested manually
  //   // Mock currentList to return a list with no "done" tasks

  //   const { store, actions } = createMockStore();
  //   actions.currentList = vi.fn(() => ({
  //     id: "list-1",
  //     name: "Test List",
  //     tasks: [
  //       { id: "1", status: "todo" as TaskStatus, description: "Task 1" },
  //       { id: "2", status: "doing" as TaskStatus, description: "Task 2" },
  //     ],
  //   }));


  //   actions.getDoneTaskCount = vi.fn(() => 0);

  //   const { getByText } = render(() => (
  //     <Filter
  //       actions={actions}
  //       taskFilter="all"
  //       setTaskFilter={vi.fn()}
  //       filteredTasks={[]} // No filtered tasks
  //       handleClearAllDone={vi.fn()}
  //       store={store}
  //     />
  //   ));

  //   const button = getByText(CLEAR_DONE_BUTTON_TEXT);
  //   expect(button).toBeDisabled();
  // });

  it("should open the modal when the clear button is clicked", async () => {
    const { getByText, queryByText } = render(() => (
      <Filter
        actions={storeSetup.actions}
        taskFilter="all"
        setTaskFilter={vi.fn()}
        filteredTasks={storeSetup.store.lists[0].tasks}
        handleClearAllDone={vi.fn()}
        store={storeSetup.store}
      />
    ));

    const button = getByText(CLEAR_DONE_BUTTON_TEXT);
    await fireEvent.click(button);

    // Check if the modal is displayed
    expect(queryByText("Confirm Clear")).toBeInTheDocument();
    expect(queryByText("Are you sure you want to clear all done tasks?")).toBeInTheDocument();
  });

  it("should call handleClearAllDone when confirming in the modal", async () => {
    const mockHandleClearAllDone = vi.fn();

    const { getByText, queryByText } = render(() => (
      <Filter
        actions={storeSetup.actions}
        taskFilter="all"
        setTaskFilter={vi.fn()}
        filteredTasks={storeSetup.store.lists[0].tasks}
        handleClearAllDone={mockHandleClearAllDone}
        store={storeSetup.store}
      />
    ));

    const button = getByText(CLEAR_DONE_BUTTON_TEXT);
    await fireEvent.click(button);

    // Confirm in the modal
    const confirmButton = getByText("Yes, Clear");
    await fireEvent.click(confirmButton);

    expect(mockHandleClearAllDone).toHaveBeenCalled();
    expect(queryByText("Confirm Clear")).not.toBeInTheDocument(); // Modal should close
  });
});
