import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ childData, handleEdit }) => {

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = childData.emailAddress.split(',');
  const phoneNumbers = childData.phoneNumber.split(',');


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
            <div className="label-txt d-flex">
              <b>Email</b>
              <strong>:</strong>
              <div className="fix-data">
                {emailAddresses.map((email, index) => (
                  <div key={index}>
                    &nbsp;{email.trim()}
                    {index < emailAddresses.length - 1 && ','}
                  </div>
                ))}
              </div>
            </div>
            <div className="label-txt mt-2 d-flex">
              <b>Contact No</b>
              <strong>:</strong>
              <div className="fix-data">
                {phoneNumbers.map((pair, index) => (
                  <div key={index}>
                    &nbsp;{pair.trim()}
                    {index < phoneNumbers.length - 1 && ','}
                  </div>
                ))}
              </div>
            </div>
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
