import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import ContactEmailsDropdown from "./ContactEmailsDropdown";
import ContactPhoneNumberDropdown from "./ContactPhoneNumberDropdown";
import { AppIcons } from "../../../../../data/appIcons";
import { forwardRef } from "react";
import Image from "../../../../../components/image/Image";
import NoRecordFound from "../../../../../components/ui/noRecordFound/NoRecordFound";
import DataLoader from "../../../../../components/ui/dataLoader/DataLoader";

const ContactDetailCard = forwardRef(
  ({ keyId, handleEdit, showEditIcon, getListRef, getContactByKeyId }) => {
    const emailDropdownRef = useRef(null);
    const phoneDropdownRef = useRef(null);
    const [contactDetails, setContactDetails] = useState([]);
    const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);

    //** API Call's */
    /**
     * This hook dynamically sets the API call based on the module (customer or supplier).
     * The API endpoint and parameters are configured within the SupplierContactDetail OR CustomerContactDetail component.
     * It fetches Contact details by the customer or supplier ID.
     */
    const [
      getContactList,
      {
        isFetching: isGetContactFetching,
        isSuccess: isGetContactSucess,
        data: isGetcontactItem,
      },
    ] = getContactByKeyId();

    //** UseEffect */
    useEffect(() => {
      onGetContactList();
    }, [keyId]);

    useEffect(() => {
      if (!isGetContactFetching && isGetContactSucess && isGetcontactItem) {
        setContactDetails(isGetcontactItem);
      }
    }, [isGetContactFetching, isGetContactSucess, isGetcontactItem]);

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

    //** Get Contact List */
    const onGetContactList = () => {
      let req = {
        id: keyId,
        searchText: "", // Initial call: no search text provided.
        contactType: "", // Initial call: no specific contact type specified.
      };
      contactList(req);
    };

    const contactList = (req) => {
      keyId && getContactList(req);
    };

    //** Use Imperative Handle */
    useImperativeHandle(getListRef, () => ({
      callChildListFunction: contactList,
    }));

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
      <React.Fragment>
        {!isGetContactFetching ? (
          <>
            {contactDetails && contactDetails.length > 0 ? (
              <div className="row">
                {contactDetails.map((contactItem, childIndex) => (
                  <div
                    className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-12"
                    key={childIndex}
                  >
                    <div
                      className={`contact-card ${
                        showEmailDropdown || showPhoneDropdown
                          ? "dropdown-open"
                          : ""
                      }`}
                    >
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
                ))}
              </div>
            ) : (
              <NoRecordFound />
            )}
          </>
        ) : (
          <DataLoader />
        )}
      </React.Fragment>
    );
  }
);

export default ContactDetailCard;
