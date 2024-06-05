import React, { useState } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import { Accordion } from "react-bootstrap";

const ContactCard = ({ isAddEditModal }) => {
  // Set the initial state to the first accordion item's index
  const [activeKey, setActiveKey] = useState("0");
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

  const handleToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <>
      <Accordion
        className="contact-card-section"
        activeKey={activeKey}
        onSelect={handleToggle}
      >
        {contactTypes.map((contactType, index) => (
          <Accordion.Item
            eventKey={index.toString()} // Use index as eventKey
            className={activeKey === index.toString() ? "active" : ""}
            key={index}
          >
            <div className="header-title-btn">
              <Accordion.Header>
                <div>
                  <span>{contactType.contactTitle}</span>
                </div>
              </Accordion.Header>
            </div>
            <Accordion.Body className="add-desc-part mt-4">
              <div className="add-desc-part">
                <div className="row">
                  {contactType.contact.map((contact, addrIndex) => (
                    <div
                      className="col-xl-4 col-lg-4 col-md-4 col-12"
                      key={addrIndex}
                    >
                      <div className="contact-card">
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
                          {/* <button onClick="" className="edit-btn ml-1 mr-1">
                            <Image imagePath={AppIcons.deleteThemeIcon} />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default ContactCard;
