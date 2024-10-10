import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import UserDetailsModel from "./UserDetailsModel";

const UserCardDetail = ({ contact, handleToggleModalUsers }) => {

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
            {getInitials(contact?.firstName, contact?.lastName)}
          </div>
          <div className="right-info">
            <div className="right-name-btn">
              <div className="user-name text-ellipsis">
                {contact?.firstName} {contact?.lastName}
              </div>
              <div className="btn-sec">
                <div className="select-icon tooltip-div" onClick={handleToggleModalUsers}>
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
                  <UserDetailsModel contact={contact} />
                </div>
              </div>
            </div>
            <div className="user-details">
              <div className="email">
                <Iconify icon="ic:round-email" />
                <span>
                  {
                    contact?.emailAddressList?.find((email) => email.isPrimary)
                      ?.emailAddress
                  }
                </span>
              </div>
              <div className="number">
                <Iconify icon="mingcute:phone-fill" />
                <span>
                  {/* {contact?.phoneNumberList?.find((number) => number.isPrimary)?.phoneNumber} */}
                  {contact?.phoneNumberList?.find((number) => number.isPrimary)
                    ? `${contact?.phoneNumberList.find(
                      (number) => number.isPrimary
                    )?.phoneCode
                    } ${contact?.phoneNumberList.find(
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
