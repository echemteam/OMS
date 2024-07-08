import React, { useEffect, useRef, useState } from "react";
import Image from "../../../../../components/image/Image";
import { AppIcons } from "../../../../../data/appIcons";
import CopyText from "../../../../../utils/CopyText/CopyText";

const ContactCard = ({ childData, handleEdit }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const cardInfoData = childData.cardInformation;
  const phoneNumberLsit = childData.phoneNumberLsit;
  const emailAddressList = childData.emailAddressLst;

  // Static data for phone numbers in dropdown
  const staticPhoneNumbers = [
    "abcdefghi@gmail.com",
    "pqrstuvwxy@gmail.com",
    "qwwerty@gmail.com",
  ];

  // Split the email addresses and phone numbers into arrays
  const emailAddresses = cardInfoData.emailAddress;
  const phoneNumbers = cardInfoData.phoneNumber;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
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
          <div className="contact-card d-none">
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
                <strong>:</strong>
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
                          <div className="primary-icon">
                            <Image
                              imagePath={AppIcons.PrimaryTick}
                              altText="Icon"
                            />
                          </div>
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
                <strong>:</strong>
                <div className="fix-data w-100">
                  {phoneNumbers &&
                    phoneNumbers.map((phoneData, index) => (
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
                          <div className="card-value" key={index}>
                            &nbsp;
                            {`(+${phoneData.phoneCode}) ${phoneData.phoneNumber}`}
                          </div>
                          {/* <span className="title">Ext.</span> */}
                          {/* { */}
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
                            <div className="primary-icon" title="Is Primary">
                              <Image
                                imagePath={AppIcons.PrimaryTick}
                                altText="Website Icon"
                              />
                            </div>
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
                  handleEdit(cardInfoData, emailAddressList, phoneNumberLsit)
                }
                className="edit-btn"
              >
                <Image imagePath={AppIcons.editThemeIcon} />
              </button>
            </div>
          </div>
          <div className="contact-card">
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

                  <span className="field-info primary-text-title">
                    {cardInfoData.isPrimary ? " (Primary Contact)" : null}
                  </span>
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
                  <strong>:</strong>
                  <div className="fix-data">
                    <div className="d-flex align-items-center mb-0">
                      <div className="card-value">
                        {/* &nbsp;{emaildata.emailAddres.trim()} */}
                        testemail@gmail.com
                      </div>
                      <div className="primary-icon">
                        <Image
                          imagePath={AppIcons.PrimaryTick}
                          altText="Icon"
                        />
                      </div>
                    </div>
                    {/* {cardInfoData.emailAddress} */}
                  </div>
                </div>
                <div
                  className="drop-down"
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                >
                  <i
                    className={`fa fa-sort-desc ${
                      showDropdown ? "rotated" : ""
                    }`}
                    aria-hidden="true"
                  ></i>
                  {showDropdown && (
                    <div className="dropdown-content show">
                      {staticPhoneNumbers.map((phoneNumber, index) => (
                        <>
                          <span className="contact-list d-flex flex-column" key={index}>
                            <span>
                              {phoneNumber}
                              <span className="copy-icon" title="Copy">
                                <Image
                                  imagePath={AppIcons.copyIcon}
                                  altText="Website Icon"
                                />
                              </span>
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
                  <strong>:</strong>
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
                            <div className="card-value ml-0" key={index}>
                              &nbsp;
                              {`(+${phoneData.phoneCode}) ${phoneData.phoneNumber}`}
                            </div>
                            {/* <span className="title">Ext.</span> */}
                            {/* { */}
                            <div className="card-value">
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
                              <div className="primary-icon" title="Is Primary">
                                <Image
                                  imagePath={AppIcons.PrimaryTick}
                                  altText="Icon"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    {/* {cardInfoData.phoneNumber} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-delete-button">
              <button
                // onClick={() =>
                //   handleEdit(cardInfoData, emailAddressList, phoneNumberLsit)
                // }
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
