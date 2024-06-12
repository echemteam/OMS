import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ childData, handleEdit }) => {

  return (
    <>
      {childData?.cardInformation &&
        <div className="contact-card">

          <div className="add-line">
            <div className="user-icon-name">
              <span className="icon">
                <Image imagePath={AppIcons.userIcon}></Image>
              </span>
              <span className="label-txt user-name">
                <b>{childData?.cardInformation.firstName + ' ' + childData?.cardInformation.lastName}</b>
              </span>
            </div>
            <span className="label-txt">
              <b>Email</b>
              <strong>:</strong>&nbsp;{childData?.cardInformation.emailAddress}
            </span>
            <span className="label-txt">
              <b>Contact No.</b>
              <strong>:</strong>&nbsp;{childData?.cardInformation?.contactNumber}
            </span>
            <span className="label-txt">
              <b>Gender</b>
              <strong>:</strong>&nbsp;{childData?.cardInformation?.gender}
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
