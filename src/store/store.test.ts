import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import { useTodoStore } from "./store";
import { createRoot } from "solid-js";

describe("Todo Store", () => {

  describe("Store Initialization", () => {


    it("should initialize the store with default values", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const initialListCount = store.lists.length;

        expect(store.lists).toBeDefined();
        expect(store.lists.length).toBe(1); // Should have one sample list
        expect(store.selectedListId).toBe(store.lists[0].id); // Selected list should be the sample list


        actions.addList("Persistent List");
        expect(store.lists.length).toBe(initialListCount + 1);
      });
    });

    it("should persist and retrieve state from localStorage", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        expect(store.lists.some(list => list.name === "Persistent List")).toBe(true);
      });
    });
    afterAll(() => {
      // Clear localStorage after all tests to clean up
      localStorage.clear();
    });
  });


  describe("Todo Actions", () => {

    beforeEach(() => {
      // localStorage.clear();
    });

    afterEach(() => {
      // Clear localStorage after each test to clean up
      localStorage.clear();
    });

    it("should not add a list with a duplicate name", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const result = actions.addList("Sample List");
        expect(result).toBe(false);
        expect(store.lists).toHaveLength(1);
      });
    });

    it("should add a new list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const result = actions.addList("New List");
        expect(result).toBe(true);
        expect(store.lists).toHaveLength(2);
        expect(store.lists[1].name).toBe("New List");
      });
    });

    it("should delete a list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        actions.deleteList(listId);
        expect(store.lists).toHaveLength(0);
      });
    });



    it("should not edit a list name to a duplicate name", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        actions.addList("Another List");
        const listId = store.lists[0].id;
        const result = actions.editListName(listId, "Another List");
        expect(result).toBe(false);
        expect(store.lists[0].name).toBe("Sample List");
      });

    });

    it("should add a task to a list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        actions.addTask(listId, "New Task");
        expect(store.lists[0].tasks).toHaveLength(4);
        expect(store.lists[0].tasks[3].description).toBe("New Task");
      });
    });

    it("should delete a task from a list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        const taskId = store.lists[0].tasks[0].id;
        actions.deleteTask(listId, taskId);
        expect(store.lists[0].tasks).toHaveLength(2);
      });
    });

    it("should edit a task description", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        const taskId = store.lists[0].tasks[0].id;
        actions.editTaskDescription(listId, taskId, "Updated Task");
        expect(store.lists[0].tasks[0].description).toBe("Updated Task");
      });
    });

    it("should change a task status", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        const taskId = store.lists[0].tasks[0].id;
        actions.changeTaskStatus(listId, taskId, "doing");
        expect(store.lists[0].tasks[0].status).toBe("doing");
      });
    });

    it("should clear all done tasks from the current list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        actions.changeTaskStatus(listId, store.lists[0].tasks[0].id, "done");
        actions.clearAllDoneFromCurrentList();
        //Sample data has one done task already so two should be removed and one left
        expect(store.lists[0].tasks).toHaveLength(1);
        expect(store.lists[0].tasks.some((t) => t.status === "done")).toBe(false);
      });
    });

    it("should count the total number of lists", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        expect(actions.listCount()).toBe(1);
        actions.addList("Another List");
        expect(actions.listCount()).toBe(2);
      });
    });

    it("should count the number of done tasks in the current list", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const listId = store.lists[0].id;
        actions.changeTaskStatus(listId, store.lists[0].tasks[0].id, "done");
        // Sample list has one task with status "done" initially
        expect(actions.getDoneTaskCount()).toBe(2);
      });
    });

    it("should check if a list name exists", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        expect(actions.listNameExists("Sample List")).toBe(true);
        expect(actions.listNameExists("Nonexistent List")).toBe(false);
      });
    });

    it("should get the list ID for a task", () => {
      createRoot(() => {
        const [store, actions] = useTodoStore();
        const taskId = store.lists[0].tasks[0].id;
        const listId = actions.getListIdForTask(taskId);
        expect(listId).toBe(store.lists[0].id);
      });
    });
  });

});
