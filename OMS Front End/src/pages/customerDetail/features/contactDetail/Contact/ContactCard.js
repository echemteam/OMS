import React, { useEffect, useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";

const ContactCard = ({ childData, handleEdit }) => {
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const emailDropdownRef = useRef(null);
  const phoneDropdownRef = useRef(null);

  const cardInfoData = childData.cardInformation;

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = cardInfoData.emailAddress.filter(data => data.isPrimary === false);
  const primaryEmailAddres = cardInfoData.emailAddress.find(data => data.isPrimary === true);
  const primaryPhoneNumber = cardInfoData.phoneNumber.find(data => data.isPrimary === true);
  const phoneNumbers = cardInfoData.phoneNumber.filter(data => data.isPrimary === false);

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
      {cardInfoData && (
        <>
          <div className={`contact-card ${showEmailDropdown || showPhoneDropdown ? 'dropdown-open' : ''}`}>
            <div className="add-line">
              <div className="user-icon-name">
                <span className="icon">
                  <Image imagePath={AppIcons.User3DIcon}></Image>
                </span>
                <div className="d-flex flex-column ml-1 contact-name-title">
                  <span className="label-txt user-name">
                    <b>
                      {cardInfoData.firstName + " " + cardInfoData.lastName}
                    </b>
                  </span>
                  {cardInfoData.isPrimary && (
                    <span className="primary-label"> ( Primary ) </span>
                  )}
                </div>

                <span>|</span>
              </div>
              <div className="contact-right-info">
                <ContactEmailsDropdown showEmailDropdown={showEmailDropdown} setShowEmailDropdown={setShowEmailDropdown} primaryEmailAddres={primaryEmailAddres} emailAddresses={emailAddresses} />
                <span>|</span>
                <ContactPhoneNumberDropdown showPhoneDropdown={showPhoneDropdown} setShowPhoneDropdown={setShowPhoneDropdown} primaryPhoneNumber={primaryPhoneNumber} phoneNumbers={phoneNumbers} />
              </div>
            </div>
            <div className="edit-delete-button">
              <button
                onClick={() =>
                  handleEdit(cardInfoData?.contactId)
                }
                className="edit-btn"
              >
                <Image imagePath={AppIcons.editThemeIcon} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ContactCard;