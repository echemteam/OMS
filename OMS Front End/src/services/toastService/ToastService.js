import { toast } from "react-toastify";

const ToastService = {

    // toast message on success
    success: (message) => {
        toast.success(message)
    },

    // toast message if any error
    error: (message) => {
        toast.error(message)
    },

    // toast message if any warning
    warning: (message) => {
        toast.warning(message)
    },

    // toast message if any Information
    info: (message) => {
        toast.info(message)
    },

}

export default ToastService;