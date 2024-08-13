import React  from "react";
import { AppIcons } from "../../../../../data/appIcons";
import Image from "../../../../../components/image/Image";
import CopyText from "../../../../../utils/CopyText/CopyText";
import PropTypes from "prop-types";

const ContactEmailsDropdown = ({
  
  emailAddressesList,
  isOptionsOpen,
}) => {
  let emailAddresses = emailAddressesList?.filter(data => data.isPrimary === false);
  let primaryEmailAddress = emailAddressesList?.find(data => data.isPrimary === true);


  if (
    !primaryEmailAddress &&
    emailAddressesList &&
    emailAddressesList.length > 0
  ) {
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
              <div
                className={`values`}
              >
                {primaryEmailAddress?.emailAddress}
              </div>
              <span
                className={`copy-icon ${
                  primaryEmailAddress?.isPrimary ? "primary-email" : ""
                }`}
              >
                <div className="copy" onClick={() =>
                  CopyText(primaryEmailAddress?.emailAddress, "email") 
                }>
                <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                </div>
              </span>
            </>
          ) : null}
        </div>
      </div>
      {isOptionsOpen ? (
        <>
          {emailAddresses.map((emaildata, index) => (
             
              <span className="contact-list d-flex flex-row" key={index}>
                <span>{emaildata?.emailAddress}</span>
                <span
                  className="copy-icon"
                  title="Copy"
                  onClick={() => CopyText(emaildata?.emailAddress, "email")}
                >
                  {/* <i className="fa fa-files-o"></i> */}
                  <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                </span>
              </span>
            
          ))}
        </>
      ) : null}
    </React.Fragment>
  );
};

ContactEmailsDropdown.propTypes = {

  emailAddressesList: PropTypes.arrayOf(
    PropTypes.shape({
      emailAddress: PropTypes.string ,
      isPrimary: PropTypes.bool 
    })
  ).isRequired,
  isOptionsOpen: PropTypes.bool
};

export default ContactEmailsDropdown;
