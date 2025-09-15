import { Component } from "solid-js";
import TodoApp from "./Todos";

const App: Component = () => {
  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <TodoApp />
    </>
  );
};

export default App;
