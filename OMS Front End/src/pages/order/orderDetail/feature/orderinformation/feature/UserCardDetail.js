import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import UserDetailsModel from "./UserDetailsModel";

const UserCardDetail = ({ contact, handleToggleModalUsers }) => {
  const primaryEmail = contact?.emailAddressList?.find((email) => email.isPrimary)?.emailAddress;
  const primaryPhone = contact?.phoneNumberList?.find((number) => number.isPrimary);
  const addressContactCardInfo =
    contact?.emailAddressList?.length > 0 || contact?.phoneNumberList?.length > 0;
  return (
    <div className="contact-card">
      <div className="profile-name-btn">
        <div className="right-info">
          <div className="right-name-btn">
            <div className="user-name text-ellipsis">
              {contact?.firstName} {contact?.lastName}
            </div>
            <div className="btn-sec">
              <div
                className="select-icon tooltip-div"
                onClick={handleToggleModalUsers}
              >
                <Iconify icon="icon-park-outline:change" className="swap-icon" />
                <div className="tooltip-show">
                  <p>Change Customer</p>
                </div>
                <div className="tooltip-arrow-icon"></div>
              </div>
              {addressContactCardInfo && (
              <div className="info-display info-user user-card">
                <Iconify icon="ep:info-filled" className="info" />
                <UserDetailsModel contact={contact} />
              </div>
              )}
            </div>
          </div>

          <div className="user-details">
            {primaryEmail && (
              <div className="email">
                <Iconify icon="ic:round-email" />
                <span>{primaryEmail}</span>
              </div>
            )}
            {primaryPhone && (
              <div className="number">
                <Iconify icon="mingcute:phone-fill" />
                <span>{`${primaryPhone.phoneCode} ${primaryPhone.phoneNumber}`}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardDetail;
