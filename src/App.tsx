import { Component } from "solid-js";
import Todos from "./Todos";

const App: Component = () => {
  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
      <Todos />
    </>
  );
};

export default App;
