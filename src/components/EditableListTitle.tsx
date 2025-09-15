import { Component, createSignal } from "solid-js";
import type { TodoStore, TodoList } from "../store";

interface EditableListTitleProps {
    list: TodoList;
    store: TodoStore;
}

const EditableListTitle: Component<EditableListTitleProps> = (props) => {
    const [editing, setEditing] = createSignal(false);
    const [editName, setEditName] = createSignal(props.list.name);

    return (
        <div class="flex items-center gap-2 mb-2">
            <h3 class="text-lg font-semibold">
                {editing()
                    ? <input
                        class="border px-2 py-1"
                        value={editName()}
                        onInput={e => setEditName(e.currentTarget.value)}
                        onBlur={() => {
                            if (editName() !== props.list.name && editName().trim() !== "") {
                                props.store.editListName(props.list.id, editName().trim());
                            }
                            setEditing(false);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                if (editName() !== props.list.name && editName().trim() !== "") {
                                    props.store.editListName(props.list.id, editName().trim());
                                }
                                setEditing(false);
                            } else if (e.key === "Escape") {
                                setEditName(props.list.name);
                                setEditing(false);
                            }
                        }}
                        autofocus
                    />
                    : <>Tasks in "{props.list.name}"</>
                }
            </h3>
            <button
                class="text-gray-500"
                onClick={() => setEditing(true)}
                aria-label={`Edit list name ${props.list.name}`}
            >✎</button>
        </div>
    );
};

export default EditableListTitle;
