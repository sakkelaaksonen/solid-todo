import { render, fireEvent } from "@solidjs/testing-library";
import AddTaskForm from "./AddNewTaskForm";
import { vi, it, expect, describe } from "vitest";

describe("AddNewTaskForm", () => {
  it("renders the form with input, label, and button", () => {
    const { getByPlaceholderText, getByText } = render(() => (
      <AddTaskForm
        newTaskDesc=""
        setNewTaskDesc={vi.fn()}
        handleAddTask={vi.fn()}
      />
    ));

    expect(getByPlaceholderText("New task description")).toBeInTheDocument();
    expect(getByText("Add New Task")).toBeInTheDocument();
    expect(getByText("Add Task")).toBeInTheDocument();
  });

  it("calls setNewTaskDesc when typing in the input field", () => {
    const setNewTaskDesc = vi.fn();
    const { getByPlaceholderText } = render(() => (
      <AddTaskForm
        newTaskDesc=""
        setNewTaskDesc={setNewTaskDesc}
        handleAddTask={vi.fn()}
      />
    ));

    const input = getByPlaceholderText("New task description");
    fireEvent.input(input, { target: { value: "New Task" } });

    expect(setNewTaskDesc).toHaveBeenCalledWith("New Task");
  });

  it("calls handleAddTask when the form is submitted", () => {
    const handleAddTask = vi.fn();
    const { getByText } = render(() => (
      <AddTaskForm
        newTaskDesc="Test Task"
        setNewTaskDesc={vi.fn()}
        handleAddTask={handleAddTask}
      />
    ));

    const button = getByText("Add Task");
    fireEvent.click(button);

    expect(handleAddTask).toHaveBeenCalled();
  });
});

