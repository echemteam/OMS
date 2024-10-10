import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";

const UserDetailsModel = ({contact}) => {

  const getInitials = (firstName, lastName) => {
    return (
      (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase()
    );
  };
  return (
    <>
      <div className="customer-popup-sec">
        <div className="popup-body-sec">
          <div className="name-icon-status">
            <div className="icon-sec">{getInitials(contact?.firstName, contact?.lastName)}</div>
            <div className="name-status">
              <div className="name-sec">{contact?.firstName} {contact?.lastName}</div>
              {/* <div className="status-sec pending">Pending</div> */}
            </div>
          </div>
          <div className="desc-sec-bottom user-desc">
            {/* Email Start */}
            <div className="icon-detail">
             
              <span className="icon-part">
                <Iconify icon="ic:round-email" /> 
              </span>
              <span className="info-part email-list">
                <div class="values">{
                    contact?.emailAddressList?.find((email) => !email.isPrimary)
                      ?.emailAddress
                  }</div>
                <div class="values primary-email"> {
                    contact?.emailAddressList?.find((email) => email.isPrimary)
                      ?.emailAddress
                  }</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Email End */}
            {/* Phone Start */}
            <div className="icon-detail">
              <span className="icon-part contact-icon">
                <Iconify icon="ic:round-phone" />
              </span>
              <span className="info-part contact-info">
                <div class="values">   {contact?.phoneNumberList?.find((number) => number.isPrimary)
                    ? `${contact?.phoneNumberList.find(
                      (number) => !number.isPrimary
                    )?.phoneCode || ''
                    } ${contact?.phoneNumberList.find(
                      (number) => !number.isPrimary
                    )?.phoneNumber || ''
                    }`
                    : null}</div>
                <div class="values primary-email">   {contact?.phoneNumberList?.find((number) => number.isPrimary)
                    ? `${contact?.phoneNumberList.find(
                      (number) => number.isPrimary
                    )?.phoneCode || ''
                    } ${contact?.phoneNumberList.find(
                      (number) => number.isPrimary
                    )?.phoneNumber || ''
                    }`
                    : null}</div>
                {/* <span class="primary-email"></span> */}
              </span>
            </div>
            {/* Phone End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModel;
