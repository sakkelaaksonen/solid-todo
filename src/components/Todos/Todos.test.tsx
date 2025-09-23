import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Todos from "./Todos";
import { storeSetup } from "../../testSetup";

describe("Todos", () => {
  it("renders all child components", () => {
    const { getByPlaceholderText, getByText } = render(() => (
      <Todos store={storeSetup.store} actions={storeSetup.actions} />
    ));

    expect(getByPlaceholderText("New task description")).toBeInTheDocument();
    expect(getByText("Clear all done tasks")).toBeInTheDocument();
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
    const { getAllByLabelText, getByTestId } = render(() => (
      <Todos store={storeSetup.store} actions={storeSetup.actions} />
    ));

    const filterSelect = getByTestId("task-filter");
    let items = getAllByLabelText("Remove task");

    expect(items.length).toBe(3); // Initially, all 3 tasks are rendered

    fireEvent.input(filterSelect, { target: { value: "done" } });

    items = getAllByLabelText("Remove task");
    expect(items.length).toBe(1); // Verify that only tasks with status "done" are rendered
  });

  it("calls clearAllDoneFromCurrentList when the clear button is clicked", () => {
    const { getByText } = render(() => (
      <Todos store={storeSetup.store} actions={storeSetup.actions} />
    ));

    const clearButton = getByText("Clear all done tasks");
    fireEvent.click(clearButton);

    expect(storeSetup.actions.clearAllDoneFromCurrentList).toHaveBeenCalled();
  });
});
