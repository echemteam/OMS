import React, { useEffect, useRef, useState } from "react";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";
import { AppIcons } from "../../../../../data/appIcons";
import { forwardRef } from "react";
import Image from "../../../../../components/image/Image";

const ContactDetailCard = forwardRef(
  ({ contactItem, handleEdit, showEditIcon }) => {
    const emailDropdownRef = useRef(null);
    const phoneDropdownRef = useRef(null);
    const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);

    //** API Call's */
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
      <>
        <div className="contact-main-card-section d-none">
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
                    <b>{contactItem.firstName + " " + contactItem.lastName}</b>
                  </span>
                  {contactItem.isPrimary && (
                    <span className="primary-label"> ( Primary ) </span>
                  )}
                </div>
              </div>
              <div className="contact-details">
                <div className="dropdown-sec">
                  {contactItem.emailAddressList?.length > 0 ? (
                    <ContactEmailsDropdown
                      showEmailDropdown={showEmailDropdown}
                      setShowEmailDropdown={setShowEmailDropdown}
                      emailAddressesList={contactItem.emailAddressList}
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
        <div className="contact-main-card-section">
          <div className="card-section-body">
            <div className="top-profile-section">
              <div className="profile-sec">
                <span className="profile-icon">PC</span>
                <span className="contact-name">
                  {/* {contactItem.firstName + " " + contactItem.lastName} */}
                  Pankaj Chauhan
                </span>
              </div>
              <div className="right-action-icon">
                <Image
                  imagePath={AppIcons.EllipsisIcon}
                  altText="EllipsisIcon"
                />
                <div className="customer-detail-model">
                  <div className="customer-card-top-sec">
                    <div className="profile-icon">
                      <span className="profile-text">PC</span>
                    </div>
                    <div className="profile-name">Pankaj Chauhan</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="customer-details">
              <div className="email-address">
                {contactItem.emailAddressList?.length > 0 ? (
                  <ContactEmailsDropdown
                    showEmailDropdown={showEmailDropdown}
                    setShowEmailDropdown={setShowEmailDropdown}
                    emailAddressesList={contactItem.emailAddressList}
                  />
                ) : null}
              </div>
              <div className="contact-number">
                {contactItem.phoneNumberList?.length > 0 ? (
                  <ContactPhoneNumberDropdown
                    showPhoneDropdown={showPhoneDropdown}
                    setShowPhoneDropdown={setShowPhoneDropdown}
                    phoneNumberList={contactItem.phoneNumberList}
                  />
                ) : null}
              </div>
              <div className="customer-type">
                <span
                  className={`customer-type-icon ${getContactTypeClass(
                    contactItem.type
                  )}`}
                ></span>
                <span
                  className={`type-value ${getContactTypeClass(
                    contactItem.type
                  )}`}
                >
                  {contactItem.type}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ContactDetailCard;
