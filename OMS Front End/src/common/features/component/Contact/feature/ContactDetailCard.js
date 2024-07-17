import React, { useEffect, useRef, useState } from "react";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";
import { AppIcons } from "../../../../../data/appIcons";
import { forwardRef } from "react";
import Image from "../../../../../components/image/Image";

const ContactDetailCard = forwardRef(({ contactItem, handleEdit, showEditIcon }) => {
  const emailDropdownRef = useRef(null);
  const phoneDropdownRef = useRef(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);

  //** API Call's */
  const handleClickOutside = (event) => {
    if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target)) {
      setShowEmailDropdown(false);
    }
    if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target)) {
      setShowPhoneDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const getContactTypeClass = (type) => {
    switch (type) {
      case "Primary":
        return "badge-primary contact-badge";

      case "EndUser":
        return "badge-endUser contact-badge";

      // Supplier Start
      case "Accounts Receivable":
        return "badge-endUser contact-badge";
      // Supplier End

      case "Purchasing":
        return "badge-purchasing contact-badge";

      // Supplier Start
      case "Purchase Order":
        return "badge-purchasing contact-badge";
      // Supplier End

      case "Invoice Submission":
        return "badge-submission contact-badge";

      // Supplier Start
      case "QC department":
        return "badge-submission contact-badge";
      // Supplier End

      case "Invoice Follow-up":
        return "badge-followup contact-badge";

      // Supplier Start
      case "Sales Department":
        return "badge-followup contact-badge";
      // Supplier End

      case "AP":
        return "badge-ap contact-badge";

      default:
        return "badge-default";
    }
  };

  return (
    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-12" >
      <div className={`contact-card ${showEmailDropdown || showPhoneDropdown ? "dropdown-open" : ""}`}>
        <div className="contact-card-desc">
          <div className="contact-info">
            <span className="user-icon">
              <i className="fa fa-user"></i>
            </span>
            <div className="contact-name">
              <span className="contact-title">
                <b>
                  {contactItem.firstName +
                    " " +
                    contactItem.lastName}
                </b>
              </span>
              {contactItem.isPrimary && (
                <span className="primary-label">
                  {" "}
                  ( Primary ){" "}
                </span>
              )}
            </div>
          </div>
          <div className="contact-details">
            <div className="dropdown-sec">
              {contactItem.emailAddressList?.length > 0 ? (
                <ContactEmailsDropdown
                  showEmailDropdown={showEmailDropdown}
                  setShowEmailDropdown={setShowEmailDropdown}
                  emailAddressesList={
                    contactItem.emailAddressList
                  }
                />
              ) : null}
            </div>
            <div className="dropdown-sec">
              {contactItem.phoneNumberList?.length > 0 ? (
                <ContactPhoneNumberDropdown
                  showPhoneDropdown={showPhoneDropdown}
                  setShowPhoneDropdown={setShowPhoneDropdown}
                  phoneNumberList={contactItem.phoneNumberList}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div
          className={`contact-type-badge ${getContactTypeClass(
            contactItem.type
          )}`}
        >
          {contactItem.type}
        </div>
        <div className="edit-delete-button">
          {showEditIcon ? (
            <button
              onClick={() => handleEdit(contactItem?.contactId)}
              className="edit-btn"
            >
              <Image imagePath={AppIcons.editThemeIcon} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
);

export default ContactDetailCard;
