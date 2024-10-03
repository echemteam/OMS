import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import UserDetailsModel from "./UserDetailsModel";

const UserCardDetail = (contact, handleToggleModalUsers1) => {

  const getInitials = (firstName, lastName) => {
    return (
      (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase()
    );
  };

  return (
    <>
      <div className="contact-card">
        <div className="profile-name-btn">
          <div className="profile-icon-sec">
            {getInitials(contact.contact?.firstName, contact.contact?.lastName)}
          </div>
          <div className="right-info">
            <div className="right-name-btn">
              <div className="user-name">
                {contact.contact?.firstName} {contact.contact?.lastName}
              </div>
              <div className="btn-sec">
                <div className="select-icon tooltip-div" onClick={handleToggleModalUsers1}>
                  <Iconify
                    icon="icon-park-outline:change"
                    className="swap-icon"
                    
                  />
                  <div className="tooltip-show">
                    <p>Change Customer</p>
                  </div>
                  <div className="tooltip-arrow-icon"></div>
                </div>
                <div className="info-display info-user user-card">
                  <Iconify icon="ep:info-filled" className="info" />
                  <UserDetailsModel />
                </div>
              </div>
            </div>
            <div className="user-details">
              <div className="email">
                <Iconify icon="ic:round-email" />
                <span>
                  {
                    contact.contact?.emailAddressList?.find((email) => email.isPrimary)
                      ?.emailAddress
                  }
                </span>
              </div>
              <div className="number">
                <Iconify icon="mingcute:phone-fill" />
                <span>
                  {/* {contact.contact?.phoneNumberList?.find((number) => number.isPrimary)?.phoneNumber} */}
                  {contact.contact?.phoneNumberList?.find((number) => number.isPrimary)
                    ? `${
                        contact.contact.phoneNumberList.find(
                          (number) => number.isPrimary
                        )?.phoneCode
                      } ${
                        contact.contact.phoneNumberList.find(
                          (number) => number.isPrimary
                        )?.phoneNumber
                      }`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default UserCardDetail;
