import { Component, onCleanup, Show, createSignal } from "solid-js";
import createFocusTrap from 'solid-focus-trap'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  showButton?: boolean;
}

const Modal: Component<ModalProps> = (props) => {
  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null)
  createSignal<HTMLElement | null>(null)

  createFocusTrap({
    element: contentRef,
    enabled: props.isOpen,
  })


  let dialogRef: HTMLDialogElement | undefined;

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === dialogRef) {
      props.onClose();
    }
  };


  // onCleanup(() => {
  //   console.log('Modal unmounted. Sometimes this fails and focus trap fails on next open')
  // });
  return (
    <Show when={props.isOpen}>
      <dialog
        ref={dialogRef}
        class="modal"
        onClick={handleOverlayClick}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open
      >
        <form method="dialog" ref={setContentRef} class="modal-box max-w-sm md:max-w-md border-primary border-2">
          {props.children}
          <div class="modal-action justify-center">
            {props.showButton && <button class="btn" onClick={props.onClose}>
              Close
            </button>}
          </div>
        </form>
      </dialog>
    </Show>
  );
};

export default Modal;
