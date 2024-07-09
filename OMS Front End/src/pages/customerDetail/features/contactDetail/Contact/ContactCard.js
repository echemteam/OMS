import React, { useEffect, useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactCard = ({ childData, handleEdit }) => {
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const emailDropdownRef = useRef(null);
  const phoneDropdownRef = useRef(null);

  const cardInfoData = childData.cardInformation;
  const phoneNumberLsit = childData.phoneNumberLsit;
  const emailAddressList = childData.emailAddressLst;

  // Static data for phone numbers in dropdown
  const staticEmailIds = [
    "abcdefghi@gmail.com",
    "pqrstuvwxy@gmail.com",
    "qwwerty@gmail.com",
  ];

  // Static data for phone numbers in dropdown
  const staticPhoneNumbers = [
    { phoneCode: "1", phoneNumber: "1234567890", extension: "101" },
    { phoneCode: "44", phoneNumber: "9876543210", extension: "" },
    { phoneCode: "91", phoneNumber: "1122334455", extension: "102" },
  ];

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = cardInfoData.emailAddress;
  const phoneNumbers = cardInfoData.phoneNumber;

  const toggleEmailDropdown = () => {
    setShowEmailDropdown(!showEmailDropdown);
  };

  const togglePhoneDropdown = () => {
    setShowPhoneDropdown(!showPhoneDropdown);
  };

  const handleClickOutside = (event) => {
    if (
      emailDropdownRef.current &&
      !emailDropdownRef.current.contains(event.target)
    ) {
      setShowEmailDropdown(false);
    }
    if (
      phoneDropdownRef.current &&
      !phoneDropdownRef.current.contains(event.target)
    ) {
      setShowPhoneDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {cardInfoData && (
        <>
          <div className={`contact-card d-none ${showEmailDropdown || showPhoneDropdown ? 'dropdown-open' : ''}`}>
            <div className="add-line">
              <div className="user-icon-name">
                <span className="icon">
                  <Image imagePath={AppIcons.User3DIcon}></Image>
                </span>
                <div className="d-flex">
                  <span className="label-txt user-name">
                    <b>
                      {cardInfoData.firstName + " " + cardInfoData.lastName}
                    </b>
                  </span>

                  <span className="field-info primary-text-title">
                    {cardInfoData.isPrimary ? " (Primary Contact)" : null}
                  </span>
                </div>
              </div>
              <div className="label-txt d-flex align-items-start">
                <Image
                  imgCustomClassName="contact-icon-img"
                  imagePath={AppIcons.Mail}
                  altText="contact icon"
                />
                {/* <strong>:</strong> */}
                <div className="fix-data">
                  {emailAddresses &&
                    emailAddresses.map((emaildata, index) => (
                      <div className="d-flex align-items-center mb-0">
                        <div className="card-value" key={index}>
                          &nbsp;{emaildata.emailAddres.trim()}
                        </div>
                        <span
                          className="copy-icon"
                          onClick={() =>
                            CopyText(emaildata?.emailAddres, "email")
                          }
                        >
                          <Image imagePath={AppIcons.copyIcon} altText="Icon" />
                        </span>
                        {emaildata.isPrimary ? (
                          <div className="primary-icon"></div>
                        ) : null}
                      </div>
                    ))}
                  {/* {cardInfoData.emailAddress} */}
                </div>
              </div>
              <div className="label-txt mt-2 d-flex align-items-center">
                <Image
                  imgCustomClassName="contact-icon-img"
                  imagePath={AppIcons.ContactNo}
                  altText="contact icon"
                />
                {/* <strong>:</strong> */}
                <div className="fix-data w-100">
                  {phoneNumbers &&
                    phoneNumbers.map((phoneData, index) => (
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
                          <div className="card-value" key={index}>
                            &nbsp;
                            {`(${phoneData.phoneCode}) ${phoneData.phoneNumber}`}
                          </div>
                          <div className="card-value">
                            &nbsp;
                            {`${
                              phoneData.extension > 0
                                ? "," + phoneData.extension
                                : ""
                            }`}

                          </div>
                          <span
                            className="copy-icon"
                            onClick={() =>
                              CopyText(
                                `(${phoneData.phoneCode}) ${phoneData.phoneNumber} ${phoneData.extension}`,
                                "phone"
                              )
                            }
                          >
                            <Image
                              imagePath={AppIcons.copyIcon}
                              altText="Website Icon"
                            />
                          </span>
                          {phoneData.isPrimary ? (
                            <div
                              className="primary-icon"
                              title="Is Primary"
                            ></div>
                          ) : null}
                        </div>
                        <div className="d-flex justify-content-between right-contact-ext-type">
                          <div className="card-value contact-type" key={index}>
                            <span>
                              {phoneData.phoneTypeId === 1 ? (
                                <span title="Home">
                                  <i className="fa fa-home"></i>
                                </span>
                              ) : phoneData.phoneTypeId === 2 ? (
                                <span title="Work">
                                  <i className="fa fa-briefcase"></i>
                                </span>
                              ) : phoneData.phoneTypeId === 3 ? (
                                <span title="Mobile">
                                  <i className="fa fa-mobile"></i>
                                </span>
                              ) : null}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  {/* {cardInfoData.phoneNumber} */}
                </div>
              </div>
            </div>
            <div className="edit-delete-button">
              <button
                onClick={() =>
                  handleEdit(cardInfoData?.contactId)
                }
                className="edit-btn"
              >
                <Image imagePath={AppIcons.editThemeIcon} />
              </button>
            </div>
          </div>
          <div className={`contact-card ${showEmailDropdown || showPhoneDropdown ? 'dropdown-open' : ''}`}>
            <div className="add-line">
              <div className="user-icon-name">
                <span className="icon">
                  <Image imagePath={AppIcons.User3DIcon}></Image>
                </span>
                <div className="d-flex flex-column ml-1 contact-name-title">
                  <span className="label-txt user-name">
                    <b>
                      {cardInfoData.firstName + " " + cardInfoData.lastName}
                    </b>
                  </span>
                  {cardInfoData.isPrimary && (
                    <span className="primary-label"> ( Primary ) </span>
                  )}
                  {/* <span className="field-info primary-text-title">
                    {cardInfoData.isPrimary ? " (Primary Contact)" : null}
                  </span> */}
                </div>

                <span>|</span>
              </div>
              <div className="contact-right-info">
                <div className="label-txt d-flex align-items-center email-sec">
                  <Image
                    imgCustomClassName="contact-icon-img"
                    imagePath={AppIcons.Mail}
                    altText="contact icon"
                  />
                  {/* <strong>:</strong> */}
                  <div className="fix-data">
                    <div className="d-flex align-items-center mb-0">
                      <div className="card-value">
                        {/* &nbsp;{emaildata.emailAddres.trim()} */}
                        testOMSLite123@gmail.com
                      </div>
                      <div className="primary-icon"></div>
                    </div>
                    {/* {cardInfoData.emailAddress} */}
                  </div>
                </div>
                <div
                  className="drop-down"
                  ref={emailDropdownRef}
                  onClick={toggleEmailDropdown}
                >
                  <i
                    className={`fa fa-caret-down ${
                      showEmailDropdown ? "rotated" : ""
                    }`}
                    aria-hidden="true"
                  ></i>
                  {showEmailDropdown && (
                    <div className="dropdown-content show">
                      {staticEmailIds.map((emailID, index) => (
                        <>
                          <span
                            className="contact-list d-flex flex-row"
                            key={index}
                          >
                            <span>{emailID}</span>
                            <span className="copy-icon" title="Copy">
                              <Image
                                imagePath={AppIcons.copyIcon}
                                altText="Website Icon"
                              />
                            </span>
                          </span>
                        </>
                      ))}
                    </div>
                  )}
                </div>
                <span>|</span>
                <div className="label-txt d-flex align-items-center contact-sec">
                  <Image
                    imgCustomClassName="contact-icon-img"
                    imagePath={AppIcons.ContactNo}
                    altText="contact icon"
                  />
                  {/* <strong>:</strong> */}

                  <div className="fix-data w-100">
                    {phoneNumbers &&
                      phoneNumbers.map((phoneData, index) => (
                        <div className="d-flex justify-content-between w-100 mb-0">
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-between right-contact-ext-type">
                              <div
                                className="card-value contact-type"
                                key={index}
                              >
                                <span>
                                  {phoneData.phoneTypeId === 1 ? (
                                    <span title="Home">
                                      <i className="fa fa-home"></i>
                                    </span>
                                  ) : phoneData.phoneTypeId === 2 ? (
                                    <span title="Work">
                                      <i className="fa fa-briefcase"></i>
                                    </span>
                                  ) : phoneData.phoneTypeId === 3 ? (
                                    <span title="Mobile">
                                      <i className="fa fa-mobile"></i>
                                    </span>
                                  ) : null}
                                </span>
                              </div>
                            </div>

                            <div
                              className={`card-value ml-0 ${
                                phoneData.isPrimary ? "primary-phone" : ""
                              }`}
                            >
                              &nbsp;
                              {/* {`(+${phoneData.phoneCode}) ${phoneData.phoneNumber}`} */}
                              +91 9173010672

                            </div>
                            {/* <span className="title">Ext.</span> */}
                            {/* { */}
                            <div
                              className={`card-value ${
                                phoneData.isPrimary ? "primary-phone" : ""
                              }`}
                            >
                              &nbsp;
                              {`${
                                phoneData.extension > 0
                                  ? "," + phoneData.extension
                                  : ""
                              }`}
                            </div>
                            {/* <span
                              className="copy-icon"
                              onClick={() =>
                                CopyText(
                                  `(${phoneData.phoneCode}) ${phoneData.phoneNumber} ${phoneData.extension}`,
                                  "phone"
                                )
                              }
                            >
                              <Image
                                imagePath={AppIcons.copyIcon}
                                altText="Icon"
                              />
                            </span> */}
                            {phoneData.isPrimary ? (
                              <div
                                className="primary-icon"
                                title="Is Primary"
                              ></div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    {/* {cardInfoData.phoneNumber} */}
                  </div>
                </div>
                <div
                  className="drop-down mobilenumber"
                  ref={phoneDropdownRef}
                  onClick={togglePhoneDropdown}
                >
                  <i
                    className={`fa fa-caret-down ${
                      showPhoneDropdown ? "rotated" : ""
                    }`}
                    aria-hidden="true"
                  ></i>
                  {showPhoneDropdown && (
                    <div className="dropdown-content mobilenumber show ">
                      {staticPhoneNumbers.map((phoneData, index) => (
                        <>
                          <span
                            className="contact-list d-flex flex-row"
                            key={index}
                          >
                            <span>
                              {`(+${phoneData.phoneCode}) ${
                                phoneData.phoneNumber
                              }${
                                phoneData.extension
                                  ? `, ${phoneData.extension}`
                                  : ""
                              }`}
                            </span>
                            <span className="copy-icon" title="Copy">
                              <Image
                                imagePath={AppIcons.copyIcon}
                                altText="Website Icon"
                              />
                            </span>
                          </span>
                        </>
                      ))}
                    </div>
                  )}
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
        </>
      )}
    </>
  );
};

export default ContactCard;