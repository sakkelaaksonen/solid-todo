import createFocusTrap from 'solid-focus-trap'
import { Component, createSignal, onCleanup, Show } from "solid-js";
import DrawerListSelector from "./DrawerListSelector.tsx";
import { IconListBullets } from "./Icons.tsx";
import store from "../store.ts";
import AddNewListForm from "./AddNewListForm.tsx";

const DrawerSide: Component<{
  isOpen: () => boolean,
  onClose: () => void

}> = (props) => {
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null)
  const [initialFocusRef, setInitialFocusRef] =
    createSignal<HTMLElement | null>(null)

  createFocusTrap({
    element: contentRef,
    enabled: props.isOpen,
    initialFocusElement: initialFocusRef,
  })

  return (
    <Show when={props.isOpen()}>
      <div ref={setContentRef} class="drawer-side min-h-full">
        <label onClick={() => {
          document.getElementById("navi-drawer")?.click(); props.onClose();
        }} for="navi-drawer" class="drawer-overlay"></label>
        <div class="min-h-full menu p-4 w-80 bg-base-100 text-base-content">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <button
                onClick={() => {
                  document.getElementById("navi-drawer")?.click();
                  props.onClose();
                }}
                ref={setInitialFocusRef} class="btn btn-xs btn-ghost hover:text-primary">
                <IconListBullets />
              </button>
              <span>All My Dos to Do <span class="text-primary font-bold">({store.listCount()}) </span> </span>
            </div>

          </div>
          <div class="divider"></div>

          <AddNewListForm />

          <div class="divider"></div>
          <DrawerListSelector />
        </div>
      </div>
    </Show>
  )
}

export default DrawerSide;
