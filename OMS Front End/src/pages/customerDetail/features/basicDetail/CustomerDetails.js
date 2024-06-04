import React from "react";
import Image from "../../../../components/image/Image";
import { AppIcons } from "../../../../data/appIcons";

const CustomerDetails = (props) => {
  const customerName = "1Click Chemistry Incc";
  const customerEmail = "test.email@gmail.com";
  const customerWebsite = "1clickchemistry.com";
  const customerData = [
    { nameLabel: "Country", name: "USA" },
    { nameLabel: "Group Type", name: "Commercial" },
    { nameLabel: "Territory", name: "USA" },
    { nameLabel: "Billing Currency", name: "USD" },
    { nameLabel: "Text Id", name: "4561237890" },
    {
      nameLabel: "Invoice Instruction",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      nameLabel: "Notes ",
      name: "Lorem Ipsum is simply dummy text of the printing and ",
    },
    { nameLabel: "Is Company ", name: "Yes" },
    { nameLabel: "Is Buying for Third Party ", name: "No" },
  ];
  return (
    <>
      <div className="basic-customer-detail">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="profile-info">
            <div className="profile-icon-desc">
              <div className="d-flex align-items-center">
                <div className="profile-icon">1C</div>
                <h5>{customerName}</h5>
              </div>
              <div className="edit-icons" onClick="">
                <Image
                  imagePath={AppIcons.editThemeIcon}
                  altText="Website Icon"
                />
              </div>
            </div>
          </div>
          <div className="field-desc">
            <div className="inf-label">Email</div>
            <b>&nbsp;:&nbsp;</b>
            <a className="email-link" href={`mailto:${customerEmail}`}>
              <div className="info-desc">{customerEmail}</div>
            </a>
            <span className="copy-icon">
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>
          </div>
          <div className="field-desc">
            <div className="inf-label">Website</div>
            <b>&nbsp;:&nbsp;</b>

            <div className="info-desc">{customerWebsite}</div>

            <span className="copy-icon">
              <Image imagePath={AppIcons.copyIcon} altText="Website Icon" />
            </span>
          </div>

          {customerData.map((customer, index) => (
            <div key={index} className="field-desc">
              <div className="inf-label">{customer.nameLabel}</div>
              <b>&nbsp;:&nbsp;</b>
              <div className="info-desc">{customer.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
