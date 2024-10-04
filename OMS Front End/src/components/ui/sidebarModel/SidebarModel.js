import { AppIcons } from "../../../data/appIcons";
import PropTypes from "prop-types";
import Image from "../../image/Image";
import "./SidebarModel.scss";
import { useMemo, useState } from "react";
// import Iconify from "../iconify/Iconify";

const SidebarModel = ({ children, modalTitleIcon, showToggle, ...props }) => {
  const [isRightPosition, setIsRightPosition] = useState(true);

  const handleTogglePosition = () => {
    setIsRightPosition((prev) => !prev);
  };

  const calculateDynamicPosition = useMemo(() => {
    const classWidth = props.contentClass?.split("-")[1]; //This is use to extract the integer of class, for example .content-XX
    const percentage = classWidth ? 100 - parseInt(classWidth) : 65; // This is a default, if there is no value
    return `${percentage}%`;
  }, [props.contentClass]);

  return (
    <div className={`sidebar-model ${props.isOpen ? "active-model" : ""}`}>
      <div className="side-model-section">
        <div
          className={`model-content ${props.contentClass} ${
            isRightPosition ? "right-position" : "left-position"
          }`}
          style={
            isRightPosition
              ? { left: calculateDynamicPosition, right: "0" }
              : { right: calculateDynamicPosition, left: "0" }
          }
        >
          <div className="model-header">
            <div className="model-title">{props.modalTitle}</div>

            {showToggle && (
              <div className="toggle-switch-wrapper">
                <span className="toggle-label">
                  {isRightPosition ? "Move to Left" : "Move to Right"}
                </span>
                <div
                  className={`toggle-switch ${isRightPosition ? "active" : ""}`}
                  onClick={handleTogglePosition}
                />
              </div>
            )}

            <div
              className="close-btn"
              onClick={props.onClose ? props.onClose : null}
            >
              <Image
                imgCustomClassName="default"
                imagePath={AppIcons.CloseIcon}
                altText="Close"
              />
              {/* <Iconify 
              imgCustomClassName="default"
              icon="gg:close-o"
               /> */}
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
  showToggle: PropTypes.bool,
};
export default SidebarModel;
