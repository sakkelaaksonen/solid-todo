import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import DrawerSide from "./DrawerSide";
import { storeSetup } from "../../testSetup";

describe("DrawerSide", () => {
  const mockIsOpen = vi.fn(() => true);
  const mockOnClose = vi.fn();

  it("renders the drawer when isOpen is true", () => {
    const { getByText } = render(() => (
      <>
        <input id="navi-drawer" type="checkbox" class="drawer-toggle" aria-label="Navigation drawer toggle" />
        <DrawerSide
          store={storeSetup.store}
          actions={storeSetup.actions}
          isOpen={mockIsOpen}
          onClose={mockOnClose}
        />
      </>
    ));

    expect(getByText("All My Todo Lists")).toBeInTheDocument();
    expect(getByText(`(${storeSetup.actions.listCount()})`)).toBeInTheDocument();
  });



  it("calls onClose when the overlay is clicked", () => {
    const { getByRole, getByTestId } = render(() => (

      <>
        <input id="navi-drawer" type="checkbox" class="drawer-toggle" aria-label="Navigation drawer toggle" />
        <DrawerSide
          store={storeSetup.store}
          actions={storeSetup.actions}
          isOpen={mockIsOpen}
          onClose={mockOnClose}
        />
      </>
    ));

    const overlay = getByTestId("drawer-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders AddNewListForm", () => {
    const { getByRole } = render(() => (
      <DrawerSide
        store={storeSetup.store}
        actions={storeSetup.actions}
        isOpen={mockIsOpen}
        onClose={mockOnClose}
      />
    ));
    const addButton = getByRole("button", { name: /Add New List/ });
    expect(addButton).toBeInTheDocument();

  });

  it("renders DrawerListSelector", () => {
    const { getByPlaceholderText, getByText, } = render(() => (
      <DrawerSide
        store={storeSetup.store}
        actions={storeSetup.actions}
        isOpen={mockIsOpen}
        onClose={mockOnClose}
      />
    ));
    const searchInput = getByPlaceholderText("Search lists...");
    expect(searchInput).toBeInTheDocument();
    expect(getByText("Sample List")).toBeInTheDocument();
    expect(getByText("Sample Two")).toBeInTheDocument();
  });
});
