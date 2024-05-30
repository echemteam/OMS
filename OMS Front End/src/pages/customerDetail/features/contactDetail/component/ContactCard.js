import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ isAddEditModal }) => {
  const contactTypes = [
    {
      contactTitle: "End User",
      contact: [
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
      ],
    },
    {
      contactTitle: "AP Department",
      contact: [
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
      ],
    },
    {
      contactTitle: "Purchasing",
      contact: [
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
        {
          fullName: "Gregory Cartwright",
          emailAddress: "test.email@gmail.com",
          contactNumber: "+525 2253 25245",
          gender: "Male",
        },
      ],
    },
  ];
  return (
    <>
      <div className="row">
        {contactTypes.map((contactTypes, index) => (
          <div key={index} className="col-xl-4 col-md-4 col-12">
            <div className="contact-card-section">
              <div className="contact-type-title">
                <p>{contactTypes.contactTitle}</p>
              </div>
              <div className="add-desc-part">
                {contactTypes.contact.map((contact, addrIndex) => (
                  <div className="contact-card" key={addrIndex}>
                    <div className="add-line">
                      <div className="user-icon-name">
                        <span className="icon">
                          <Image imagePath={AppIcons.userIcon}></Image>
                        </span>
                        <span className="label-txt user-name">
                          <b>{contact.fullName}</b>
                        </span>
                      </div>
                      <span className="label-txt">
                        <b>Email</b>
                        <strong>:</strong>&nbsp;{contact.emailAddress}
                      </span>
                      <span className="label-txt">
                        <b>Contact No.</b>
                        <strong>:</strong>&nbsp;{contact.contactNumber}
                      </span>
                      <span className="label-txt">
                        <b>Gender</b>
                        <strong>:</strong>&nbsp;{contact.gender}
                      </span>
                    </div>
                    <div className="edit-delete-button">
                      <button onClick={isAddEditModal} className="edit-btn">
                        <Image imagePath={AppIcons.editThemeIcon} />
                      </button>
                      <button onClick="" className="edit-btn ml-1 mr-1">
                        <Image imagePath={AppIcons.deleteThemeIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactCard;
