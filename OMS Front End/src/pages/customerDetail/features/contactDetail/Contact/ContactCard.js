import React, { useEffect, useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";

const ContactCard = ({ childData, handleEdit, showEditIcon, type }) => {
  const emailDropdownRef = useRef(null);
  const phoneDropdownRef = useRef(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);

  const handleClickOutside = (event) => {
    if (
      emailDropdownRef.current &&
      !emailDropdownRef.current.contains(event.target)
    ) {
      setShowEmailDropdown(false);
    }
    if (
      phoneDropdownRef.current &&
      !phoneDropdownRef.current.contains(event.target)
    ) {
      setShowPhoneDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {childData && (
        <>
          <div
            className={`contact-card ${
              showEmailDropdown || showPhoneDropdown ? "dropdown-open" : ""
            }`}
          >
            <div className="contact-card-desc">
              <div className="contact-info">
                <span className="user-icon">
                  <i className="fa fa-user"></i>
                </span>
                <div className="contact-name">
                  <span className="contact-title">
                    <b>{childData.firstName + " " + childData.lastName}</b>
                  </span>
                  {childData.isPrimary && (
                    <span className="primary-label"> ( Primary ) </span>
                  )}
                </div>
              </div>
              <div className="contact-details">
                <div className="dropdown-sec">
                  {childData.emailAddressList?.length > 0 ? (
                    <ContactEmailsDropdown
                      showEmailDropdown={showEmailDropdown}
                      setShowEmailDropdown={setShowEmailDropdown}
                      emailAddressesList={childData.emailAddressList}
                    />
                  ) : null}
                </div>
                <div className="dropdown-sec">
                  {childData.phoneNumberList?.length > 0 ? (
                    <ContactPhoneNumberDropdown
                      showPhoneDropdown={showPhoneDropdown}
                      setShowPhoneDropdown={setShowPhoneDropdown}
                      phoneNumberList={childData.phoneNumberList}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="contact-type-badge">{type}</div>
            <div className="edit-delete-button">
              {showEditIcon ? (
                <button
                  onClick={() => handleEdit(childData?.contactId)}
                  className="edit-btn"
                >
                  <Image imagePath={AppIcons.editThemeIcon} />
                </button>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContactCard;
