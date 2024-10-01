/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ContactType } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";
import Iconify from "../../../ui/iconify/Iconify";

const ContactInformation = ({
  isModelOpen,
  mainId,
  getContactById,
  approvalChekedData,
  handleCheckbox,
  isSupplierApproval,
}) => {
  //** State */
  const [contactInformation, setContactInformation] = useState([]);
  const [isChecked, setIsChecked] = useState(approvalChekedData?.isChecked || false);

  const [openSections, setOpenSections] = useState([true]);
  //** API Call's */
  const [
    getContactList,
    {
      isFetching: isGetContactFetching,
      isSuccess: isGetContactSucess,
      data: isGetcontactItem,
    },
  ] = getContactById();

  useEffect(() => {
    if (isModelOpen && mainId) {
      const type = !isSupplierApproval ? [ContactType.INVOICESUBMISSION, ContactType.AP] : [ContactType.ACCOUNTSRECEIVABLE];
      let req = {
        id: mainId,
        searchText: "",
        contactType: type,
      };
      getContactList(req);
    }
  }, [isModelOpen, mainId]);

  useEffect(() => {
    if (!isGetContactFetching && isGetContactSucess && isGetcontactItem) {
      const filter = isGetcontactItem.filter((data) => data.isPrimary).map(data => ({ ...data, isChecked: false }));;
      setContactInformation(filter);
    }
  }, [isGetContactFetching, isGetContactSucess, isGetcontactItem]);

  useEffect(() => {
    if (contactInformation && contactInformation.length > 0) {
      const allChildChecked = contactInformation.every(data => data.isChecked);
      if (allChildChecked) {
        setIsChecked(true);
        handleCheckbox("contactInformation", true);
      } else {
        setIsChecked(false);
        handleCheckbox("contactInformation", false);
      }
    }
  }, [contactInformation]);

  const handleChange = (name, value) => {
    const modifyData = contactInformation.map((item) =>
      item.contactId === name ? { ...item, isChecked: value } : item
    )
    setContactInformation(modifyData);
  };

  // Toggle active section
  const toggleSection = (index) => {
    const updatedSections = [...openSections];
    updatedSections[index] = !updatedSections[index]; // Toggle the clicked section
    setOpenSections(updatedSections);
  };

  return (
    <React.Fragment>
      <>
        <div className={`card-top-title ${openSections[0] ? 'active' : ''}`} onClick={() => toggleSection(0)}>
          <div className="d-flex align-items-center mr-2">
            <span>
              <Iconify icon="ep:arrow-down-bold" className="open-bar" />
            </span>
            <h5> Contact Information </h5>
          </div>
          {/* <div className="checkbox-part">
            <Checkbox
              name={"contactInformation"}
              dataField={"contactInformation"}
              checked={isChecked || false}
              // onChange={handleChange}
              isDisable={true}
            />
          </div> */}
        </div>
        {openSections[0] && (
          <div className="card-info-checklist">
            {contactInformation &&
              contactInformation.map((contact, index) => (
                <div className="card-part" key={index}>
                  <div className="d-flex justify-content-between">
                    <h6 className="title">{contact.type}</h6>
                    <Checkbox
                      name={contact.contactId}
                      dataField={contact.contactId}
                      checked={contact.isChecked}
                      onChange={handleChange}
                    />
                  </div>
                  <h6
                    className={`name-title ${contact.isPrimary ? "is-primary" : ""
                      }`}
                  >
                    <span className="label">Name :</span>
                    <p className="name-desc">
                      {contact.firstName} {contact.lastName}
                    </p>
                  </h6>
                  <h6 className="name-title">
                    <span className="label">Email :</span>
                    <div className="title-desc">
                      {contact.emailAddressList &&
                        contact.emailAddressList.map((emails) => (
                          <div className="email-primary">
                            <h6 className="name-desc">{emails.emailAddress}</h6>
                            <span
                              className={emails.isPrimary ? "is-primary" : ""}
                            ></span>
                          </div>
                        ))}
                    </div>
                  </h6>
                  <h6 className="name-title number-sec">
                    <span className="label">Phone :</span>
                    <div className="name-desc-sec">
                      {contact.phoneNumberList &&
                        contact.phoneNumberList.map((phoneData) => (
                          <>
                            <h6
                              className={`name-desc d-flex ${phoneData.phoneType === "Home"
                                ? "home"
                                : phoneData.phoneType === "Work"
                                  ? "work"
                                  : "home"
                                } ${phoneData.isPrimary ? "is-primary" : ""}`}
                            >
                              ({phoneData.phoneCode}) {phoneData.phoneNumber}
                              {phoneData.extension
                                ? `, ${phoneData.extension}`
                                : ""}
                            </h6>
                          </>
                        ))}
                    </div>
                  </h6>
                </div>
              ))}
          </div>
        )}
      </>
    </React.Fragment>
  );
};
ContactInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getContactById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool,
  }),
  handleCheckbox: PropTypes.func.isRequired,
};

export default ContactInformation;
