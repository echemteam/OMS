import React from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";

const ContactCard = ({ childData, handleEdit }) => {
  const cardInfoData = childData.cardInformation;
  const phoneNumberLsit = childData.phoneNumberLsit;
  const emailAddressList = childData.emailAddressLst;

  console.log("childData", childData);

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = cardInfoData.emailAddress;
  const phoneNumbers = cardInfoData.phoneNumber;

  return (
    <>
      {cardInfoData && (
        <div className="contact-card">
          <span className="field-info active-green-color">
            {cardInfoData.isPrimary ? "Primary Contact" : null}
          </span>
          <div className="add-line">
            <div className="user-icon-name">
              <span className="icon">
                <Image imagePath={AppIcons.User3DIcon}></Image>
              </span>
              <span className="label-txt user-name">
                <b>{cardInfoData.firstName + " " + cardInfoData.lastName}</b>
              </span>
            </div>
            <div className="label-txt d-flex align-items-start">
              <Image
                imgCustomClassName="contact-icon-img"
                imagePath={AppIcons.Mail}
                altText="contact icon"
              />
              <strong>:</strong>
              <div className="fix-data">
                {emailAddresses &&
                  emailAddresses.map((emaildata, index) => (
                    <div className="d-flex">
                      <div className="card-value" key={index}>&nbsp;{emaildata.emailAddres.trim()}</div>
                      <div className="card-value" key={index}>
                        {emaildata.isPrimary ?
                          <Image imagePath={AppIcons.RightTickIcon} altText="Website Icon" />
                          : null
                        }
                      </div>
                      <span className="copy-icon"
                      // onClick={() => CopyText(customerData?.emailAddress, "email") }
                      >
                        <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
                      </span>
                    </div>
                  ))}
                {/* {cardInfoData.emailAddress} */}
              </div>
            </div>
            <div className="label-txt mt-2 d-flex align-items-start">
              <Image
                imgCustomClassName="contact-icon-img"
                imagePath={AppIcons.ContactNo}
                altText="contact icon"
              />
              <strong>:</strong>
              <div className="fix-data">
                {phoneNumbers &&
                  phoneNumbers.map((phoneData, index) => (
                    <div className="d-flex">
                      <div className="card-value" key={index}>&nbsp;{`(${phoneData.phoneCode}) ${phoneData.phoneNumber}`}</div>
                      <div className="card-value" key={index}>&nbsp;{`ext.${phoneData.extension}`}</div>
                      <div className="card-value" key={index}>&nbsp;{phoneData.isPrimary}</div>
                      <div className="card-value" key={index}>&nbsp;{phoneData.phoneType}</div>
                      {phoneData.isPrimary ?
                        <Image imagePath={AppIcons.RightTickIcon} altText="Website Icon" />
                        : null
                      }
                      <span
                        className="copy-icon"
                      // onClick={() =>
                      //   CopyText(customerData?.emailAddress, "email")
                      // }
                      >
                        <Image
                          imagePath={AppIcons.copyIcon}
                          altText="Website Icon"
                        />
                      </span>
                    </div>
                  ))}
                {/* {cardInfoData.phoneNumber} */}
              </div>
            </div>
          </div>
          <div className="edit-delete-button">
            <button
              onClick={() =>
                handleEdit(cardInfoData, emailAddressList, phoneNumberLsit)
              }
              className="edit-btn"
            >
              <Image imagePath={AppIcons.editThemeIcon} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
