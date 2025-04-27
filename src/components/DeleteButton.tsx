import {DeleteButtonProps} from "../interfaces/Props.ts";

function DeleteButton({ message = "Delete Library", onShowPopup}: DeleteButtonProps) {
    return (
        <button
            className="absolute right-8 border-none
            w-32 h-12 bg-red-700 hover:bg-red-600
            rounded-lg cursor-pointer text-white transition-colors duration-200 z-50"
            onClick={() => onShowPopup(true)}
        >
            {message}
        </button>
    );
}

export default DeleteButton;