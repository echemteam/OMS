/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ContactType } from "../../../../utils/Enums/commonEnums";
import Checkbox from "../../../ui/inputs/checkBox/CheckBox";
import PropTypes from "prop-types";

const ContactInformation = ({ isModelOpen, mainId, getContactById ,approvalChekedData ,handleCheckbox}) => {
  //** State */
  const [contactInformation, setContactInformation] = useState([]);
  const [isChecked,setIsChecked]=useState(approvalChekedData?.isChecked || false);

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
  const handleChange = (checkedValue,newValue) => {
    setIsChecked(newValue);
    handleCheckbox(checkedValue,newValue);  
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="card-top-title">
          <h5> Contact Information </h5>
          <div className="checkbox-part">
            <Checkbox
              name={"contactInformation"} 
              dataField={"contactInformation"}
              checked={isChecked || false}
              onChange={handleChange}   />
          </div>
        </div>
        {contactInformation &&
          contactInformation.map((contact, index) => (
            <div className="col-6" key={index}>
              <h6>{contact.type}</h6>
              <h6 className={`name ${contact.isPrimary ? "is-primary" : ""}`}>
                Name:{" "}
                <p>
                  {contact.firstName} {contact.lastName}
                </p>
              </h6>
              <h6 className="email">Email Address:</h6>
              {contact.emailAddressList &&
                contact.emailAddressList.map((emails) => (
                  <div className="email-primary">
                    <h6 className="email-address-applist">
                      {emails.emailAddress}
                    </h6>
                    <span
                      className={emails.isPrimary ? "is-primary" : ""}
                    ></span>
                  </div>
                ))}
              <h6 className="phone-number">Phone Number</h6>
              {contact.phoneNumberList &&
                contact.phoneNumberList.map((phoneData) => (
                  <>
                    <h6
                      className={`d-flex ${
                        phoneData.phoneType === "Home"
                          ? "home"
                          : phoneData.phoneType === "Work"
                          ? "work"
                          : "home"
                      } ${phoneData.isPrimary ? "is-primary" : ""}`}
                    >
                      ({phoneData.phoneCode}) {phoneData.phoneNumber}
                      {phoneData.extension ? `, ${phoneData.extension}` : ""}
                    </h6>
                  </>
                ))}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
ContactInformation.propTypes = {
  isModelOpen: PropTypes.bool.isRequired,
  mainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getContactById: PropTypes.func.isRequired,
  approvalChekedData: PropTypes.shape({
    isChecked: PropTypes.bool
  }),
  handleCheckbox: PropTypes.func.isRequired
};

export default ContactInformation;
