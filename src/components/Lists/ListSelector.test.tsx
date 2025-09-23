import { render, fireEvent } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import ListSelector from "./ListSelector";
import { storeSetup } from "../../testSetup";

describe("ListSelector", () => {
  it("renders the dropdown with the correct options", () => {
    const { getByLabelText, getByText } = render(() => (
      <ListSelector store={storeSetup.store} actions={storeSetup.actions} />
    ));

    const dropdown = getByLabelText("Select a list");
    expect(dropdown).toBeInTheDocument();
    expect(getByText("Sample List")).toBeInTheDocument();
    expect(getByText("Sample Two")).toBeInTheDocument();
  });

  it("calls selectList when an option is selected", () => {
    const { getByLabelText } = render(() => (
      <ListSelector store={storeSetup.store} actions={storeSetup.actions} />
    ));

    const dropdown = getByLabelText("Select a list");
    fireEvent.input(dropdown, { target: { value: "list-2" } });

    expect(storeSetup.actions.selectList).toHaveBeenCalledWith("list-2");
  });
});
