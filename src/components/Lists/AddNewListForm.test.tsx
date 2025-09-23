import { describe, it, expect, beforeEach, vi } from "vitest";
import AddNewListForm from "./AddNewListForm";
import type { StoreActions, TodoStore } from "../../store/store";
import userEvent from "@testing-library/user-event"
import { render } from "@solidjs/testing-library"

const BUTTON_SELECTOR = "Add New List";
const INPUT_SELECTOR = "Add a new list";

describe("AddNewListForm", () => {

  let mockActions: StoreActions;
  let mockStore: TodoStore;

  const user = userEvent.setup()
  beforeEach(() => {
    mockActions = {
      addList: vi.fn(() => true),
      listNameExists: vi.fn(() => false),
    } as unknown as StoreActions;

    mockStore = {
      lists: [],
      selectedListId: null, // Add required property
    }
  });

  it("should render the form correctly", () => {
    const { getByLabelText, getByText } = render(() => (
      <AddNewListForm actions={mockActions} store={mockStore} />
    ));

    expect(getByLabelText(INPUT_SELECTOR)).toBeInTheDocument();
    expect(getByText(BUTTON_SELECTOR)).toBeInTheDocument();
  });

  it("should call addList when form is submitted", async () => {


    const { getByLabelText, getByText } = render(() => (
      <AddNewListForm store={mockStore} actions={mockActions} /> // Provide complete mock store
    ));

    const input = getByLabelText(INPUT_SELECTOR);
    const button = getByText(BUTTON_SELECTOR);

    const user = userEvent.setup(); // Setup userEvent
    await user.type(input, "New List"); // Use userEvent to type
    await user.click(button); // Use userEvent to click

    expect(mockActions.addList).toHaveBeenCalledWith("New List");
  });

  it("should show an error message if the list name already exists", async () => {
    mockActions.listNameExists = vi.fn(() => true);
    // mockActions.listNameExists = vi.fn(() => true);
    const mockStore = {
      lists: [{ id: "1", name: "Duplicate List", tasks: [] }],
      selectedListId: null, // Add required property
    };

    const { getByLabelText, getByText, queryByText } = render(() => (
      <AddNewListForm store={mockStore} actions={mockActions} /> // Provide complete mock store
    ));

    const input = getByLabelText(INPUT_SELECTOR);
    const button = getByText(BUTTON_SELECTOR);

    const user = userEvent.setup(); // Setup userEvent
    await user.type(input, "Duplicate List"); // Use userEvent to type
    await user.click(button); // Use userEvent to click

    expect(mockActions.addList).not.toHaveBeenCalled();
    expect(queryByText("Name already exists.")).toBeInTheDocument();
  });

  it("should reset the form after a successful submission", async () => {
    const { getByLabelText, getByText } = render(() => (
      <AddNewListForm actions={mockActions} store={mockStore} />
    ));

    const input = getByLabelText(INPUT_SELECTOR);
    const button = getByText(BUTTON_SELECTOR);

    await userEvent.type(input, "New List");
    await userEvent.click(button);

    expect(input).toHaveValue("");
  });
});
