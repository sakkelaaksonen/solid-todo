import { Component, Show } from "solid-js";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
    showButton?: boolean;
}

const Modal: Component<ModalProps> = (props) => {
    let dialogRef: HTMLDialogElement | undefined;

    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === dialogRef) {
            props.onClose();
        }
    };

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
                <form method="dialog" class="modal-box">
                    {props.children}
                    <div class="modal-action">
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