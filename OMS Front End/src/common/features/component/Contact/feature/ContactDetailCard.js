import React, { useEffect, useRef, useState, forwardRef } from "react";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";
import PropTypes from "prop-types";
import Iconify from "../../../../../components/ui/iconify/Iconify";
import ContactCloneModel from "./ContactCloneModel";

const ContactDetailCard = forwardRef(({ contactItem, handleEdit, showEditIcon, openModalId, setOpenModalId, isSupplier, onGetContactList, getCompletionCount }, ref) => {

  const cloneRef = useRef();
  const emailDropdownRef = useRef(null);
  const phoneDropdownRef = useRef(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
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

  const handleOptionsClick = () => {
    setOpenModalId(
      contactItem.contactId === openModalId ? null : contactItem.contactId
    );
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleBodyClick = (e) => {
    if (!e.target.closest(".right-action-icon")) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    if (isOptionsOpen) {
      document.body.addEventListener("click", handleBodyClick);
    } else {
      document.body.removeEventListener("click", handleBodyClick);
    }
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isOptionsOpen]);

  const handleClone = (contactItem) => {
    if (cloneRef.current) {
      cloneRef.current.callChildFunction(contactItem);
    }
  };

  return (
    <>
      <div className="contact-main-card-section d-none">
        <div className={`contact-card ${showEmailDropdown || showPhoneDropdown ? "dropdown-open" : ""}`}>
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
                  <span className="primary-card"> Primary </span>
                )}
              </div>
              <div className="right-action-icon">
                <div className="edit-view-icon">
                  <div className="edit-delete-button">
                    {showEditIcon ? (
                      <button
                        onClick={() => handleEdit(contactItem?.contactId)}
                        className="edit-btn"
                      >
                        <Iconify icon="tabler:pencil" />
                      </button>
                    ) : null}
                  </div>
                  <span
                    className="option-icon"
                    role="button"
                    tabIndex="0"
                    onClick={handleOptionsClick}
                  >
                    <Iconify icon="mdi:ellipsis-vertical" />
                  </span>
                </div>
                <div
                  ref={ref}
                  className={`customer-detail-model ${openModalId === contactItem.contactId ? "open-model" : ""
                    }`}
                >
                  <div className="customer-card-top-sec">
                    <div className="profile-icon">
                      <span className="profile-text">
                        {contactItem.firstName && contactItem.lastName
                          ? contactItem.firstName.charAt(0).toUpperCase() +
                          contactItem.lastName.charAt(0).toUpperCase()
                          : ""}
                      </span>
                    </div>
                    <div className="profile-name">
                      {contactItem.firstName + " " + contactItem.lastName}
                    </div>
                  </div>
                  <div className="bottom-contact-desc">
                    {contactItem.emailAddressList?.length > 0 ? (
                      <div className="contact-part">
                        <div className="contact-type-list">
                          <i className="fa fa-envelope-o"></i>
                          <ul>
                            <li>
                              {contactItem.emailAddressList?.length > 0 ? (
                                <ContactEmailsDropdown
                                  isOptionsOpen={isOptionsOpen}
                                  emailAddressesList={
                                    contactItem.emailAddressList
                                  }
                                />
                              ) : null}
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : null}
                    {contactItem.phoneNumberList?.length > 0 ? (
                      <div className="contact-part">
                        <div className="contact-type-list">
                          <ul className="number-list">
                            <li>
                              {contactItem.phoneNumberList?.length > 0 ? (
                                <ContactPhoneNumberDropdown
                                  isOptionsOpen={isOptionsOpen}
                                  phoneNumberList={contactItem.phoneNumberList}
                                />
                              ) : null}
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-details">
              <div className="dropdown-sec">
                {contactItem.emailAddressList?.length > 0 ? (
                  <ContactEmailsDropdown
                    emailAddressesList={contactItem.emailAddressList}
                  />
                ) : null}
              </div>
              <div className="dropdown-sec">
                {contactItem.phoneNumberList?.length > 0 ? (
                  <ContactPhoneNumberDropdown
                    phoneNumberList={contactItem.phoneNumberList}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className={`contact-type-badge ${getContactTypeClass(contactItem.type)}`}>
            {contactItem.type}
          </div>
          <div className="edit-delete-button">
            {showEditIcon ? (
              <button onClick={() => handleEdit(contactItem?.contactId)} className="edit-btn">
                {/* <Image imagePath={AppIcons.editThemeIcon} /> */}
                <Iconify icon="tabler:pencil" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="contact-main-card-section">
        <div className="card-section-body">
          <div className="top-profile-section">
            <div className="profile-sec">
              <span className="profile-icon">
                {contactItem.firstName && contactItem.lastName
                  ? contactItem.firstName.charAt(0).toUpperCase() +
                  contactItem.lastName.charAt(0).toUpperCase()
                  : ""}
              </span>
              <span className="contact-name">
                {contactItem.firstName + " " + contactItem.lastName}
              </span>
              {contactItem.isPrimary && (
                <span className="primary-card"> Primary </span>
              )}
            </div>
            <div className="right-action-icon">
              <div className="edit-view-icon">
                <div className="d-flex edit-delete-button">
                  {showEditIcon ? (
                    <>
                      <button onClick={() => handleClone(contactItem)} className="edit-btn">
                        <Iconify icon="clarity:clone-line" />
                      </button>
                      <button onClick={() => handleEdit(contactItem?.contactId)} className="edit-btn ml-1" >
                        {/* <Image imagePath={AppIcons.editThemeIcon} /> */}
                        <Iconify icon="tabler:pencil" />
                      </button>
                    </>
                  ) : null}
                </div>
                {/* <span className="option-icon" onClick={handleOptionsClick}> */}
                <span
                  className="option-icon"
                  role="button"
                  tabIndex="0"
                  onClick={handleOptionsClick}
                >
                  {/* <Image
                      imagePath={AppIcons.EllipsisIcon}
                      altText="EllipsisIcon"
                    /> */}
                  <Iconify icon="mdi:ellipsis-vertical" />
                </span>
              </div>
              <div
                ref={ref}
                className={`customer-detail-model ${openModalId === contactItem.contactId ? "open-model" : ""
                  }`}
              >
                <div className="customer-card-top-sec">
                  <div className="profile-icon">
                    <span className="profile-text">
                      {contactItem.firstName && contactItem.lastName
                        ? contactItem.firstName.charAt(0).toUpperCase() +
                        contactItem.lastName.charAt(0).toUpperCase()
                        : ""}
                    </span>
                  </div>
                  <div className="profile-name">
                    {contactItem.firstName + " " + contactItem.lastName}
                  </div>
                </div>
                <div className="bottom-contact-desc">
                  {contactItem.emailAddressList?.length > 0 ? (
                    <div className="contact-part">
                      <div className="type-title">
                        <i className="fa fa-envelope-o"></i>
                        <span className="contact-type-title">
                          Email Address
                        </span>
                      </div>
                      <div className="contact-type-list">
                        <ul>
                          <li>
                            {contactItem.emailAddressList?.length > 0 ? (
                              <ContactEmailsDropdown
                                isOptionsOpen={isOptionsOpen}
                                emailAddressesList={
                                  contactItem.emailAddressList
                                }
                              />
                            ) : null}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
                  {contactItem.phoneNumberList?.length > 0 ? (
                    <div className="contact-part">
                      <div className="type-title">
                        <i className="fa fa-phone"></i>
                        <span className="contact-type-title">
                          Phone Number
                        </span>
                      </div>
                      <div className="contact-type-list">
                        <ul className="number-list">
                          <li>
                            {contactItem.phoneNumberList?.length > 0 ? (
                              <ContactPhoneNumberDropdown
                                isOptionsOpen={isOptionsOpen}
                                phoneNumberList={contactItem.phoneNumberList}
                              />
                            ) : null}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
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
      <ContactCloneModel cloneRef={cloneRef} isSupplier={isSupplier} onGetContactList={onGetContactList} getCompletionCount={getCompletionCount} />
    </>
  );
}
);

ContactDetailCard.propTypes = {
  contactItem: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isPrimary: PropTypes.bool,
    emailAddressList: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
      })
    ),
    phoneNumberList: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
      })
    ),
    type: PropTypes.string,
    contactId: PropTypes.number,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  showEditIcon: PropTypes.bool.isRequired,
};

export default ContactDetailCard;
