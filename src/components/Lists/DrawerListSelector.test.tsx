import { render, fireEvent } from "@solidjs/testing-library";
import DrawerListSelector from "./DrawerListSelector";
import { vi, describe, it, expect } from "vitest";

import { storeSetup } from "../../testSetup";

describe("DrawerListSelector", () => {


  it("renders the search input and lists", () => {
    const { getByPlaceholderText, getByText } = render(() => (
      <DrawerListSelector actions={storeSetup.actions} />
    ));

    expect(getByPlaceholderText("Search lists...")).toBeInTheDocument();
    expect(getByText("Sample List")).toBeInTheDocument();

  });

  it("filters lists based on search query", () => {
    const { getByPlaceholderText, queryByText } = render(() => (
      <DrawerListSelector actions={storeSetup.actions} />
    ));

    const input = getByPlaceholderText("Search lists...");
    fireEvent.input(input, { target: { value: "Two" } });

    expect(queryByText("Sample List")).not.toBeInTheDocument();
    expect(queryByText("Sample Two")).toBeInTheDocument();
  });

  it("calls onSelectList and selectList when a list is clicked", () => {
    const onSelectList = vi.fn();
    const { getByText, getByRole } = render(() => (
      <DrawerListSelector actions={storeSetup.actions} onSelectList={onSelectList} />
    ));

    const listItem = getByRole("button", { name: /Sample Two/ });
    fireEvent.click(listItem);

    expect(storeSetup.actions.selectList).toHaveBeenCalledWith("list-2");
    expect(onSelectList).toHaveBeenCalledWith("list-2");
  });
});
