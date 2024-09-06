/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ContactType } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";

const ContactInformation = ({
  isModelOpen,
  mainId,
  getContactById,
  approvalChekedData,
  handleCheckbox,
}) => {
  //** State */
  const [contactInformation, setContactInformation] = useState([]);
  const [isChecked, setIsChecked] = useState(
    approvalChekedData?.isChecked || false
  );

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
      const type = [ContactType.INVOICESUBMISSION, ContactType.AP];
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
      setContactInformation(isGetcontactItem);
    }
  }, [isGetContactFetching, isGetContactSucess, isGetcontactItem]);
  const handleChange = (checkedValue, newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue, newValue);
  };

  return (
    <React.Fragment>
      <>
        <div className="card-top-title">
          <h5> Contact Information </h5>
          <div className="checkbox-part">
            <Checkbox
              name={"contactInformation"}
              dataField={"contactInformation"}
              checked={isChecked || false}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="card-info-checklist">
          {contactInformation &&
            contactInformation.map((contact, index) => (
              <div className="card-part" key={index}>
                <h6 className="title">{contact.type}</h6>
                <h6
                  className={`name-title ${
                    contact.isPrimary ? "is-primary" : ""
                  }`}
                >
                  <span className="label">Name :</span>
                  <p className="name-desc">
                    {contact.firstName} {contact.lastName}
                  </p>
                </h6>
                <h6 className="name-title">
                  <span className="label">Email :</span>
                  {contact.emailAddressList &&
                    contact.emailAddressList.map((emails) => (
                      <div className="email-primary">
                        <h6 className="name-desc">{emails.emailAddress}</h6>
                        <span
                          className={emails.isPrimary ? "is-primary" : ""}
                        ></span>
                      </div>
                    ))}
                </h6>
                <h6 className="name-title">
                  <span className="label">Phone :</span>

                  {contact.phoneNumberList &&
                    contact.phoneNumberList.map((phoneData) => (
                      <>
                        <h6
                          className={`name-desc d-flex ${
                            phoneData.phoneType === "Home"
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
                </h6>
              </div>
            ))}
        </div>
      </>
    </React.Fragment>
  );
};

export default ContactInformation;
