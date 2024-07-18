import React, { useRef } from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactEmailsDropdown = ({ showEmailDropdown, setShowEmailDropdown, emailAddressesList }) => {

  const ref = useRef(null);
  const toggleEmailDropdown = () => {
    setShowEmailDropdown(!showEmailDropdown);
  };

  let emailAddresses = emailAddressesList && emailAddressesList.filter(data => data.isPrimary === false);
  let primaryEmailAddress = emailAddressesList && emailAddressesList.find(data => data.isPrimary === true);

  if (!primaryEmailAddress && emailAddressesList && emailAddressesList.length > 0) {
    primaryEmailAddress = emailAddressesList[0];
    emailAddresses = emailAddresses.slice(1);
  }

  return (
    <React.Fragment>
      <div className="dropdown-desc-sec">
        <div className="icon-part" title="Home">
          <i className="fa fa-envelope"></i>
        </div>
        <div className="desc-part">
          {primaryEmailAddress?.emailAddress ? (
            <>
              <div className={`values ${primaryEmailAddress?.isPrimary ? "primary-email" : ""}`}>
                {primaryEmailAddress?.emailAddress}
              </div>
              <span className="copy-icon" onClick={() => CopyText(primaryEmailAddress?.emailAddress, "email")}>
                <Image imagePath={AppIcons.copyIcon} altText="Icon" />
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="drop-down" ref={ref} onClick={toggleEmailDropdown}>
        <i className={`fa fa-caret-down ${showEmailDropdown ? "rotated" : ""}`} aria-hidden="true" ></i>
        {showEmailDropdown && (
          <div className="dropdown-content show">
            {emailAddresses.map((emaildata, index) => (
              <>
                <span className="contact-list d-flex flex-row" key={index}>
                  <span>{emaildata?.emailAddress}</span>
                  <span
                    className="copy-icon"
                    onClick={() => CopyText(emaildata?.emailAddress, "email")}
                  >
                    <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                  </span>
                </span>
              </>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};


export default ContactEmailsDropdown;
