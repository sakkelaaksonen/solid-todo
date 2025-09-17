import { Component } from "solid-js";
import EditableListTitle from "./EditableListTitle";
// import AddNewListForm from "./AddNewListForm.tsx";
import ListSelector from "./ListSelector.tsx";
import { IconListBullets } from "./Icons.tsx";


const Navi: Component = () => {
    return (
        <div class="navbar bg-secondary-content border-transparent border-b-primary border-2 shadow-sm mb-2 sticky top-0 z-10 min-h-24">
            <div class="flex-none">
                <label for="navi-drawer" class="btn btn-square btn-ghost hover:text-primary">
                    <IconListBullets />
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