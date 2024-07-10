import React, { useRef } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactPhoneNumberDropdown = ({
  showPhoneDropdown,
  setShowPhoneDropdown,
  primaryPhoneNumber,
  phoneNumbers,
}) => {
  const ref = useRef(null);

  const togglePhoneDropdown = () => {
    setShowPhoneDropdown(!showPhoneDropdown);
  };

  const phoneTypesIcon = (type) => {
    switch (type) {
      case 1:
        return (
          <span className="contact-type-icon" title="Home">
            <i className="fa fa-home"></i>
          </span>
        );
      case 2:
        return (
          <span className="contact-type-icon" title="Work">
            <i className="fa fa-briefcase"></i>
          </span>
        );
      case 3:
        return (
          <span className="contact-type-icon" title="Mobile">
            <i className="fa fa-mobile"></i>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="contact-sec">
        <div className="number-list">
          {primaryPhoneNumber ? (
            <>
              <div className="number-type">
                {phoneTypesIcon(primaryPhoneNumber?.phoneTypeId)}
              </div>

              <div
                className={`card-value ml-0 ${
                  primaryPhoneNumber?.isPrimary ? "primary-phone" : ""
                }`}
              >
                {`(${primaryPhoneNumber?.phoneCode}) ${primaryPhoneNumber?.phoneNumber}`}
              </div>
              {/* <span className="title">Ext.</span> */}
              {/* { */}
              <div
                className={`card-value ${
                  primaryPhoneNumber?.isPrimary ? "primary-phone" : ""
                }`}
              >
                {`${
                  primaryPhoneNumber?.extension > 0
                    ? "," + primaryPhoneNumber?.extension
                    : ""
                }`}
              </div>

              {primaryPhoneNumber?.isPrimary ? (
                <div className="primary-icon" title="Is Primary"></div>
              ) : null}

              <span
                className="copy-icon"
                onClick={() =>
                  CopyText(
                    `(${primaryPhoneNumber.phoneCode}) ${
                      primaryPhoneNumber.phoneNumber
                    } 
                            ${
                              primaryPhoneNumber.extension > 0
                                ? primaryPhoneNumber.extension
                                : ""
                            }`,
                    "phone"
                  )
                }
              >
                <Image imagePath={AppIcons.copyIcon} altText="Icon" />
              </span>
            </>
          ) : null}
        </div>
      </div>
      <div
        className="drop-down mobilenumber"
        ref={ref}
        onClick={togglePhoneDropdown}
      >
        <i
          className={`fa fa-caret-down ${showPhoneDropdown ? "rotated" : ""}`}
          aria-hidden="true"
        ></i>
        {showPhoneDropdown && (
          <div className="dropdown-content show">
            {phoneNumbers.map((phoneData, index) => (
              <span className="contact-list d-flex flex-row" key={index}>
                <span>
                  {phoneTypesIcon(phoneData?.phoneTypeId)}
                  <span className="ml-1">
                    {`(${phoneData.phoneCode}) ${phoneData.phoneNumber}${
                      phoneData.extension ? `, ${phoneData.extension}` : ""
                    }`}
                  </span>
                </span>
                <span
                  className="copy-icon"
                  onClick={() =>
                    CopyText(
                      `(${phoneData.phoneCode}) ${phoneData.phoneNumber} ${
                        phoneData.extension > 0 ? phoneData.extension : ""
                      }`,
                      "phone"
                    )
                  }
                >
                  <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContactPhoneNumberDropdown;
