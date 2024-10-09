import React from "react";
import Iconify from "../../../../../../components/ui/iconify/Iconify";
import Checkbox from "../../../../../../components/ui/inputs/checkBox/CheckBox";
import UserDetailsModel from "./UserDetailsModel";


const UserCardList = ({contact,handleCheckboxChange,selectedContactId}) => {

  return (
    <>
      <div className="contact-card card-list-popup">
        <div className="profile-name-btn">
          <div className="profile-icon-sec">PC</div>
          <div className="right-info">
            <div className="right-name-btn">
              <div className="user-name text-ellipsis">{`${contact.firstName} ${contact.lastName}`}</div>
              <div className="btn-sec">
                <div className="info-display info-user user-card">
                  <Iconify icon="ep:info-filled" className="info" />
                  <UserDetailsModel />
                </div>
              </div>
            </div>
            <div className="user-details">
              <div className="email">
                <Iconify icon="ic:round-email" /> 
                <span> {
                  contact?.emailAddressList?.find((email) => email.isPrimary)
                    ?.emailAddress
                }</span>
              
              </div>
              <div className="number">
                <Iconify icon="mingcute:phone-fill" />
                
                <span> {contact?.phoneNumberList?.find((number) => number.isPrimary)
                  ? `${contact?.phoneNumberList.find(
                    (number) => number.isPrimary
                  )?.phoneCode
                  } ${contact?.phoneNumberList.find(
                    (number) => number.isPrimary
                  )?.phoneNumber
                  }`
                  : ""}</span>
            
              </div>
            </div>
            <span className="checkbox-sec">
              <Checkbox name={`addressId_${contact.contactId}`}
               checked={selectedContactId ? selectedContactId === contact.contactId :selectedContactId} 
               onChange={() => handleCheckboxChange(contact.contactId)} />

            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCardList;
