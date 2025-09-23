import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import TodoItems from "./TodoItems";
import { storeSetup, createMockStore } from "../../testSetup";
import type { TaskStatus } from "../../store/store";

describe("TodoItems", () => {

  /**
   * Mock filtered tasks for testing: Order is reversed in rendering
   */
  const mockFilteredTasks = [
    { id: "1", description: "Task 1", status: "todo" as TaskStatus },
    { id: "2", description: "Task 2", status: "doing" as TaskStatus },
    { id: "3", description: "Task 3", status: "done" as TaskStatus },
  ];

  it("renders the list of tasks", () => {
    const mockStore = createMockStore();
    const { getAllByRole } = render(() => (
      <TodoItems
        store={mockStore.store}
        actions={mockStore.actions}
        filteredTasks={mockFilteredTasks}
      />
    ));

    const textboxes = getAllByRole("textbox", { name: /edit/i });
    expect(textboxes).toHaveLength(mockFilteredTasks.length);

    const removeButtons = getAllByRole("button", { name: /Remove/i });
    expect(removeButtons).toHaveLength(mockFilteredTasks.length);
  });

  it("calls changeTaskStatus when a task status is changed", () => {
    const { getByLabelText, getAllByRole } = render(() => (
      <TodoItems
        store={storeSetup.store}
        actions={storeSetup.actions}
        filteredTasks={mockFilteredTasks}
      />
    ));

    const selectCollection = getAllByRole("combobox");
    fireEvent.input(selectCollection[0], { target: { value: "doing" } });

    expect(storeSetup.actions.changeTaskStatus).toHaveBeenCalledWith(
      storeSetup.actions.getListIdForTask("3"),
      "3",
      "doing"
    );
  });

  it("calls editTaskDescription when a task description is edited", () => {
    const { getAllByRole } = render(() => (
      <TodoItems
        store={storeSetup.store}
        actions={storeSetup.actions}
        filteredTasks={mockFilteredTasks}
      />
    ));

    const inputCollection = getAllByRole("textbox");

    fireEvent.input(inputCollection[0], { target: { value: "Updated Task 3" } });

    expect(storeSetup.actions.editTaskDescription).toHaveBeenCalledWith(
      storeSetup.actions.getListIdForTask("3"),
      "3",
      "Updated Task 3"
    );
  });

  it("calls deleteTask when the delete button is clicked", () => {
    const { getAllByRole } = render(() => (
      <TodoItems
        store={storeSetup.store}
        actions={storeSetup.actions}
        filteredTasks={mockFilteredTasks}
      />
    ));

    const buttonCollection = getAllByRole("button", { name: /remove task/i });
    fireEvent.click(buttonCollection[0]);

    expect(storeSetup.actions.deleteTask).toHaveBeenCalledWith(
      storeSetup.actions.getListIdForTask("3"),
      "3"
    );
  });
});
