import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./SwalService.scss";
import { AppIcons } from "../../data/appIcons";

export const SwalServices = withReactContent(Swal);

const customClass = {
  container: "",
  popup: "",
  header: "",
  title: "",
  closeButton: "",
  icon: "",
  image: "",
  htmlContainer: "",
  input: "",
  inputLabel: "",
  validationMessage: "",
  actions: "",
  confirmButton: "btn theme-button",
  denyButton: "btn dark-btn",
  cancelButton: "btn dark-btn",
  loader: "",
  footer: "",
  timerProgressBar: "",
};
const SwalAlert = () => {
  const success = (text, title) => {
    return SwalServices.fire({
      title: title,
      text: text,
      icon: "success",
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  };

  const error = (text, title) => {
    return SwalServices.fire({
      title: title,
      text: text,
      icon: "error",
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  };

  const warning = (title, text) => {
    return SwalServices.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  };

  const info = (title, text) => {
    return SwalServices.fire({
      title: title,
      text: text,
      icon: "info",
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  };

  const confirm = (title, text, saveBtnText, cancelBtnText, isCancelButton) => {
    return SwalServices.fire({
      title: title,
      text: text,
      icon: "question",
      // iconHtml: '<span className="warning-icons"><img src="/warningtick.png"/></span>',
      showCancelButton: isCancelButton === false ? isCancelButton : true,
      confirmButtonText: saveBtnText,
      cancelButtonText: cancelBtnText,
      showCloseButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      customClass: customClass,
    }).then((result) => {
      if (result.value) {
        return true;
      } else if (result.dismiss === SwalServices.DismissReason.cancel) {
        return false;
      }
    });
  };


  const blocked = (title, text, iconUrl) => {
    return SwalServices.fire({
      title: title,
      text: text,
      iconHtml: `<img src="${AppIcons.BlockedIcon}" class="swal-icon"/>`,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
      customClass: customClass,
    });
  };

  // Export the SwalService functions
  return { confirm, success, warning, info, error, blocked };
};

export default SwalAlert;
