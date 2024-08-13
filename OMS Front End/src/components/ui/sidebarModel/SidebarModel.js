import { AppIcons } from "../../../data/appIcons";
import PropTypes from "prop-types";
import Image from "../../image/Image";
import "./SidebarModel.scss";
import Iconify from "../iconify/Iconify";

const SidebarModel = ({ children, modalTitleIcon, ...props }) => {
  return (
    <div className={`sidebar-model ${props.isOpen ? "active-model" : ""}`}>
      <div className="side-model-section">
        <div className={`model-content ${props.contentClass}`}>
          <div className="model-header">
            <div className="model-title">{props.modalTitle}</div>
            <div
              className="close-btn"
              onClick={props.onClose ? props.onClose : null}
            >
              {/* <Image
                imgCustomClassName="default"
                imagePath={AppIcons.CloseIcon}
                altText="Close"
              /> */}
              <Iconify 
              imgCustomClassName="default"
              icon="gg:close-o"
               />
            </div>
          </div>
          <div className="model-body">
            <div className="body-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
SidebarModel.propTypes = {
  children: PropTypes.node,
  modalTitleIcon: PropTypes.string,
  modalTitle: PropTypes.string,
  contentClass: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default SidebarModel;
