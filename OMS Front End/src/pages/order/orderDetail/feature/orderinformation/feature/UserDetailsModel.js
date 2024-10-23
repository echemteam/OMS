import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";

const UserDetailsModel = ({ contact }) => {

  const getInitials = (firstName, lastName) => {
    return (
      (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase()
    );
  };

  const getEmail = (isPrimary) =>
    contact?.emailAddressList?.find((email) => email.isPrimary === isPrimary)?.emailAddress;

  const getPhoneNumber = (isPrimary) => {
    const phone = contact?.phoneNumberList?.find((number) => number.isPrimary === isPrimary);
    return phone ? `${phone.phoneCode || ''} ${phone.phoneNumber || ''}` : null;
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
              {contact?.emailAddressList.length > 0 ? (<>
                <span className="icon-part">
                  <Iconify icon="ic:round-email" />
                </span>
                <span className="info-part email-list">
                {getEmail(false) && <div className="values">{getEmail(false)}</div>}
                {getEmail(true) && <div className="values primary-email">{getEmail(true)}</div>}
                  {/* <span class="primary-email"></span> */}
                </span>
              </>) : null}
            </div>
            {/* Email End */}
            {/* Phone Start */}
            <div className="icon-detail">
              {contact?.phoneNumberList.length > 0 ?
                (<>
                  <span className="icon-part contact-icon">
                    <Iconify icon="ic:round-phone" />
                  </span>

                  <span className="info-part contact-info">
                {getPhoneNumber(false) && <div className="values">{getPhoneNumber(false)}</div>}
                {getPhoneNumber(true) && (<div className="values primary-email">{getPhoneNumber(true)}</div>)}
              </span>
                </>) : null}
            </div>
            {/* Phone End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModel;
