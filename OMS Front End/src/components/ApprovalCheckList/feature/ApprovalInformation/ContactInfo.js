/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ContactType } from "../../../../utils/Enums/commonEnums";

const ContactInformation = ({ isModelOpen, mainId, getContactById }) => {
  //** State */
  const [contactInformation, setContactInformation] = useState([]);

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

  return (
    <React.Fragment>
      <div className="row">
        <h5> Contact Information </h5>
        {contactInformation &&
          contactInformation.map((contact, index) => (
            <div className="col-4" key={index}>
              <h6>{contact.type}</h6>
              <h6 className={`name ${contact.isPrimary ? "is-primary" : ""}`}>
                Name:{" "}
                <p>
                  {contact.firstName} {contact.lastName}
                </p>
                {/* Is Primary: {contact.isPrimary ? "Yes" : "No"} */}
              </h6>

              <h6 >
                {/* Is Primary: {contact.isPrimary ? "Yes" : "No"} */}
              </h6>
              <h6 className="email">Email Address:</h6>
              {contact.emailAddressList &&
                contact.emailAddressList.map((emails) => (
                  <>
                    <h6 className="email-address-applist">{emails.emailAddress}</h6>
                    <h6 className={emails.isPrimary ? "is-primary" : ""}>
                      {/* Is Primary: {emails.isPrimary ? "Yes" : "No"} */}
                    </h6>
                  </>
                ))}
              <h6 className="phone-number">Phone Number</h6>
              {contact.phoneNumberList &&
                contact.phoneNumberList.map((phoneData) => (
                  <>
                    <h6
                      className={`d-flex ${phoneData.phoneType === "Home"
                          ? "home"
                          : phoneData.phoneType === "Work"
                            ? "work"
                            : "home"
                        } ${phoneData.isPrimary ? "is-primary" : ""}`}
                    >
                      {/* Phone Type: {phoneData.phoneType || "Home"} */}
                      ({phoneData.phoneCode}) {phoneData.phoneNumber}
                      {phoneData.extension ? `, ${phoneData.extension}` : ""}
                      {/* Is Primary: {phoneData.isPrimary ? "Yes" : "No"} */}
                    </h6>
                  </>
                ))}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default ContactInformation;
