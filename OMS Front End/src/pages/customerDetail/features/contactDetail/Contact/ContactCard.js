import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ childData, handleEdit }) => {

  return (
    <>
      {childData &&
        <div className="contact-card">

          <div className="add-line">
            <div className="user-icon-name">
              <span className="icon">
                <Image imagePath={AppIcons.userIcon}></Image>
              </span>
              <span className="label-txt user-name">
                <b>{childData.firstName + ' ' + childData.lastName}</b>
              </span>
            </div>
            <span className="label-txt">
              <b>Email</b>
              <strong>:</strong>&nbsp;{childData.emailAddress}
            </span>
            <span className="label-txt">
              <b>Contact No.</b>
              <strong>:</strong>&nbsp;{childData.phoneNumber}
            </span>
          </div>
          <div className="edit-delete-button">
            <button onClick={() => handleEdit(childData)} className="edit-btn">
              <Image imagePath={AppIcons.editThemeIcon} />
            </button>
          </div>
        </div>}
    </>
  );
};

export default ContactCard;
