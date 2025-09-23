import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library"
import TodoIsEmpty from "./TodosIsEmpty";

describe("TodoIsEmpty", () => {


  it("should display 'No tasks in this list.' when totalCount is 0", () => {
    const { getByText } = render(() => (
      <TodoIsEmpty filteredCount={0} totalCount={0} />
    ));

    expect(getByText("No tasks in this list.")).toBeInTheDocument();
  });

  it("should display 'No tasks with this status. (3 hidden).' when totalCount > 0", () => {
    const { getByText } = render(() => (
      <TodoIsEmpty filteredCount={2} totalCount={5} />
    ));

    expect(getByText("No tasks with this status. (3 hidden)."))
      .toBeInTheDocument();
  });


});
