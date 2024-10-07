import React from "react";
import PropTypes from "prop-types";
import Image from "../../image/Image";
import "./Buttons.scss";
import Iconify from "../iconify/Iconify";

function Buttons(props) {
  const {
    titleText,
    isLoading,
    buttonTypeClassName,
    onClick,
    textWithIcon,
    isIcon,
    iconClass,
    buttonText,
    imagePath,
    isDisable,
    isTooltip,
    tootipText,
  } = props;

  return (
    <>
      {isTooltip ? (
        <span className="tooltip-div btn-tooltip">
          <button
            type="button"
            className={`btn ${buttonTypeClassName} ${
              isDisable ? "disable-btn" : ""
            }`}
            onClick={onClick}
            disabled={isDisable}
            title={titleText}
          >
            {isLoading ? (
              <div className="button-loading-part"></div>
            ) : (
              <>
                {textWithIcon && (
                  <Image imagePath={imagePath} altText="button Icon" />
                )}
                {textWithIcon && buttonText ? (
                  <span className={`${textWithIcon ? "label-l-space" : ""}`}>{textWithIcon && buttonText}</span>
                ) : null}
                {!textWithIcon && buttonText ? (
                  <span className={`${textWithIcon ? "label-l-space" : ""}`}>{!textWithIcon && buttonText}</span>
                ) : null}

                {isIcon && <Iconify icon={iconClass} className="button-icon" />}
              </>
            )}
          </button>
          <div className="tooltip-show">
            <p>{tootipText}</p>
          </div>
          <div className="tooltip-arrow-icon"></div>
        </span>
      ) : (
        <button
          type="button"
          className={`btn ${buttonTypeClassName} ${
            isDisable ? "disable-btn" : ""
          }`}
          onClick={onClick}
          disabled={isDisable}
          title={titleText}
        >
          {isLoading ? (
            <div className="button-loading-part"></div>
          ) : (
            <>
              {textWithIcon && (
                <Image imagePath={imagePath} altText="button Icon" />
              )}
              {textWithIcon && buttonText ? (
                <span className={`${textWithIcon ? "label-l-space" : ""}`}>{textWithIcon && buttonText}</span>
              ) : null}
              {!textWithIcon && buttonText ? (
                <span className={`${textWithIcon ? "label-l-space" : ""}`}>{!textWithIcon && buttonText}</span>
              ) : null}

              {isIcon && <Iconify icon={iconClass} className="button-icon" />}
            </>
          )}
        </button>
      )}
    </>
  );
}

Buttons.propTypes = {
  titleText: PropTypes.string,
  isLoading: PropTypes.bool,
  buttonTypeClassName: PropTypes.string,
  onClick: PropTypes.func,
  textWithIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  imagePath: PropTypes.string,
  isDisable: PropTypes.bool,
};

export default Buttons;
