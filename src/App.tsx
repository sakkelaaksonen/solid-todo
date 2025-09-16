import { Component } from "solid-js";
import Todos from "./Todos";
import Navi from "./components/Navi";
const App: Component = () => {
  return (
    <>
      <Navi />
      <Todos />


    </>
  );
};

export default App;
