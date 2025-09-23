import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@solidjs/testing-library"
import TodoStatusInput from "./TodoStatusInput";
import type { Task, TaskStatus } from "../../store/store";
import userEvent from "@testing-library/user-event"

describe("TodoStatusInput", () => {
  let mockActions: any;
  let task: Task;

  const user = userEvent.setup()

  beforeEach(() => {
    mockActions = {
      changeTaskStatus: vi.fn(),
      getListIdForTask: vi.fn(() => "mock-list-id"),
    };

    task = {
      id: "task-1",
      description: "Test Task",
      status: "todo" as TaskStatus,
    };
  });

  it("should render with the correct status", () => {
    const { getByLabelText } = render(() => (
      <TodoStatusInput
        actions={mockActions}
        task={task}
        status="todo"
        id="status-todo"
      />
    ));

    const input = getByLabelText("Todo");
    expect(input).toBeInTheDocument();
    expect(input).toBeChecked();
  });

  it("should call changeTaskStatus on input change", async () => {
    const { getByLabelText } = render(() => (
      <TodoStatusInput
        actions={mockActions}
        task={task}
        status="doing"
        id="status-doing"
      />
    ));

    const input = getByLabelText("Doing");
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(mockActions.changeTaskStatus).toHaveBeenCalledWith(
      "mock-list-id",
      "task-1",
      "doing"
    );
    expect(input).toBeChecked();


  });

  it("should apply the correct styles based on status", () => {
    //Set task status to done to test the class application
    task.status = 'done';

    const { getByLabelText } = render(() => (
      <TodoStatusInput
        actions={mockActions}
        task={task}
        status="done"
        id="status-done"
      />
    ));

    const label = getByLabelText("Done").parentElement;
    expect(label).toHaveClass("btn-primary");
    // And so on...
  });
});
