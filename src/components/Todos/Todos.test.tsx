import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Todos from "./Todos";
import { storeSetup } from "../../testSetup";
import type { TaskStatus } from "../../store/store";

import { CLEAR_DONE_BUTTON_TEXT } from "./Filter.test";

describe("Todos", () => {
  it("renders all child components", () => {
    const { getByPlaceholderText, getByText } = render(() => (
      <Todos store={storeSetup.store} actions={storeSetup.actions} />
    ));

    expect(getByPlaceholderText("New task description")).toBeInTheDocument();
    expect(getByText(CLEAR_DONE_BUTTON_TEXT)).toBeInTheDocument();
    expect(getByText("Add Task")).toBeInTheDocument();
  });

  it("calls addTask when a new task is added", () => {
    const { getByPlaceholderText, getByText } = render(() => (
      <Todos store={storeSetup.store} actions={storeSetup.actions} />
    ));

    const input = getByPlaceholderText("New task description");
    const button = getByText("Add Task");

    fireEvent.input(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(storeSetup.actions.addTask).toHaveBeenCalledWith(
      storeSetup.actions.selectedListId(),
      "New Task"
    );
  });

  it("filters tasks based on the selected filter", () => {
    // Create a fresh mock store for this test
    const mockStore = {
      ...storeSetup.store,
      actions: {
        ...storeSetup.actions,
        currentList: vi.fn(() => ({
          id: "list-1",
          name: "Test List",
          tasks: [
            { id: "1", description: "Task 1", status: "todo" as TaskStatus },
            { id: "2", description: "Task 2", status: "doing" as TaskStatus },
            { id: "3", description: "Task 3", status: "done" as TaskStatus },
          ],
        })),
      },
    };

    const { getAllByRole, getByTestId } = render(() => (
      <Todos store={mockStore} actions={mockStore.actions} />
    ));

    const filterSelect = getByTestId("task-filter");
    let items = getAllByRole("listitem");

    expect(items.length).toBe(3); // Initially, all 3 tasks are rendered
    fireEvent.input(filterSelect, { target: { value: "done" } });
    items = getAllByRole("listitem");
    expect(items.length).toBe(1); // Verify that only tasks with status "done" are rendered
  });
});
