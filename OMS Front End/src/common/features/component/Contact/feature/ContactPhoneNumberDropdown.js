import React, { useRef } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactPhoneNumberDropdown = ({ showPhoneDropdown, setShowPhoneDropdown, phoneNumberList,isOptionsOpen }) => {

  const ref = useRef(null);
  const togglePhoneDropdown = () => {
    setShowPhoneDropdown(!showPhoneDropdown);
  };

  let phoneNumbers = phoneNumberList && phoneNumberList.filter((data) => data.isPrimary === false);
  let primaryPhoneNumber = phoneNumberList && phoneNumberList.find((data) => data.isPrimary === true);

  if (!primaryPhoneNumber && phoneNumberList && phoneNumberList.length > 0) {
    primaryPhoneNumber = phoneNumberList[0];
    phoneNumbers = phoneNumbers.slice(1);
  }

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
              <div className={`card-value ml-0 ${primaryPhoneNumber?.isPrimary ? "primary-phone" : ""}`}>
                {`(${primaryPhoneNumber?.phoneCode}) ${primaryPhoneNumber?.phoneNumber}`}
              </div>
              {/* <span className="title">Ext.</span> */}
              {/* { */}
              <div className={`card-value ${primaryPhoneNumber?.isPrimary ? "primary-phone" : ""}`} >
                {`${primaryPhoneNumber?.extension > 0 ? "," + primaryPhoneNumber?.extension : ""}`}
              </div>
              {primaryPhoneNumber?.isPrimary ? (
                <div className="primary-icon" title="Is Primary"></div>
              ) : null}
              <span className="copy-icon" title="Copy" onClick={() => CopyText(`(${primaryPhoneNumber.phoneCode}) ${primaryPhoneNumber.phoneNumber} 
              ${primaryPhoneNumber.extension > 0 ? primaryPhoneNumber.extension : ""}`, "phone")}>
                <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                {/* <i className="fa fa-files-o"></i> */}
              </span>
            </>
          ) : null}
        </div>
      </div>
      {isOptionsOpen ? 
      <>
     {phoneNumbers.map((phoneData, index) => (
              <span className="contact-list d-flex flex-row" key={index}>
                <span className="number-list">
                  {phoneTypesIcon(phoneData?.phoneTypeId)}
                  <span className="">
                    {`(${phoneData.phoneCode}) ${phoneData.phoneNumber}${phoneData.extension ? `, ${phoneData.extension}` : ""
                      }`}
                  </span>
                </span>
                <span className="copy-icon" title="Copy" onClick={() => CopyText(`(${phoneData.phoneCode}) ${phoneData.phoneNumber} ${phoneData.extension > 0 ? phoneData.extension : ""}`, "phone")} >
                  {/* <i className="fa fa-files-o"></i> */}
                  <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                </span>
              </span>
            ))}
      </>
      :null}
    </React.Fragment>
  );
};

export default ContactPhoneNumberDropdown;
