import { Component } from "solid-js";
import EditableListTitle from "./EditableListTitle";
// import AddNewListForm from "./AddNewListForm.tsx";
import ListSelector from "./ListSelector.tsx";
import store from "../store.ts";


const Navi: Component = () => {
    return (
        <div class="navbar bg-secondary-content border-b-primary border-2 shadow-sm mb-2 sticky top-0 z-10 min-h-24">
            <div class="flex-none">
                <label for="navi-drawer" class="btn btn-square btn-ghost hover:btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </label>
            </div>
            <div class="flex-none ps-4">
                <EditableListTitle />
            </div>
            <div class="flex-1"></div>
            <div class="flex-none">
                <ListSelector />
            </div>
        </div>);
}

export default Navi