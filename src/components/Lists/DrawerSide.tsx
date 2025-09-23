import createFocusTrap from 'solid-focus-trap'
import { Component, createSignal, Show } from "solid-js";
import DrawerListSelector from "./DrawerListSelector.tsx";
import { IconListBullets } from "../ui/Icons.tsx";
import { type StoreProps } from "../../store/store";
import AddNewListForm from "./AddNewListForm.tsx";


type Props = StoreProps & {
  isOpen: () => boolean,
  onClose: () => void
}

const DrawerSide: Component<Props> = (props) => {
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null)
  const [initialFocusRef, setInitialFocusRef] =
    createSignal<HTMLElement | null>(null)

  createFocusTrap({
    element: contentRef,
    enabled: props.isOpen,
    initialFocusElement: initialFocusRef,
  })

  const handleClose = () => {
    document.getElementById("navi-drawer")?.click();
    props.onClose();
  }

  return (
    <Show when={props.isOpen()}>
      <div ref={setContentRef} class="drawer-side min-h-full">
        <label onClick={handleClose} for="navi-drawer" class="drawer-overlay" data-testId="drawer-overlay"></label>
        <div class="min-h-full menu p-4 w-80 md:w-96 bg-base-100 text-base-content">

          <div class="flex items-center gap-2 my-4 pe-4">

            <h2>All My Todo Lists <span class="font-bold text-sm">({props.actions.listCount()}) </span> </h2>
            <span class="flex-1"></span>
            <button
              title="Close List Manager"
              onClick={handleClose}
              ref={setInitialFocusRef} class="btn btn-xs btn-ghost hover:text-primary">
              <IconListBullets />
            </button>


          </div>
          <div class="divider"></div>

          <AddNewListForm store={props.store} actions={props.actions} />

          <div class="divider"></div>
          <DrawerListSelector onSelectList={handleClose} actions={props.actions} />
        </div>
      </div>
    </Show>
  )
}

export default DrawerSide;
