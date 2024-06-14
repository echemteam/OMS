import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ childData, handleEdit }) => {
  console.log("childData", childData)

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = childData.emailAddress.split(',');
  const phoneNumbers = childData.phoneNumber.split(',');

   // Helper function to group items into pairs
   const groupItemsInPairs = (items) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push(items.slice(i, i + 2));
    }
    return pairs;
  };

  const phonePairs = groupItemsInPairs(phoneNumbers);

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
            <div className="label-txt">
              <b>Email</b>
              <strong>:</strong>
              {emailAddresses.map((email, index) => (
                <div key={index}>
                  &nbsp;{email.trim()}
                </div>
              ))}
            </div>
            <div className="label-txt mt-2">
              <b>Contact No</b>
              <strong>:</strong>
              {phonePairs.map((pair, index) => (
                <div key={index}>
                  &nbsp;{pair.join(', ')}
                </div>
              ))}
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
